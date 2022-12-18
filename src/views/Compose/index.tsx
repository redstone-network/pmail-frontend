/* eslint-disable tailwindcss/classnames-order */
import { Button } from 'flowbite-react'
import Editor from './Editor/Editor'

function Home(): JSX.Element {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow">
      <form className="flex flex-col h-full">
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
              required
              className="block w-full truncate rounded border border-none bg-white p-2.5 text-sm text-gray-900 focus:border-none focus:ring-white"
            />
          </div>
        </div>
        <div className="px-4 py-2 overflow-scroll bg-white rounded-lg shadow grow">
          <div className="pb-4 grow">
            <Editor />
          </div>
        </div>
        <div className="pt-4 pl-4">
          <button className="px-5 py-2 text-white rounded bg-btnBlue hover:bg-btnHoverBlue">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
