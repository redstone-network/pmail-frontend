/* eslint-disable tailwindcss/classnames-order */
import React from 'react'
import MailList from '@/components/MailList'
import { Button, Modal, TextInput } from 'flowbite-react'
import { bindMail, getMail } from '@/substrate/index'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { setMail } from '@/store/user'
import { Types } from '@/components/MailList'

function Send() {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [bindShow, setBindShow] = useState(false)
  useEffect(() => {
    async function init() {
      if (!user.mail) {
        const mail = await getMail(user.address)
        if (!mail) {
          setBindShow(true)
        } else {
          dispatch(setMail(mail as string))
        }
      }
    }
    init()
  }, [])
  const doBind = async () => {
    await bindMail(`${name}@pmailbox.org`)
    dispatch(setMail(`${name}@pmailbox.org`))
    setBindShow(false)
  }
  return (
    <div className="h-full py-4 bg-white rounded-lg shadow">
      <MailList type={Types.SEND} />
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
              @pmailbox.org
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

export default Send
