import React from 'react'
import MailList from './MailList'
import { RiDeleteBinLine, RiFileSearchLine } from 'react-icons/ri'

function Inbox() {
  return (
    <div className="rounded-lg bg-white py-4 shadow">
      <div className="mt-2 flex flex-col px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col flex-wrap gap-3 lg:flex-row lg:items-center lg:justify-start">
          <h5 className="text-xl font-semibold uppercase">INBOX</h5>
        </div>
        <div className="flex pt-4">
          <button className="btn flex w-11 justify-center">
            <RiFileSearchLine />
          </button>
          <button className="btn flex w-11 justify-center">
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
      <MailList />
    </div>
  )
}

export default Inbox
