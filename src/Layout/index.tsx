import logo from '@/assets/logo.png'
import compose from '@/icons/compose.png'
import drafts from '@/icons/drafts.png'
import inbox from '@/icons/inbox.png'
import sent from '@/icons/sent.png'
import spam from '@/icons/spam.png'
import trash from '@/icons/trash.png'
import logOut from '@/icons/logout.png'
import account from '@assets/account.png'
import { Outlet, NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { setName, setId } from '@/store/user'

const Layout = (): JSX.Element => {
  const user = useAppSelector((state) => state.user)
  const Navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!user.name) {
      Navigate('/login')
    }
  })
  const doLogout = () => {
    dispatch(setName(''))
    dispatch(setId(''))
    Navigate('/login')
  }

  const menus = [
    {
      icon: compose,
      name: 'Compose',
      href: '/compose',
      value: 0
    },
    {
      icon: inbox,
      name: 'Inbox',
      href: '/',
      value: 0
    },
    {
      icon: sent,
      name: 'Sent',
      href: '/sent',
      value: 0
    },
    {
      icon: drafts,
      name: 'Drafts',
      href: '/drafts',
      value: 0
    },
    {
      icon: spam,
      name: 'Spam',
      href: '/spam',
      value: 0
    },
    {
      icon: trash,
      name: 'Trash',
      href: '/trash',
      value: 0
    }
  ]
  return (
    <div className="flex h-screen w-screen overflow-hidden	bg-background">
      <div className="h-screen w-256 flex-none overflow-hidden  bg-SideBarBackground text-SideBarText">
        <div className="flex h-full	flex-col justify-between">
          <div>
            <div className="pl-6 pt-12">
              <img className="w-117" src={logo} alt="logo" />
            </div>
            <div className="pt-12">
              <div className="px-2">
                {menus.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      const normalClass =
                        'mb-2 flex	 h-8 w-236	 cursor-pointer items-center  justify-between rounded-full transition-colors hover:bg-sideBarHoverBackground hover:text-white'
                      return isActive
                        ? normalClass +
                            ' bg-SideBarActiveBackground text-whiteText'
                        : normalClass
                    }}
                  >
                    <div className="flex items-center ">
                      <img className="mx-4 h-5 w-5" src={item.icon} alt="" />
                      <div>{item.name}</div>
                    </div>
                    {item.value ? (
                      <div className="mx-3">{item.value}</div>
                    ) : null}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className="mb-4 flex items-center border-t border-borderGray pt-4">
              <div className="mr-3 h-50 w-50 rounded-full">
                <img src={account} alt="" />
              </div>
              <div>
                <div className="mb-1 w-36 truncate text-white">{user.name}</div>
                <div className="w-36 truncate">{user.id}</div>
              </div>
            </div>
            <div
              onClick={doLogout}
              className="mb-10 flex cursor-pointer items-center"
            >
              <div className="mr-5 h-5 w-5">
                <img src={logOut} alt="" />
              </div>
              <div className="text-textBlue">Log Out</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-5 py-8">
        <div className="h-full w-full overflow-hidden bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
