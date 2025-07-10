import { CandidateEntity } from "./../database/entities/entity/candidate.entity"

export const getExtensionByFileName = (fileName: string) =>
	fileName.match(/\.([^.]+)$/)?.[1]

export const generateUniqueFileName = async (extension: string): Promise<string> => {
	const fileName = `${new Date().getTime()}.${extension}`
	const exists = await CandidateEntity.findOne({
		where: {
			curriculum: fileName
		}
	}).catch((error) => {
		console.error('CandidateEntity.findOne', { error })
		return undefined
	})

	if (exists === undefined)
		return Promise.reject({ message: 'Something went wrong' })

	if (exists) return generateUniqueFileName(extension)

	return Promise.resolve(fileName)
}