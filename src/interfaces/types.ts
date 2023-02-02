import { Sizes } from '../metadata/sizes'
import { Formats } from '../metadata/formats'
import { ConvertionMethod } from '../metadata/convertionMethods'

export interface IOptions {
  file: string | Buffer
  targetFormat: Formats | string
  fps?: number
  startTime?: number
  endTime?: number
  quality?: number
  diff?: 'on' | 'off'
  loop?: boolean
  background?: string
  size?: Sizes | string
  method?: ConvertionMethod | string
}

export interface ILoadFile {
  file: Buffer
  fileExt: string
  sourceFormat: string
  targetFormat: string
}

export interface IProcessFile extends IOptions {
  url: string
}
