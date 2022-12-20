import { BsReply, BsTrash } from 'react-icons/bs'
import Account from '@/assets/account.png'
import { getMailDetail } from '@/api/index'

function ShowMail(): JSX.Element {
  const { hash } = useParams()
  const [subject, setSubject] = useState('')
  const [mailBody, setMailBody] = useState('')
  const [fromAccount, setFromInfo] = useState('')
  const [time, setTime] = useState('')
  async function fetchData() {
    const { code, data } = await getMailDetail<string>(hash!)
    if (code === 0) {
      const { body: mailDetail } = JSON.parse(data)
      console.log(mailDetail)
      setSubject(mailDetail.subject)
      setMailBody(mailDetail.body)
      const fromAccount = mailDetail.from[0].Name.match(
        /^=\?gb18030\?B\?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)\?=$/
      )[1]
      const time = new Date(mailDetail.timestampe).toDateString()
      setTime(time)
      setFromInfo(fromAccount)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  function createMarkup() {
    return { __html: mailBody }
  }
  return (
    <div className="flex flex-col w-full h-full p-4 overflow-scroll bg-white rounded-lg shadow">
      <div className="flex flex-col flex-wrap gap-3 lg:flex-row lg:items-center lg:justify-start">
        <h5 className="text-xl font-semibold text-textBlack">{subject}</h5>
      </div>
      <div className="flex pt-4">
        <button className="flex items-center justify-center w-20 h-8 btn">
          <BsReply /> Reply
        </button>
        <button className="flex items-center justify-center w-20 h-8 btn">
          <BsTrash /> Delete
        </button>
      </div>
      <div className="flex items-center pt-2">
        <div className="w-8 h-8 mr-3 rounded-full">
          <img src={Account} alt="" />
        </div>
        <div className="truncate text-textBlue">{fromAccount}</div>
      </div>
      <div className="pt-2 pl-10 text-xs text-textBlack">{time}</div>
      <div dangerouslySetInnerHTML={createMarkup()} className="px-6 py-5"></div>
    </div>
  )
}

export default ShowMail
