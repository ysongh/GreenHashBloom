import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createAppKit } from '@reown/appkit/react';

import './index.css'
import App from './App.jsx'
import { config, wagmiAdapter, hederaTestnet } from "./wagmi"

const queryClient = new QueryClient();

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'

// Create AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [hederaTestnet],
  metadata: {
    name: 'Green Hash Bloom',
    description: 'Plant trees and earn carbon credits',
    url: 'https://your-app-url.com',
    icons: ['https://your-app-url.com/icon.png']
  },
  features: {
    analytics: true
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
