/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { setName, setId } from '@/store/user'
import { useAppDispatch } from '@store/hooks'
import { useNavigate } from 'react-router-dom'
import logo from '@assets/PMaiLogo.png'
import text from '@assets/text.png'
import media from '@assets/media.png'
import discord from '@assets/discord.png'
import telegram from '@assets/telegram.png'
import twitter from '@assets/twitter.png'
import Polkadotlogo from '@assets/Polkadotlogo.png'

function Login() {
  const Navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [name, changeName] = useState('')
  const [id, changeId] = useState('')

  const submit = () => {
    dispatch(setName(name))
    dispatch(setId(id))
    Navigate('/')
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-white bg-hero-pattern bg-contain	 bg-center	 bg-no-repeat	">
      <div className="mx-auto flex h-full w-951 flex-col items-center justify-between">
        <div>
          <div className="pt-16">
            <img className="mx-auto w-256" src={logo} alt="" />
          </div>
          <div className="pt-12">
            <img className="mx-auto w-363" src={text} alt="" />
          </div>
          <div className="mx-auto mt-20 flex w-44  rounded-full	 bg-grayBtnBackground  bg-opacity-40 py-3 px-2 text-center">
            <img className="mr-4 h-6 w-6" src={Polkadotlogo} alt="" />
            <button>Connect Wallet</button>
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
  )
}

export default Login
