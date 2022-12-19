import { BsReply, BsTrash } from 'react-icons/bs'
import Account from '@/assets/account.png'

function ShowMail(): JSX.Element {
  return (
    <div className="flex flex-col w-full h-full p-4 overflow-scroll bg-white rounded-lg shadow">
      <div className="flex flex-col flex-wrap gap-3 lg:flex-row lg:items-center lg:justify-start">
        <h5 className="text-xl font-semibold uppercase text-textBlack">
          TITLE
        </h5>
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
        <div className="truncate text-textBlue">
          1231woeijfiwno324onfoiew@pmail.io
        </div>
      </div>
      <div className="pt-2 pl-10 text-textBlack">nov sss</div>
      <div className="px-10 py-2"></div>
    </div>
  )
}

export default ShowMail
