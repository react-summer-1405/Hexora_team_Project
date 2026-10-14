import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './app/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 60 * 1000,
      retry:1,
    }
  }})


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
