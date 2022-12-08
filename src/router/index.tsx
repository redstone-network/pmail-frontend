import { Route, Routes } from 'react-router-dom'
import Layout from '@/Layout/index'
import NotFund from '@/Layout/NotFound'

import Home from '@/views/Home'
import Inbox from '@/views/Inbox'
import Compose from '@/views/Compose'
import Sent from '@/views/Sent'
import Spam from '@/views/Spam'
import Trash from '@/views/Trash'
import Drafts from '@/views/Drafts'
import Login from '@/views/Login'

export default function Router() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Inbox />} />
        <Route path="compose" element={<Compose />} />
        <Route path="sent" element={<Sent />} />
        <Route path="spam" element={<Spam />} />
        <Route path="trash" element={<Trash />} />
        <Route path="drafts" element={<Drafts />} />
      </Route>
      <Route path="*" element={<NotFund />} />
    </Routes>
  )
}
