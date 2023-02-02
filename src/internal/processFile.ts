import FormData from 'form-data'
import axios from 'axios'
import { load } from 'cheerio'
import { IProcessFile } from '../interfaces/types'

const processFile = async (options: IProcessFile) => {
  const data = new FormData()
  if (!options.url)
    throw new Error(
      'Error in processFile: The new url was not generated correctly'
    )
  const file = options.url.substring(options.url.lastIndexOf('/') + 1)
  data.append('file', file)
  data.append('start', options.startTime)
  data.append('end', options.endTime)
  data.append('percentage', options.quality)
  data.append('background', options.background)
  data.append('size', options.size)
  data.append('fps', options.fps)
  data.append('method', options.method)
  data.append('diff', options.diff!.toString())
  data.append('loop', options.loop!.toString())

  const result = await axios.post(options.url, data, {
    headers: data.getHeaders()
  })
  const $ = load(result.data)
  const outputArea = $('div#output').html()
  if (!outputArea)
    throw new Error(result.data.replace(new RegExp('<br />'), '\n'))
  const output = load(outputArea)
  return output('a[class=save]').attr('href')
}

export default processFile