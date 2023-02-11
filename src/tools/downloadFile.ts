import axios from 'axios'

const downloadFile = async (url: string): Promise<Buffer> => {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' })
  if (!data) throw new Error('No data provided')
  return Buffer.from(data, 'binary')
}

export default downloadFile