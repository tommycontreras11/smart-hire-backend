import { UploadedObjectInfo } from "minio/dist/main/internal/type";
import { Readable } from "stream";
import { objectStorageConfig } from "../../config/";
import MinioStorage from "./minio";
import { IListOfObjects } from "./object-storage.interface";

export class ObjectStorage {
  private static _instance: ObjectStorage;
  private provider: MinioStorage;

  private constructor() {}

  public static get instance(): ObjectStorage {
    !ObjectStorage._instance && (ObjectStorage._instance = new ObjectStorage());
    return ObjectStorage._instance;
  }

  public async setConfiguration() {
    try {
      this.provider = new MinioStorage(objectStorageConfig);
      await this.provider.createBucket();
      console.log("Object Storage initialized 🎉");
    } catch (error) {
      console.log(error);
    }
  }

  public deleteDocument(filename: string): Promise<boolean> {
    return this.provider.delete(filename);
  }

  public uploadDocument(
    filename: string,
    file: string | Buffer | Readable,
    size: number
  ): Promise<UploadedObjectInfo> {
    return this.provider.upload(filename, file, size);
  }

  public getOneItem(filename: string): Promise<Buffer> {
    return this.provider.download(filename);
  }

  public getUrl(filename: string): Promise<string> {
    return this.provider.generatePresignedUrl(filename);
  }

  public listOfItems(): Promise<IListOfObjects[]> {
    return this.provider.listOfObjects();
  }
}
