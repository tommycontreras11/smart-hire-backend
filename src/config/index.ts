export const objectStorageConfig = {
    bucket: process.env.OBJECT_STORAGE_BUCKET as string,
    url: process.env.OBJECT_STORAGE_URL as string,
    port: parseInt(`${process.env.OBJECT_STORAGE_PORT}`),
    ssl: process.env.OBJECT_STORAGE_SSL == "true",
    accessKey: process.env.OBJECT_STORAGE_ACCESS_KEY as string,
    secretKey: process.env.OBJECT_STORAGE_SECRET_KEY as string
}

export const emailConfig = {
    user: process.env.SMART_HIRE_GMAIL_USER as string,
    password: process.env.SMART_HIRE_GMAIL_APP_PASSWORD as string
}
