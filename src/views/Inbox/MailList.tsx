/* eslint-disable tailwindcss/classnames-order */
import InfiniteScroll from 'react-infinite-scroll-component'
import './MailList.css'
import { getMailList } from '@/service/list'
import { useAppSelector } from '@/hooks'
import type { Mail } from '@/service/list'
import Empty from '@/assets/empty.png'

function MailList() {
  const user = useAppSelector((state) => state.user)
  const [mailListData, setMailListData] = useState<Mail[]>([])
  const [hasMore, setHasMore] = useState(true)

  async function fetchData() {
    const { data } = await getMailList('subAddr' + user.address)
    console.log(11111111)
    if (data && data?.mails) {
      const { nodes, totalCount } = data.mails
      console.log(nodes, totalCount, mailListData)
      const res = [...mailListData, ...nodes]
      setMailListData(res)
      setHasMore(totalCount !== res.length)
    }
  }
  const Navigate = useNavigate()
  const ShowMail = (hash: string) => {
    Navigate(`/mail/${hash}`)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="h-full px-0 overflow-y-auto ">
      {mailListData.length ? (
        <InfiniteScroll
          className="px-4"
          dataLength={mailListData.length}
          next={fetchData}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {mailListData.map((item) => (
            <div
              key={item.hash}
              onClick={() => ShowMail(item.hash)}
              className="flex items-center py-2 transition-all border-b border-solid cursor-pointer mail-item"
            >
              <div className="w-40 mr-4 truncate shrink-0">
                Discord DiscordDiscordDiscordDiscordDiscordDiscordDiscordDiscord
              </div>
              <div className="w-40 truncate shrink grow text-grayText">
                The Overflow #155: Continuous securityThe Overflow #155:
                Continuous securityThe Overflow #155: Continuous securityThe
                Overflow #155: Continuous securityThe Overflow #155: Continuous
                security
              </div>
              <div className="w-20 ml-8 shrink-0">8. Dez.</div>
            </div>
          ))}
        </InfiniteScroll>
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
