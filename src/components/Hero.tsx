"use client";

import StatsSection from "./StatsSection";
import { Button } from "./WalletButton";
import { WalletMultiButton } from "./WalletMultiButton";
import { useWallet } from "@solana/wallet-adapter-react";

export const Hero = () => {
  const wallet = useWallet();
  const publicKey = wallet?.publicKey;

  return (
    <main className="flex px-8 sm:px-20 pb-20 md:pt-0 pt-8 flex-1 bg-gradient-slate text-[var(--color-text-primary)] row-start-2 justify-center items-end sm:items-end w-full gap-10 flex-col sm:flex-row">
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="sm:text-6xl text-4xl font-bold flex-1 md:text-left text-center">
          <span className="hidden sm:block">&nbsp; &nbsp; &nbsp; &nbsp;</span>
          <span className="text-[var(--color-primary-neon)] mr-1">{"}"}</span>
          Grow Your Stache
        </h2>
        <h4 className="font-semibold text-xl">(razor not included)</h4>
        <div>
          {publicKey ? (
            <Button
              onClick={() => {
                const stakingSection =
                  document.getElementById("staking-section");
                if (stakingSection) {
                  stakingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={
                "bg-grill-marks bg-[var(--color-primary-neon)] cursor-pointer text-neutral-100 px-12 py-4 rounded-md transition-colors duration-300 ease-in-out w-full md:w-auto"
              }
            >
              Stake Now
            </Button>
          ) : (
            <WalletMultiButton
              wrapperClassName="w-full sm:w-auto"
              className="bg-grill-marks sm:w-auto bg-[var(--color-primary-neon)] hover:bg-[var(--color-secondary-accent)] cursor-pointer text-neutral-100 px-12 py-4 w-full rounded-md transition-colors duration-300 ease-in-out"
            >
              Connect Wallet and Stake
            </WalletMultiButton>
          )}
        </div>
      </div>
      <div className="flex-1 hidden md:block">
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
