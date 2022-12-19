import { Route, Routes } from 'react-router-dom'
import Layout from '@/Layout/index'
import NotFund from '@/Layout/NotFound'

import Home from '@/views/Home'
import Inbox from '@/views/Inbox'
import Compose from '@/views/Compose'
import Sent from '@/views/Sent'
import Login from '@/views/Login'
import ShowMail from '@/views/ShowMail'
import Contracts from '@/views/Contracts'

export default function Router() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Inbox />} />
        <Route path="mail/:id" element={<ShowMail />} />
        <Route path="compose" element={<Compose />} />
        <Route path="sent" element={<Sent />} />
        <Route path="contracts" element={<Contracts />} />
      </Route>
      <Route path="*" element={<NotFund />} />
    </Routes>
  )
}
