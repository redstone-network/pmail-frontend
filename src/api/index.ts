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
export interface MailDetail {
  fromName: string
  fromAddress: string
  toName: string
  toAddress: string
  time: string
  body: string
  subject: string
  hash: string
  timestampe: number
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
export async function getMailDetail(hash: string): Promise<MailDetail | null> {
  try {
    const { code, data }: Res<string> = await request({
      url: `/api/storage/${hash}`,
      method: 'GET'
    })
    if (code === 0) {
      const { body: mailDetail } = JSON.parse(data)
      const fromName = mailDetail.from[0].Name
      const fromAddress = mailDetail.from[0].Address
      const toName = mailDetail.to[0].Name
      const toAddress = mailDetail.to[0].Address
      const time = new Date(mailDetail.timestampe).toDateString()
      return {
        fromName,
        fromAddress,
        toName,
        toAddress,
        time,
        hash,
        body: mailDetail.body,
        subject: mailDetail.subject,
        timestampe: mailDetail.timestampe
      }
    }
    return null
  } catch (e) {
    return null
  }
}
