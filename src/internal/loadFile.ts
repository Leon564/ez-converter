import axios from 'axios'
import { load } from 'cheerio'
import formData from 'form-data'
import { ILoadFile } from '../interfaces/types'
import { BASE_URL } from '../shared/constants'

const loadFile = async (file: ILoadFile): Promise<string> => {
  const data = new formData()
  data.append('new-image', file.file, `image.${file.fileExt}`)

  const result = await axios({
    method: 'POST',
    url: `${BASE_URL}/${file.sourceFormat}-to-${file.targetFormat}`,
    data,
    headers: data.getHeaders()
  })
  const $ = load(result.data)
  const newUrl = $('form').attr('action')!
  return newUrl.includes('.com') ? newUrl! : BASE_URL + newUrl
}

export default loadFile
