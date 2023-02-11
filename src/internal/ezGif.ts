import converter from './converter'
import { writeFile } from 'fs-extra'
import { IOptions } from '../interfaces/types'
import { Formats } from '../metadata/formats'
import { ConvertionMethod } from '../metadata/convertionMethods'
import { Sizes } from '../metadata/sizes'
import downloadFile from '../tools/downloadFile'

export class ezGif {
  private Metadata: IOptions
  private result: string | undefined

  constructor (private file: string | Buffer) {
    const defaultOptions: IOptions = {
      targetFormat: 'gif',
      background: '#ffffff',
      diff: 'off',
      endTime: 10,
      fps: 10,
      loop: true,
      method: 'ffmpeg',
      quality: 100,
      startTime: 0,
      size: 'original',
      file: this.file
    }
    this.Metadata = defaultOptions
  }

  public setTargetFormat (format: Formats | string) {
    this.Metadata.targetFormat = format
    return this
  }
  public setBackground (color: string) {
    this.Metadata.background = color
    return this
  }
  public setDiff (diff: 'on' | 'off') {
    this.Metadata.diff = diff
    return this
  }
  public setEndTime (time: number) {
    this.Metadata.endTime = time
    return this
  }
  public setFps (fps: number) {
    this.Metadata.fps = fps
    return this
  }
  public setLoop (loop: boolean) {
    this.Metadata.loop = loop
    return this
  }
  public setMethod (method: ConvertionMethod) {
    this.Metadata.method = method
    return this
  }
  setQuality (quality: number) {
    this.Metadata.quality = quality
    return this
  }
  public setStartTime (time: number) {
    this.Metadata.startTime = time
    return this
  }
  public setSize (size: Sizes | string) {
    this.Metadata.size = size
    return this
  }

  private async build () {
    if (!this.Metadata.file) throw new Error('No file provided')
    if (!this.Metadata.targetFormat)
      throw new Error('No target format provided')
    this.result = await converter(this.Metadata)
    return this
  }

  public async getURL (): Promise<string> {
    if (!this.result)
      await this.build().catch(err => {
        throw err
      })
    return this.result!
  }

  public async toBuffer (): Promise<Buffer> {
    if (!this.result)
      await this.build().catch(err => {
        throw err
      })
    return downloadFile(this.result!)
  }

  private defaultFileName () {
    const date = new Date()

    return `ezgif-${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.${
      this.Metadata.targetFormat
    }`
  }

  public async toFile (path?: string): Promise<void> {
    if (!this.result)
      await this.build().catch(err => {
        throw err
      })
    const buffer = await downloadFile(this.result!)
    return writeFile(path || this.defaultFileName(), buffer)
  }
}
