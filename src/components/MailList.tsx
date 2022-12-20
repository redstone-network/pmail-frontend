/* eslint-disable tailwindcss/classnames-order */
import InfiniteScroll from 'react-infinite-scroll-component'
import { getMailList, getSendList } from '@/api/list'
import { useAppSelector } from '@/hooks'
import type { MailDetail } from '@/api/index'
import Empty from '@/assets/empty.png'
import { getMailDetail } from '@/api'
import { Spinner } from 'flowbite-react'
export enum Types {
  SEND = 1,
  INBOX = 2
}
function MailList({ type }: { type: Types }) {
  const user = useAppSelector((state) => state.user)
  const [mailListData, setMailListData] = useState<(MailDetail | null)[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  async function fetchDetail(hash: string) {
    return await getMailDetail(hash)
  }
  const Navigate = useNavigate()
  const ShowMail = (hash: string) => {
    Navigate(`/inbox/${hash}`)
  }
  useEffect(() => {
    async function fetchData() {
      let data
      if (type === Types.INBOX) {
        const res = await getMailList('subAddr' + user.address)
        data = res.data
      } else {
        const res = await getSendList('subAddr' + user.address)
        data = res.data
      }
      if (data && data?.mails) {
        const { nodes, totalCount } = data.mails
        const resDetails = await Promise.all(
          nodes.map((node) => fetchDetail(node.hash))
        )
        const res = [...mailListData, ...resDetails]
        setMailListData(res)
        setHasMore(totalCount !== res.length)
        setLoading(false)
      }
    }
    setLoading(true)
    fetchData()
  }, [])
  return (
    <div className="h-full px-0 overflow-y-auto ">
      {loading ? (
        <div className="flex items-center justify-center h-full text-center">
          <Spinner color="purple"></Spinner>
          <span className="pl-3">Loading...</span>
        </div>
      ) : mailListData.length ? (
        <div className="px-4">
          {mailListData.map(
            (item) =>
              item && (
                <div
                  key={item.hash}
                  onClick={() => ShowMail(item.hash)}
                  className="flex items-center py-2 transition-all border-b border-solid cursor-pointer hover:shadow-md"
                >
                  <div className="w-40 pl-2 mr-4 truncate shrink-0">
                    {item.subject}
                  </div>
                  <div className="w-40 truncate shrink grow text-grayText">
                    {item.toAddress}
                  </div>
                  <div className="w-40 ml-8 shrink-0">{item.time}</div>
                </div>
              )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img className="w-20 h-20 mb-4" src={Empty} />
          <div className="text-grayText">it&apos; empty</div>
        </div>
      )}
    </div>
  )
}

export default MailList