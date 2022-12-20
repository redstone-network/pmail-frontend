/* eslint-disable tailwindcss/classnames-order */
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor/Editor.css'
import { uploadMail } from '@/service/index'
import { nanoid } from 'nanoid'
import { sendMailBlock } from '@/substrate/index'
import { useAppSelector } from '@/hooks'
import { Dropdown, Toast } from 'flowbite-react'
import { editorModules, editorFormats } from './Editor/editor'
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
  const selectItem = (activeType: TypeItem) => {
    setActiveType(activeType)
  }
  const submit = async () => {
    const uuid = nanoid()
    const now = new Date()
    const body = {
      subject: subjectValue,
      body: `<meta http-equiv="Content-Type" content="text/html; charset=GB18030">${mailInfo}`,
      from: [
        {
          Name: `=?gb18030?B?${user.mail}?=`,
          Address: user.address
        }
      ],
      to: [
        {
          Name: '=?gb18030?B??=',
          Address: toValue
        }
      ],
      date: now.toString(),
      timestampe: now.getTime()
    }
    const { code, data } = await uploadMail<string>(uuid, body)
    if (!activeType) {
      return
    }
    if (code === 0 && data) {
      const timestamp = new Date().getTime()
      const storeHash = data
      sendMailBlock(
        {
          [activeType.value]: toValue
        },
        timestamp,
        storeHash
      )
    }
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
    </>
  )
}

export default Home
