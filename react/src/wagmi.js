import { http, createConfig } from "wagmi";
import { walletConnect, injected } from "@wagmi/connectors";

// Hedera Testnet chain config
const hederaTestnet = {
  id: 296, // 0x128 in hex
  name: 'Hedera Testnet',
  network: 'hedera-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HBAR',
    symbol: 'HBAR',
  },
  rpcUrls: {
    default: { http: ['https://testnet.hashio.io/api'] },
    public: { http: ['https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/testnet' },
  },
  testnet: true,
};

const projectId = "YOUR_WALLETCONNECT_PROJECT_ID"; // Get from https://cloud.walletconnect.com

export const config = createConfig({
  chains: [hederaTestnet],
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: "Your App Name",
        description: "Your App Description",
        url: "https://your-app-url.com",
        icons: ["https://your-app-url.com/icon.png"],
      },
      showQrModal: true,
    }),
    injected(), // For browser wallets like MetaMask, HashPack
  ],
  transports: {
    [hederaTestnet.id]: http(),
  },
});