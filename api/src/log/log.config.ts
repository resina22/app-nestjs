export interface Log {
  level: LogType
  mensage: string | null
  payload: object | null
}

export enum LogType {
  ERROR,
  SUCCESS,
  INFO,
  WARN,
}

