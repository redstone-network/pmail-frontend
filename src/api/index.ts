import request from './request'
interface User {
  name: string
  address: string
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
    data: body
  })
}
export async function getMailDetail(hash: string): Promise<MailDetail | null> {
  try {
    const obj: any = await request({
      url: `/api/storage/raw/${hash}`,
      method: 'GET'
    })

    function isPlainObject(input: any) {
      return input && typeof input === 'object';
    }

    function propertyNamesToLowercase(obj: any): any {
      const final: any = {};
  
      // Iterate over key-value pairs of the root object 'obj'
      for (const [key, value] of Object.entries(obj)) {
        // Set the lowercased key in the 'final' object and use the original value if it's not an object
        // else use the value returned by this function (recursive call).
        final[key.toLowerCase()] = isPlainObject(value) ? propertyNamesToLowercase(value) : value;

        if (Array.isArray(value)) {
          const arr: any[] = []
          for (var item in value ){
            let newItem = isPlainObject(item) ? propertyNamesToLowercase(value) : value;
            arr.push(newItem);
          }
          final[key.toLowerCase()]= arr;
        }
      }
      return final;
    }

    let mailDetail = propertyNamesToLowercase(obj);
    var size = Object.keys(mailDetail).length;
    if( size === 1 ) {
      mailDetail = Object.values(mailDetail)[0];
    }

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
  } catch (e) {
    console.log("### error", e)
    return null
  }
}
