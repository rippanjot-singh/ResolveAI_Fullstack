import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { Provider } from 'react-redux'
import {store} from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './context/SocketContext.jsx'

if (import.meta.env.MODE === 'production') {
  console.log = () => {};
  console.warn = () => {};
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
