import multer from "multer";
import { statusCode } from "./status.util";
import { ObjectStorage } from "./../libs/object-storage";
import {
  EntityWithFileName,
  generateUniqueFileName,
  getExtensionByFileName,
} from "./dir.util";
import { BaseEntity, FindOneOptions } from "typeorm";
import { ALLOWED_EXTENSION } from "./../constants";

export const EXTENSION_MIME_TYPE: Record<string, string> = Object.freeze({
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  jpeg: "image/jpeg",
  webp: "image/webp",
  json: "application/json",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  txt: "text/plain",
  csv: "text/csv",
  xml: "application/xml",
  zip: "application/zip",
  tar: "application/x-tar",
  gz: "application/gzip",
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export async function uploadFile<T extends typeof BaseEntity>(
  entityClass: T & {
    findOne(
      options: FindOneOptions<EntityWithFileName>
    ): Promise<EntityWithFileName | undefined>;
  },
  file: Express.Multer.File
): Promise<string> {
  const extension = getExtensionByFileName(file.originalname);
  if (!extension || !ALLOWED_EXTENSION.includes(extension)) {
    return Promise.reject({
      message:
        "File extension not allowed. Valid extensions are: " +
        ALLOWED_EXTENSION.join(", ") +
        "",
      status: statusCode.BAD_REQUEST,
    });
  }

  const storage = ObjectStorage.instance;

  const fileName = await generateUniqueFileName(entityClass, extension);

  const minio = await storage
    .uploadDocument(fileName, file.buffer, file.size)
    .catch(async (e) => {
      console.error("createFileService -> storage.uploadDocument: ", e);
      await entityClass.remove({} as EntityWithFileName);
      return null;
    });

  if (!minio)
    return Promise.reject({
      message: "File not uploaded to minio",
      status: statusCode.BAD_REQUEST,
    });

  return fileName;
}

export async function deleteFile(fileName: string) {
  const storage = ObjectStorage.instance;

  await storage.deleteDocument(fileName).catch(async (e) => {
    console.error("deleFile -> storage.deleteDocument: ", e);
    return null;
  });
}
