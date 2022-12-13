import { RiDeleteBinLine, RiFileSearchLine } from 'react-icons/ri'

function ShowMail(): JSX.Element {
  return (
    <div className="flex flex-col w-full h-full p-4 overflow-scroll bg-white rounded-lg shadow">
      <div className="flex flex-col flex-wrap gap-3 lg:flex-row lg:items-center lg:justify-start">
        <h5 className="text-xl font-semibold uppercase">TITLE</h5>
      </div>
      <div className="flex pt-4">
        <button className="flex justify-center btn w-11">
          <RiFileSearchLine /> Reply
        </button>
        <button className="flex justify-center btn w-11">
          <RiDeleteBinLine /> Delete
        </button>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default ShowMail
