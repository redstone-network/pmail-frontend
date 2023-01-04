/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/classnames-order */
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor/Editor.css'
import { uploadFile } from '@/api/index'
import { nanoid } from 'nanoid'
import { sendMailBlock } from '@/api/substrate'
import { useAppSelector } from '@/hooks'
import { editorModules } from './Editor/editor'
import { toast, Id } from 'react-toastify'
import { getAddressType, getMailType } from '@/utils/index'
import drafts from '@/assets/icons/drafts-gray.png'
import trash from '@/assets/icons/trash-gray.png'
import { AiOutlineClose } from 'react-icons/ai'
import { Avatar, Popover } from 'antd'
import './index.css'
import polkadot from '@assets/polkadot.png'
import gmail from '@assets/gmail.png'

interface DropItem {
  value: string
  tag: string | null
  label: string
  type: string
  key: number
  color: TYPE_COLORS
}
enum TYPE_COLORS {
  'web2' = '#55acee',
  'Gmail' = '#cd201f',
  'qq' = '#3b5999',
  'ETH' = '#55acee',
  'polkadot' = '#ff8c00'
}
function Home(): JSX.Element {
  const inputEl = useRef<HTMLInputElement>(null)
  const user = useAppSelector((state) => state.user)
  const toastId = useRef<Id | null>(null)
  const [mailInfo, setMailInfo] = useState('')
  const [toValue, setToValue] = useState('')
  const [subjectValue, setSubjectValue] = useState('')
  const [tipText, setTipText] = useState('')
  const [sending, setSending] = useState(false)
  const NoError = 'No recipients defined'
  const checkError = 'Invalid recipient found, please check your recipients'
  const [showDrop, setShowDrop] = useState(false)
  const [options, setOptions] = useState<DropItem[]>([])
  const [userList, setUserList] = useState<DropItem[]>([])
  const [showMod, setShowMod] = useState(false)
  useEffect(() => {
    if (!showMod) {
      inputEl?.current?.focus()
    }
  }, [showMod])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const type = getAddressType(value)
    setToValue(value)
    if (type) {
      const mailType = getMailType(value)

      setShowDrop(true)
      setOptions([
        {
          value,
          key: new Date().getTime(),
          tag: mailType,
          label: mailType?.slice(0, 1).toUpperCase() || 'M',
          type,
          color: TYPE_COLORS[mailType!]
        }
      ])
    } else {
      setShowDrop(false)
    }
  }

  const onFocus = () => {
    setShowMod(false)
    setToValue('')
    setShowDrop(false)
    setOptions([])
  }
  const onBlur = () => {
    console.log(11)
  }
  const choseItem = (e: React.ChangeEvent<HTMLDivElement>, value: DropItem) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDrop(false)
    setToValue('')
    inputEl?.current?.focus()
    setUserList([...userList, value])
  }
  const deleteItem = (
    e: React.ChangeEvent<HTMLDivElement>,
    value: DropItem
  ) => {
    e.preventDefault()
    const list = JSON.parse(JSON.stringify(userList))
    setUserList(list.filter((item: { key: number }) => item.key !== value.key))
  }

  const submit = async () => {
    if (userList.length === 0) {
      setTipText(NoError)
      toast.error(NoError, {
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false
      })
      return
    }
    setTipText('')
    setSending(true)
    toastId.current = toast.loading('Please wait....', {
      pauseOnFocusLoss: false
    })
    const uuid = nanoid()
    const now = new Date()
    const body = {
      subject: subjectValue,
      body: mailInfo,
      from: [
        {
          Name: user.mail,
          Address: user.address
        }
      ],
      to: userList.map(item => ( {
        Name: '',
        Address: item.value
      })),
      date: now.toDateString(),
      timestampe: now.getTime()
    }
    try {
      const { code, data } = await uploadFile<string>(uuid, body)

      if (code === 0 && data) {
        const timestamp = new Date().getTime()
        const storeHash = data
        const toList = userList.map(item => (
          {
            [item.type]: item.value
          }
        ))
        await sendMailBlock(
          toList,
          timestamp,
          storeHash
        )
      }
      setSending(false)
      toast.update(toastId.current, {
        render: 'send mail successful',
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false
      })
    } catch (e) {
      setSending(false)
      toast.update(toastId.current, {
        render: 'send mail fail',
        type: toast.TYPE.ERROR,
        autoClose: 2000,
        isLoading: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        closeButton: false
      })
    }
  }

  return (
    <>
      <div className="flex h-full w-full flex-col rounded-lg shadow">
        <div className="flex h-full flex-col">
          <div className="mb-3 rounded-lg bg-white px-4 py-2 shadow">
            <div className="flex items-center border-b py-1">
              <label
                htmlFor="to"
                className="block text-base font-bold text-textBlack"
              >
                To:
              </label>
              {showMod && userList.length ? (
                <div
                  onClick={() => {
                    setShowMod(false)
                  }}
                  className="flex min-h-35 min-w-full flex-grow flex-wrap items-center"
                >
                  {userList.map((item) => (
                    <>
                      <span className="px-1" key={item.key}>
                        {item.value}
                      </span>
                      ;
                    </>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap">
                {userList.map((item) => (
                      <Popover
                        className="ml-4"
                        placement="topLeft"
                        key={item.key}
                        content={<p>{item.value}</p>}
                      >
                        <div className="flex">
                          <div className="cont_item">
                            <div className="h-6 w-6">
                              <Avatar
                            size={24}
                            src={item.tag === 'Gmail' ? gmail : item.tag === 'polkadot' ? polkadot: ''}
                            style={(item.tag === 'Gmail' || item.tag === 'polkadot') ? { } : {backgroundColor: item.color, color: '#fff'}}
                              >
                                {(item.tag === 'Gmail' || item.tag === 'polkadot') ? '' : item.label}
                              </Avatar>
                            </div>
                            <div className="max-w-xs truncate px-1">
                              {item.value}
                            </div>
                            <div>
                              <AiOutlineClose
                                onClick={(e) => deleteItem(e, item)}
                              />
                            </div>
                          </div>
                        </div>
                      </Popover>
                    ))}
                  <div className="relative flex-grow">
                    <input
                      type="text"
                        id="to"
                        style={{ minWidth: '200px' }}
                      placeholder="Recipient"
                      autoComplete="off"
                      required
                      ref={inputEl}
                      value={toValue}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      onChange={onChange}
                      className="block w-full truncate rounded border border-none bg-white p-2.5 text-sm text-gray-900 focus:border-none focus:ring-white"
                    />
                    <div
                      style={{ display: showDrop ? 'block' : 'none' }}
                      className="absolute z-10 translate-y-1 translate-x-4 rounded bg-white py-2	shadow-3xl transition-all"
                    >
                      {options.map((item) => (
                        <div
                          key={item.key}
                          onClick={(e) => choseItem(e, item)}
                          className="flex cursor-pointer items-center bg-bgGray py-2 px-1"
                        >
                          <div>
                            <Avatar
                              size={24}
                              src={item.tag === 'Gmail' ? gmail : item.tag === 'polkadot' ? polkadot: ''}
                              style={(item.tag === 'Gmail' || item.tag === 'polkadot') ? { } : {backgroundColor: item.color, color: '#fff'}}
                            >
                                {(item.tag === 'Gmail' || item.tag === 'polkadot') ? '' : item.label}
                            </Avatar>
                          </div>
                          <div className="px-1">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* {accountType && (
                <div className="flex h-fit items-center rounded bg-btnBlue p-1.5 px-2 py-0.5 font-sans text-base text-white transition">
                  {accountType}
                </div>
              )} */}
            </div>
            <div className="h-14 text-xs text-red-600 ">{tipText}</div>
            <div className="flex items-center border-b py-1">
              <label
                htmlFor="to"
                className="block text-base font-bold text-black"
              >
                Subject:
              </label>
              <input
                type="text"
                id="to"
                placeholder="Message Subject"
                autoComplete="off"
                value={subjectValue}
                onFocus={() => setShowMod(true)}
                onChange={(e) => {
                  setSubjectValue(e.target.value)
                }}
                required
                className="block w-full truncate rounded border border-none bg-white p-2.5 text-sm text-gray-900 focus:border-none focus:ring-white"
              />
            </div>
          </div>
          <div className="grow overflow-scroll rounded-lg bg-white px-4 py-2 shadow">
            <div className="h-5/6 grow pb-4">
              <ReactQuill
                theme="snow"
                className="h-full"
                modules={editorModules}
                value={mailInfo}
                onChange={setMailInfo}
              ></ReactQuill>
            </div>
          </div>
          <div className="flex pt-4 pl-4">
            <button
              onClick={submit}
              className="mr-3 rounded bg-btnBlue px-5 py-2 text-white transition hover:bg-btnHoverBlue"
            >
              Send
            </button>
            <button
              onClick={submit}
              className="mr-3 flex items-center rounded bg-btnGary px-5 py-2 text-textBlack transition hover:bg-btnHoverGary"
            >
              <img className="mr-2 h-5 w-5" src={drafts} alt="" /> Save draft
            </button>
            <button
              onClick={submit}
              className="flex items-center rounded bg-btnGary px-5 py-2 text-textBlack transition hover:bg-btnHoverGary"
            >
              <img className="mr-2 h-5 w-5" src={trash} alt="" /> Discard
            </button>
          </div>
        </div>
      </div>
      {sending && (
        <div className="fixed inset-x-0 top-0 z-50 flex h-modal items-center justify-center overflow-y-auto bg-gray-900 opacity-20 overflow-x-hidden md:inset-0 md:h-full"></div>
      )}
    </>
  )
}

export default Home
