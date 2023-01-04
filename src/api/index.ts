/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request from './request'
import { saveAs } from 'file-saver'
import Axios from 'axios'

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
function getInfo(str:string): string| undefined {
  if (typeof str === 'string') {
    return /^=\?[\w|\W]+\?=$/.test(str) ? '' : str
  }
  return
}
export function uploadFile<T>(
  filename: string,
  body: MailInfo
): Promise<Res<T>> {
  return request({
    baseURL: import.meta.env.VITE_STORAGE_URL,
    url: `/api/storage/${filename}`,
    method: 'POST',
    data: body
  })
}
export async function downloadFile(
  hash: string,
  name: string
) {
  const res = await Axios({
    baseURL: import.meta.env.VITE_STORAGE_URL,
    url: `/api/storage/raw/${hash}`,
    method: 'GET',
    responseType: 'blob',
  })
  const blob = new Blob([res.data])
  saveAs(blob, decodeURIComponent(name), { autoBom: true })

}
function getName(arr: {name: string, Name: string}[]): string {
  const nameArr = arr.map(item => {
    return { name: getInfo(item.name) || getInfo(item.Name) || '' }
  })
  return nameArr.filter(item => item.name).map(item => item.name).join(',')
}

function getAddress(arr: {address: string, Address: string}[]): string {
  const nameArr = arr.map(item => {
    return { address: getInfo(item.address) || getInfo(item.Address) || '' }
  })
  return nameArr.filter(item => item.address).map(item => item.address).join(',')
}

export async function getMailDetail(hash: string): Promise<MailDetail | null> {
  try {
    const mailDetail: any = await request({
      baseURL: import.meta.env.VITE_STORAGE_URL,
      url: `/api/storage/raw/${hash}`,
      method: 'GET'
    })

    const fromName = getName(mailDetail.from)
    const fromAddress = getAddress(mailDetail.from)
    const toName = getName(mailDetail.to)
    const toAddress = getAddress(mailDetail.to)
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
  } catch (e) {
    console.log('### error', e)
    return null
  }
}
