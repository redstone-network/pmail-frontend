import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3001/',
  cache: new InMemoryCache()
})
export interface Mail {
  hash: string
  id: string
  timestamp: string
}
type MailListRes = {
  data: {
    mails: {
      nodes: Mail[]
      totalCount: number
    }
  }
}

export async function getMailList(id: string): Promise<MailListRes> {
  const rt = await client.query({
    query: gql`
      query queryMailList($fid: String!) {
        mails(filter: { fromId: { equalTo: $fid } }) {
          nodes {
            id
            from {
              id
              type
            }
            to {
              id
              type
            }
            hash
            timestamp
          }
          totalCount
        }
      }
    `,
    variables: { fid: id }
  })
  return rt
}
