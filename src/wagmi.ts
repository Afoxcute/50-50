import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain, Transport, createPublicClient, defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  EntryPointVersion,
  PaymasterActions,
  SmartAccount,
} from "viem/account-abstraction";
import { http } from 'viem';

// Define BLE testnet chain
const bleTestnet = defineChain({
  id: 52085143,
  name: "Ethena Testnet Network",
  nativeCurrency: {
    decimals: 18,
    name: "USDe",
    symbol: "USDe",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-ethena-testnet-0.t.conduit.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethena Testnet Network",
      url: "https://explorer-ethena-testnet-0.t.conduit.xyz"
    }
  }
});

export const config = getDefaultConfig({
  appName: 'RockPaperScissors',
  projectId: '6ff8eb59587cd5a38c24cc85d30763ea',
  chains: [bleTestnet],
  ssr: true,
  transports: {
    [bleTestnet.id]: http(
      'https://rpc-ethena-testnet-0.t.conduit.xyz'
    ),
  },
});


