import request from './request'
interface User {
  Name: string
  Address: string
}
interface MailInfo {
  subject: string
  body: string
  from: User[]
  to: User[]
  date: string
  timestampe: number
}
interface Res<T> {
  code: number
  data: T
  msg: string
}
export function uploadMail<T>(
  filename: string,
  body: MailInfo
): Promise<Res<T>> {
  return request({
    url: `/api/storage/${filename}`,
    method: 'POST',
    data: {
      body
    }
  })
}
export function getMailDetail<T>(fileId: string): Promise<Res<T>> {
  return request({
    url: `/api/storage/${fileId}`,
    method: 'GET'
  })
}
