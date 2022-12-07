import { useRoutes } from 'react-router-dom'
import Home from '@/views/Home'
import About from '@/views/Inbox'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    }
  ])
}
