import ReactDOM from 'react-dom/client'
import './index.css'
import {Toaster} from 'react-hot-toast'
import AuthProviders from './Providers/AuthProviders';
import {HelmetProvider} from 'react-helmet-async'
import { router } from './Routrs/Route';
import { RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
 <HelmetProvider>
  <QueryClientProvider client={queryClient}>
  <AuthProviders>
  <RouterProvider router={router} />
   <Toaster/>
 </AuthProviders>
 </QueryClientProvider>
 </HelmetProvider>

)
