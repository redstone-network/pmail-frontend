/* eslint-disable tailwindcss/classnames-order */
import React from 'react'
import MailList from './MailList'
import { Button, Modal, TextInput } from 'flowbite-react'
import { bindMail } from '@/substrate/index'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { setMail } from '@/store/user'

function Inbox() {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [bindShow, setBindShow] = useState(false)
  useEffect(() => {
    console.log(user)
    if (!user.mail) {
      setBindShow(true)
    }
  }, [user])
  const doBind = async () => {
    await bindMail(`${name}@pmail.io`)
    dispatch(setMail(`${name}@pmail.io`))
    setBindShow(false)
  }
  return (
    <div className="py-4 bg-white rounded-lg shadow">
      <MailList />
      <Modal show={bindShow} size="md">
        <Modal.Body>
          <div className="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              Bind Mail Address
            </h3>
            <div className="flex items-center">
              <TextInput
                className="mr-2"
                id="email"
                placeholder="add name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              @pmail.io
            </div>
            <div className="flex justify-center w-full">
              <Button onClick={doBind} size="lg" gradientDuoTone="purpleToBlue">
                Bind
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Inbox
