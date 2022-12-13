/* eslint-disable tailwindcss/classnames-order */
import React from 'react'
import MailList from './MailList'
import { Button, Modal, TextInput } from 'flowbite-react'

function Inbox() {
  return (
    <div className="py-4 bg-white rounded-lg shadow">
      <MailList />
      <Modal show={true} size="md">
        <Modal.Body>
          <div className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              bind mail address
            </h3>
            <div>
              <TextInput
                id="email"
                placeholder="name@pmail.io"
                required={true}
              />
            </div>
            <div className="flex justify-center w-full">
              <Button size="lg" gradientDuoTone="purpleToBlue">
                bind
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Inbox
