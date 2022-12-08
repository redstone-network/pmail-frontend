import { Label, TextInput, Button } from 'flowbite-react'
import { setName, setId } from '@/store/user'
import { useAppDispatch } from '@store/hooks'
import { useNavigate } from 'react-router-dom'
import logo from '@assets/logo.png'

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
    <div className="flex h-full w-full items-center justify-center bg-SideBarBackground">
      <div className="flex w-1/2 flex-col">
        <div>
          <img className="mx-auto w-117" src={logo} alt="" />
        </div>
        <div className="mb-4">
          <div className="mb-2 block text-whiteText">
            <Label htmlFor="email1" value="Your count" />
          </div>
          <TextInput
            type="email"
            value={name}
            onChange={(e) => changeName(e.target.value)}
            placeholder="name@flowbite.com"
            required={true}
          />
        </div>
        <div className="mb-8">
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            onChange={(e) => changeId(e.target.value)}
            value={id}
            type="password"
            required={true}
          />
        </div>
        <Button type="submit" onClick={submit}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Login
