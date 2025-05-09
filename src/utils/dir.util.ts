import { BaseEntity, FindOneOptions } from "typeorm";

export const getExtensionByFileName = (fileName: string) =>
  fileName.match(/\.([^.]+)$/)?.[1];

type EntityWithFileName = BaseEntity & { file_name: string };

export async function generateUniqueFileName<T extends typeof BaseEntity>(
  entityClass: T & {
    findOne(
      options: FindOneOptions<EntityWithFileName>
    ): Promise<EntityWithFileName | undefined>;
  },
  extension: string
): Promise<string> {
  const fileName = `${new Date().getTime()}.${extension}`;

  const exists = await entityClass
    .findOne({
      where: {
        file_name: fileName,
      },
    })
    .catch((error) => {
      console.error("BaseEntity.findOne", { error });
      return undefined;
    });

  if (exists === undefined)
    return Promise.reject({ message: "Something went wrong" });

  if (exists) return generateUniqueFileName(entityClass, extension);

  return Promise.resolve(fileName);
}
