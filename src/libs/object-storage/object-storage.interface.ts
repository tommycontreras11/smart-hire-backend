export interface IObjectStorageConfig {
    bucket: string
    url: string
    port: number
    accessKey: string
    secretKey: string
    ssl: boolean
}

export interface IListOfObjects {
    name: string
    prefix: string
    size: number
    etag: string
    versionId: string
    isDeleteMarker: boolean
    lastModified: string
}