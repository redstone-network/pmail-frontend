/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { setName, setAddress } from '@/store/user'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import logo from '@assets/PMaiLogo.png'
import text from '@assets/text.png'
import media from '@assets/media.png'
import discord from '@assets/discord.png'
import telegram from '@assets/telegram.png'
import twitter from '@assets/twitter.png'
import Polkadotlogo from '@assets/Polkadotlogo.png'
import { GiCheckMark } from 'react-icons/gi'
import accountImg from '@assets/account.png'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { Button, ListGroup, Modal } from 'flowbite-react'

function Login() {
  const appName = import.meta.env.VITE_APP_NAME
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const [selectedInfo, setSelectedInfo] = useState<{
    name: string
    address: string
  }>({
    name: '',
    address: ''
  })
  useEffect(() => {
    if (user) {
      setSelectedInfo({
        name: user.name,
        address: user.address
      })
    }
  }, [user])

  const [accountsNotFound, setAccountsNotFound] = useState(false)
  const [isAccountLoading, setIsAccountLoading] = useState(true)
  const [extensionNotFound, setExtensionNotFound] = useState(false)

  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [accountModalShow, setAccountModalShow] = useState(false)
  const closeModal = () => setAccountModalShow(false)

  const chooseAccount = (account: InjectedAccountWithMeta) => {
    setSelectedInfo({
      name: account.meta.name ?? '',
      address: account.address
    })
  }
  const confirm = () => {
    dispatch(setAddress(selectedInfo.address))
    dispatch(setName(selectedInfo.name))
    setAccountModalShow(false)
    navigate('/inbox')
  }
  const getAccounts = async (): Promise<undefined> => {
    const extensions = await web3Enable(appName)

    if (extensions.length === 0) {
      setExtensionNotFound(true)
      setIsAccountLoading(false)
      return
    } else {
      setExtensionNotFound(false)
    }

    const accounts = await web3Accounts()
    if (accounts.length === 0) {
      setAccountsNotFound(true)
      setIsAccountLoading(false)
      return
    } else {
      setAccountsNotFound(false)
    }
    console.log(accounts)
    setAccounts(accounts)
    setIsAccountLoading(false)
    setSelectedInfo({
      name: user.name,
      address: user.address
    })
    setAccountModalShow(true)
    return
  }
  return (
    <>
      <div className="flex items-center justify-center w-full h-full bg-white bg-center bg-no-repeat bg-contain bg-hero-pattern ">
        <div className="flex flex-col items-center justify-between h-full mx-auto w-951">
          <div>
            <div className="pt-16">
              <img className="mx-auto w-256" src={logo} alt="" />
            </div>
            <div className="pt-12">
              <img className="mx-auto w-363" src={text} alt="" />
            </div>
            <div className="flex px-2 py-3 mx-auto mt-20 text-center rounded-full w-44 bg-grayText bg-opacity-40">
              <img className="w-6 h-6 mr-4" src={Polkadotlogo} alt="" />
              <button onClick={getAccounts}>Connect Wallet</button>
            </div>
          </div>
          <div className="flex pb-20">
            <img className="mr-7 h-7 w-7" src={twitter} alt="" />
            <img className="mr-7 h-7 w-7" src={discord} alt="" />
            <img className="mr-7 h-7 w-7" src={media} alt="" />
            <img className="h-7 w-7" src={telegram} alt="" />
          </div>
        </div>
      </div>
      <Modal show={accountModalShow} onClose={closeModal}>
        <Modal.Header>Choose Account</Modal.Header>
        <Modal.Body>
          <ListGroup>
            {accounts.map((account) => (
              <ListGroup.Item
                active={selectedInfo.address === account.address}
                className="mb-2"
                onClick={() => chooseAccount(account)}
                key={account.address}
              >
                <div className="flex items-center justify-between w-full py-2">
                  <div className="flex items-center">
                    <div>
                      <img className="w-6 h-6 mr-2" src={accountImg} alt="" />
                    </div>
                    <div className="text-left">
                      <div>{account.meta.name}</div>
                      <div>{account.address}</div>
                    </div>
                  </div>
                  <div>
                    {selectedInfo.address === account.address ? (
                      <GiCheckMark />
                    ) : null}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          <Button onClick={confirm} gradientDuoTone="purpleToBlue">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login
