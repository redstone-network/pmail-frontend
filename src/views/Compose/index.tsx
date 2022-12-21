/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/classnames-order */
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor/Editor.css'
import { uploadMail } from '@/api/index'
import { nanoid } from 'nanoid'
import { sendMailBlock } from '@/api/substrate'
import { useAppSelector } from '@/hooks'
import { Dropdown, Spinner, Toast } from 'flowbite-react'
import { editorModules, editorFormats } from './Editor/editor'
import { HiX } from 'react-icons/hi'

interface TypeItem {
  value: string
  label: string
}
function Home(): JSX.Element {
  const user = useAppSelector((state) => state.user)
  const [mailInfo, setMailInfo] = useState('')
  const [toValue, setToValue] = useState('')
  const [subjectValue, setSubjectValue] = useState('')
  const [activeType, setActiveType] = useState<TypeItem | null>(null)
  const [sending, setSending] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const selectItem = (activeType: TypeItem) => {
    setActiveType(activeType)
  }
  const submit = async () => {
    if (!activeType) {
      return
    }
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
      to: [
        {
          Name: '',
          Address: toValue
        }
      ],
      date: now.toDateString(),
      timestampe: now.getTime()
    }
    setSending(true)
    const { code, data } = await uploadMail<string>(uuid, body)

    if (code === 0 && data) {
      const timestamp = new Date().getTime()
      const storeHash = data
      await sendMailBlock(
        {
          [activeType.value]: toValue
        },
        timestamp,
        storeHash
      )
    }
    setSending(false)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }
  const typeList: TypeItem[] = [
    {
      value: 'NormalAddr',
      label: 'web2 Address'
    },
    {
      value: 'ETHAddr',
      label: 'EHT Address'
    },
    {
      value: 'SubAddr',
      label: 'Substrate Address'
    },
    {
      value: 'MoonbeamAddr',
      label: 'Moonbeam Address'
    }
  ]

  return (
    <>
      <div className="flex flex-col w-full h-full rounded-lg shadow">
        <div className="flex flex-col h-full">
          <div className="px-4 py-2 mb-3 bg-white rounded-lg shadow">
            <div className="flex items-center py-1 border-b">
              <label
                htmlFor="to"
                className="block text-base font-bold text-black"
              >
                To:
              </label>
              <input
                type="text"
                id="to"
                placeholder="Recipient"
                autoComplete="off"
                required
                value={toValue}
                onChange={(e) => {
                  setToValue(e.target.value)
                }}
                className="block w-full truncate rounded border border-none bg-white p-2.5 text-sm text-gray-900 focus:border-none focus:ring-white"
              />
              <div className="w-48 shrink-0">
                <Dropdown
                  label={activeType ? activeType.label : 'Account Type'}
                >
                  {typeList.map((item) => (
                    <Dropdown.Item
                      key={item.value}
                      onClick={() => selectItem(item)}
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>
            <div className="flex items-center py-1 border-b">
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
                onChange={(e) => {
                  setSubjectValue(e.target.value)
                }}
                required
                className="block w-full truncate rounded border border-none bg-white p-2.5 text-sm text-gray-900 focus:border-none focus:ring-white"
              />
            </div>
          </div>
          <div className="px-4 py-2 overflow-scroll bg-white rounded-lg shadow grow">
            <div className="pb-4 grow">
              <ReactQuill
                theme="snow"
                modules={editorModules}
                formats={editorFormats}
                value={mailInfo}
                onChange={setMailInfo}
              />
            </div>
          </div>
          <div className="pt-4 pl-4">
            <button
              onClick={submit}
              className="px-5 py-2 text-white rounded bg-btnBlue hover:bg-btnHoverBlue"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast className="fixed top-0 left-1/2 ">
          <div className="inline-flex items-center justify-center w-8 h-8 text-red-500 bg-red-100 rounded-lg shrink-0 dark:bg-red-800 dark:text-red-200">
            <HiX className="w-5 h-5" />
          </div>
          <div className="ml-3 text-sm font-normal">send successful</div>
        </Toast>
      )}
      {sending && (
        <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto h-modal md:inset-0 md:h-full">
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="overflow-hidden bg-gray-900 bg-opacity-50 rounded-md">
              <div className="flex flex-col items-center justify-center px-6 py-2">
                <Spinner />
                <span className="pl-3 text-white">Sending...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
