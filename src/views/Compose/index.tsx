/* eslint-disable tailwindcss/classnames-order */
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor/Editor.css'
import { uploadMail } from '@/service/index'
import { nanoid } from 'nanoid'

function Home(): JSX.Element {
  const [value, setValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [subjectValue, setSubjectValue] = useState('')
  const submit = () => {
    const uuid = nanoid()
    const now = new Date()
    const params = {
      subject: subjectValue,
      body: `<meta http-equiv="Content-Type" content="text/html; charset=GB18030">${value}`,
      from: [
        {
          Name: '=?gb18030?B?0KGw18H6?=',
          Address: '116174160@qq.com'
        }
      ],
      to: [
        {
          Name: '=?gb18030?B?dGVzdDE=?=',
          Address: 'test1@pmailbox.org'
        }
      ],
      date: now.toString(),
      timestampe: now.getTime()
    }
    uploadMail(uuid, params)
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ]
  return (
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
              required
              value={toValue}
              onChange={(e) => {
                setToValue(e.target.value)
              }}
              className="block w-full truncate rounded border border-none bg-white p-2.5 text-sm text-gray-900 focus:border-none focus:ring-white"
            />
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
              modules={modules}
              formats={formats}
              value={value}
              onChange={setValue}
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
  )
}

export default Home
