import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'virtual:svg-icons-register'
import 'flowbite'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import '@/styles/index.css'
import App from './App'
import store from './store'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
