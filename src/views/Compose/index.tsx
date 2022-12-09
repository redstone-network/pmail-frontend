import Editor from './Editor/Editor'

function Home(): JSX.Element {
  return (
    <div
      className="flex h-full w-full flex-col overflow-scroll
     rounded-lg bg-white p-4 shadow"
    >
      <div className="my-4 flex items-center justify-between">
        <h5 className="text-xl font-bold uppercase">compose message</h5>
      </div>
      <form className="flex grow flex-col">
        <div className="pb-2">
          <label
            htmlFor="to"
            className="block pb-2 text-base font-bold text-black"
          >
            To:
          </label>
          <input
            type="text"
            id="to"
            placeholder="Recipient"
            required
            className="block w-full truncate rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="pt-4 pb-10">
          <label
            htmlFor="subject"
            className="block pb-2 text-base font-bold text-black"
          >
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Message subject"
            required
            className="block w-full truncate rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <label
          htmlFor="subject"
          className="block text-base font-bold text-black"
        >
          Message:
        </label>
        <div className="grow pb-4">
          <Editor />
        </div>
      </form>
    </div>
  )
}

export default Home
