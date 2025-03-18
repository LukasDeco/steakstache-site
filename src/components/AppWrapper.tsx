"use client";

import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;

const queryClient = new QueryClient();

export const AppWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [MAINNET_RPC_URL]
  );

  return (
    <ConnectionProvider
      endpoint={MAINNET_RPC_URL ?? WalletAdapterNetwork.Mainnet}
    >
      <QueryClientProvider client={queryClient}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ConnectionProvider>
  );
};
