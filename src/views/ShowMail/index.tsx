import Account from '@/assets/account.png'
import { getMailDetail } from '@/api/index'
import { Spinner } from 'flowbite-react'
import { useAppSelector } from '@/hooks'
import replay from '@/assets/icons/reply-x2.png'
import sent from '@/assets/icons/sent-g-x2.png'

function ShowMail(): JSX.Element {
  const { hash } = useParams()
  const location = useLocation()
  const user = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const [subject, setSubject] = useState('')
  const [mailBody, setMailBody] = useState('')
  const [fromAccount, setFromInfo] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [time, setTime] = useState('')
  async function fetchData() {
    const res = await getMailDetail(hash!)
    if (res) {
      console.log(res)
      setSubject(res.subject)
      setMailBody(res.body)
      setTime(res.time)
      setFromInfo(res.fromName)
      setToAccount(res.toName)
      setToAddress(res.toAddress)
      setFromAddress(res.fromAddress)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  function createMarkup() {
    return { __html: mailBody }
  }
  return (
    <div className="flex h-full w-full flex-col overflow-scroll rounded-lg bg-white p-4 shadow">
      {loading ? (
        <div className="flex h-full items-center justify-center text-center">
          <Spinner color="purple"></Spinner>
          <span className="pl-3">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col flex-wrap gap-3 lg:flex-row lg:items-center lg:justify-start">
            <h5 className="text-xl font-semibold text-textBlack">{subject}</h5>
          </div>
          <div className="flex pt-4">
            <button className="btn flex h-8 items-center px-5 justify-center hover:bg-btnHoverGary">
              <img className="mr-2 h-5 w-5" src={replay} alt="" /> Reply
            </button>
            <button className="btn flex h-8 items-center px-5 justify-center bg-btnGary hover:bg-btnHoverGary">
              <img className="mr-2 h-5 w-5" src={sent} alt="" /> Delete
            </button>
          </div>
          <div className="mb-5 flex w-full items-end justify-between">
            <div className="flex items-center pt-2">
              <div className="mr-3 h-8 w-8 rounded-full">
                <img src={Account} alt="" />
              </div>
              <div>
                <div className="text-textBlue">
                  {fromAccount || fromAddress}
                </div>
                <div className="flex">
                  Send to{' '}
                  <a title={location.pathname.startsWith('/inbox')
                      ? 'Me'
                      : toAccount || toAddress} className="text-grayText max-w-2xl px-2 truncate">
                    {location.pathname.startsWith('/inbox')
                      ? 'Me'
                      : toAccount || toAddress}
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-2 pl-10 text-xs text-textBlack shrink-0">{time}</div>
          </div>
          <div
            dangerouslySetInnerHTML={createMarkup()}
            className="grow rounded-md bg-bgGray px-6 py-5"
          ></div>
        </>
      )}
    </div>
  )
}

export default ShowMail
