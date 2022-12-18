import request from './request'

export function uploadMail(filename: string, body: string) {
  return request({
    url: `/api/storage/${filename}`,
    method: 'POST',
    data: {
      body
    }
  })
}
