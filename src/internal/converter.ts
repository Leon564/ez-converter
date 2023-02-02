import loadFile from './loadFile'
import processFile from './processFile'
import getFileType from '../tools/getFileType'
import mediaToBuffer from './mediaToBuffer'
import { IOptions } from '../interfaces/types'
import downloadFile from '../tools/downloadFile'

const converter = async (options: IOptions) => {
  options.file = await mediaToBuffer(options.file)
  const { ext, mime } = await getFileType(options.file)
  const sourceFormat = mime.includes('video') ? 'video' : ext
  const url = await loadFile({
    file: options.file,
    fileExt: ext,
    sourceFormat,
    targetFormat: options.targetFormat
  })

  const processResult = await processFile({ url, ...options })

  return downloadFile(processResult!)
}

export default converter