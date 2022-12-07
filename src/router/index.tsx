import { useRoutes } from 'react-router-dom'

import Layout from '@/Layout/index'
import NotFund from '@/Layout/NotFound'

import Home from '@/views/Home'
import Inbox from '@/views/Inbox'
import Compose from '@/views/Compose'
import Sent from '@/views/Sent'
import Spam from '@/views/Spam'
import Trash from '@/views/Trash'
import Drafts from '@/views/Drafts'

export default function Router() {
  return useRoutes([
    {
      path: 'home',
      element: <Home />
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'inbox',
          element: <Inbox />
        },
        {
          path: 'compose',
          element: <Compose />
        },
        {
          path: 'sent',
          element: <Sent />
        },
        {
          path: 'spam',
          element: <Spam />
        },
        {
          path: 'trash',
          element: <Trash />
        },
        {
          path: 'drafts',
          element: <Drafts />
        }
      ]
    },
    {
      path: '*',
      element: <NotFund />
    }
  ])
}
