import { Client } from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';
import { Readable } from 'stream';
import { IListOfObjects, IObjectStorageConfig } from './object-storage.interface';

class MinioStorage {

    private readonly client: Client;
    private readonly bucket: string;

    constructor({
        bucket,
        url: endPoint,
        port,
        ssl: useSSL,
        accessKey,
        secretKey
    }: IObjectStorageConfig) {
        this.client = new Client({
            endPoint,
            port,
            useSSL,
            accessKey,
            secretKey
        });
        this.bucket = bucket
    }

    public async createBucket(): Promise<boolean> {
        try {
            const exists = await this.client.bucketExists(this.bucket);
            if (exists) return true;
    
            await this.client.makeBucket(this.bucket, ""); // Second argument for region
            return true;
        } catch (error) {
            console.error("Error creating bucket:", error);
            throw error;
        }
    }
    

    public async upload(filename: string, file: string | Buffer | Readable, size: number): Promise<UploadedObjectInfo> {
        return new Promise((resolve, reject) => {
            this.client.putObject(this.bucket, filename, file, size, (error: any, info: any) => {
                if (error) return reject(error)
                return resolve(info)
            })
        })
    }

    public async download(filename: string): Promise<Buffer> {
        return new Promise(async (resolve, reject) => {
            const stream = await this.client.getObject(this.bucket, filename);
    
            const buffers: Uint8Array[] = [];
    
            stream.on("data", (chunk: Uint8Array) => buffers.push(chunk));
    
            stream.on("end", () => {
                const buffer = Buffer.concat(buffers);
                resolve(buffer);
            });
    
            stream.on("error", (error: Error) => reject(error));
        });
    }
    

    public async listOfObjects(): Promise<IListOfObjects[]> {

        return new Promise((resolve, reject) => {
            const stream = this.client.listObjects(this.bucket, '', true)
            const data: IListOfObjects[] = []

            stream.on('data', (obj: IListOfObjects) => {
                data.push(obj)
            });

            stream.on('end', () => resolve(data));

            stream.on('error', (error) => {
                reject(error)
            });
        })
    }

    public async generatePresignedUrl(filename: string): Promise<string> {
        try {
            const url = await this.client.presignedGetObject(this.bucket, filename);
            return url;
        } catch (error) {
            console.error("Error generating presigned URL:", error);
            throw error;
        }
    }
    

    public async delete(filename: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client.removeObject(this.bucket, filename).catch((error) => {
                reject(error)
                resolve(false)
            })

            resolve(true);
        })
    }
}

export default MinioStorage