// Type defined by feihua

import { Config } from '@tars/utils'
import { DyeingObject } from '@tars/dyeing'
import { DateFormat, Formatter } from '@tars/winston-tars'

type LogType = 'TarsRotate' | 'TarsDate' | 'TarsRemote'
type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'NONE'

declare enum LogTo {
  /** 仅打本地日志 */
  Local = 1,

  /** 仅打远程日志 (方舟数据中间件) */
  Remote = 2,

  /** 远程 + 本地 */
  Both = 3
}

interface TarsLogsOptions {
  /** 日志文件名是否带 .log 后缀 */
  hasSufix?: boolean,

  /** 是否允许框架在日志文件名上增加业务相关的标识 */
  hasAppNamePrefix?: boolean,

  /** 日志文件名中字符间的连接符 */
  concatStr?: string,

  /** 日志内容项之间的分隔符 */
  separ?: string,

  /** 最大的文件总数 */
  maxFiles?: number,

  /** 单文件最大大小 (单位为 bytes) */
  maxSize?: number,

  /** 定义日志内容格式化方法 */
  formatter?: Formatter.LogFormatter,

  /** 创建新文件的间隔 */
  format?: DateFormat.BaseDateFormat | DateFormat.BaseDateFormatConstructor,

  /** 日志发送的目标 */
  logTo?: LogTo
}

declare class TarsLogs {
  constructor (type: LogType, name?: string, options?: TarsLogsOptions)

  info (...args: any[]): boolean
  debug (...args: any[]): boolean
  warn (...args: any[]): boolean
  error (...args: any[]): boolean

  /** 变更日志级别 */
  setLevel (level: LogLevel): boolean

  close (): void

  /** 获取染色对象 */
  getDyeingObj (dyeing: boolean, val?: any, key?: any): DyeingObject

  static LogTo: typeof LogTo

  /** 定义了与时间相关日志滚动的处理方法 */
  static DateFormat: typeof DateFormat

  /** 提供了符合 Tars 日志格式标准的内容格式化方法 */
  static Formatter: typeof Formatter

  /** 初始化 Tars-logs */
  static setConfig (config?: string | Config): void

  /** 获取染色对象 */
  static getDyeingObj (dyeing?: boolean, val?: any, key?: any): DyeingObject
}

declare namespace TarsLogs {}

export = TarsLogs