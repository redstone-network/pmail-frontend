import './index.css'
import logo from '@/assets/logo.png'
import compose from '@/icons/compose.png'
import drafts from '@/icons/drafts.png'
import inbox from '@/icons/inbox.png'
import sent from '@/icons/sent.png'
import spam from '@/icons/spam.png'
import trash from '@/icons/trash.png'
import logOut from '@/icons/logout.png'
import account from '@assets/account.png'

function Home(): JSX.Element {
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
      href: '/inbox',
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
        <div className="flex h-full	flex-col justify-around">
          <div>
            <div className="pl-6 pt-12">
              <img className="w-117" src={logo} alt="logo" />
            </div>
            <div className="pt-12">
              <ul className="px-2">
                {menus.map((item) => (
                  <li
                    key={item.name}
                    className="mb-2 flex	 h-8 w-236	 cursor-pointer items-center  justify-between rounded-full transition-colors hover:bg-sideBarHoverBackground hover:text-white"
                  >
                    <div className="flex items-center ">
                      <img className="mx-4 h-5 w-5" src={item.icon} alt="" />
                      <div>{item.name}</div>
                    </div>
                    {item.value ? (
                      <div className="mx-3">{item.value}</div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-6">
            <div className="mb-4 flex items-center border-t border-gray pt-4">
              <div className="mr-3 h-50 w-50 rounded-full">
                <img src={account} alt="" />
              </div>
              <div>
                <div className="mb-1 w-36 truncate text-white">My account</div>
                <div className="w-36 truncate">
                  5GBNLQbbTZSog5GBNLQbbTZSog5GBNLQbbTZSog
                </div>
              </div>
            </div>
            <div className="mb-10 flex cursor-pointer items-center">
              <div className="mr-5 h-5 w-5">
                <img src={logOut} alt="" />
              </div>
              <div className="text-blue">Log Out</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-5 py-8">
        <div className="h-full w-full overflow-hidden bg-white">1</div>
      </div>
    </div>
  )
}

export default Home
