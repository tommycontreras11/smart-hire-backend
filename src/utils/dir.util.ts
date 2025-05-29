import { RequestEntity } from "./../database/entities/entity/request.entity"

export const getExtensionByFileName = (fileName: string) =>
	fileName.match(/\.([^.]+)$/)?.[1]

export const generateUniqueFileName = async (extension: string): Promise<string> => {
	const fileName = `${new Date().getTime()}.${extension}`
	const exists = await RequestEntity.findOne({
		where: {
			curriculum: fileName
		}
	}).catch((error) => {
		console.error('BookEntity.findOne', { error })
		return undefined
	})

	if (exists === undefined)
		return Promise.reject({ message: 'Something went wrong' })

	if (exists) return generateUniqueFileName(extension)

	return Promise.resolve(fileName)
}