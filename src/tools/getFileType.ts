import { fromBuffer, fromFile } from 'file-type'

const getFileType = async (data: string | Buffer) => {
  const type = Buffer.isBuffer(data)
    ? await fromBuffer(data)
    : await fromFile(data).catch(() => {
        return null
      })

  if (!type) {
    throw new Error('Invalid file type')
  }
  return type
}

export default getFileType
