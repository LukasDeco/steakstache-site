"use client";

import { BaseWalletMultiButton } from "./WalletButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { StakeButton } from "./StakeButton";
import StatsSection from "./StatsSection";
export const Hero = () => {
  const wallet = useWallet();
  const publicKey = wallet?.publicKey;

  return (
    <main className="flex px-8 sm:px-20 pb-10 rounded-b-3xl flex-1 bg-[var(--color-background)] text-[var(--color-text-primary)] row-start-2 justify-center items-end sm:items-end w-full gap-10 flex-col sm:flex-row">
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="sm:text-6xl text-4xl font-bold flex-1">
          <span className="hidden sm:block">&nbsp; &nbsp; &nbsp; &nbsp;</span>
          <span className="text-[var(--color-primary-neon)] mr-1">{"}"}</span>
          SteakStache is a high-quality Solana validator
        </h2>
        <div>
          {publicKey ? (
            <StakeButton />
          ) : (
            <WalletMultiButton
              wrapperClassName="w-full sm:w-auto"
              className="w-full sm:w-auto bg-[var(--secondary-accent)] hover:bg-[var(--color-secondary-accent)] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        <StatsSection />
        {/* <div className="mb-4 flex flex-col gap-4"> */}
        {/* <div>
            SteakStache is a super low-commission, low-latency validator that
            will unlock a higher APY for your SOL. Connect your wallet and start
            staking today to earn a higher APY
          </div> */}
        {/* </div> */}
      </div>
    </main>
  );
};

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet",
} as const;

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  endIcon?: React.ReactElement;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: React.ReactElement;
  style?: React.CSSProperties;
  tabIndex?: number;
  children?: React.ReactNode;
  wrapperClassName?: string;
};

export function WalletMultiButton(props: ButtonProps) {
  return <BaseWalletMultiButton {...props} labels={LABELS} />;
}
