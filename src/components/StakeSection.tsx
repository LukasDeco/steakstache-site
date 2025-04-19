"use client";

import { NativeStakeModal } from "./NativeStakeModal";
import { Button } from "./WalletButton";
import { WalletMultiButton } from "./WalletMultiButton";
import { Skeleton } from "./ui/skeleton";
import { useStacheSOLAPY } from "@/hooks/useStacheSOLAPY";
import { useStakeWizData } from "@/hooks/useStakeWizData";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const StakeSection = () => {
  const [nativeStakeModalOpen, setNativeStakeModalOpen] = useState(false);
  const { publicKey } = useWallet();
  const { data, isLoading: stakewizLoading } = useStakeWizData();
  const { data: stacheSOLAPY, isLoading: stacheSOLAPYLoading } =
    useStacheSOLAPY();
  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Staking Strategies
        </h2>
        <div className="px-8 sm:px-20 w-full flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col justify-between items-center flex-1 bg-[var(--color-charcoal)] rounded-3xl p-6 border border-[var(--color-primary-neon)] hover:border-[var(--color-secondary-accent)] transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/images/logo.png"
                  alt="Validator Logo"
                  fill
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-100">
                Native Staking
              </h3>
            </div>
            <p className="text-neutral-300 mb-6 md:text-left text-center">
              Stake directly for maximum control of your stake
            </p>
            <div className="flex items-center flex-col gap-2 mb-6">
              <div className="text-neutral-300">APY</div>
              <div className="text-neutral-100 font-bold text-2xl">
                {stakewizLoading ? (
                  <Skeleton className="h-3 w-4 rounded-xl" />
                ) : (
                  data?.total_apy + "%"
                )}
              </div>
            </div>
            {publicKey ? (
              <Button
                onClick={() => setNativeStakeModalOpen(true)}
                disabled={nativeStakeModalOpen}
                className={
                  "bg-[var(--color-primary-neon)] cursor-pointer text-neutral-100 px-4 py-4 rounded-md transition-colors duration-300 ease-in-out w-full"
                }
              >
                Stake
              </Button>
            ) : (
              <WalletMultiButton
                wrapperClassName="w-full"
                className="bg-[var(--color-primary-neon)] cursor-pointer text-neutral-100 px-4 py-4 rounded-md transition-colors duration-300 ease-in-out w-full"
              >
                Connect Wallet and Stake
              </WalletMultiButton>
            )}
          </div>

          <div className="flex flex-col justify-between items-center flex-1 bg-[var(--color-charcoal)] rounded-3xl p-6 border border-[var(--color-primary-neon)] hover:border-[var(--color-secondary-accent)] transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/images/stacheSOL-2.png"
                  alt="LST Logo"
                  fill
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-100">
                LST Staking
              </h3>
            </div>
            <p className="text-neutral-300 mb-6 md:text-left text-center">
              Maintain liquidity while earning rewards
            </p>
            <div className="flex items-center flex-col gap-2 mb-6">
              <div className="text-neutral-300">APY</div>
              <div className="text-neutral-100 font-bold text-2xl">
                {stacheSOLAPYLoading ? (
                  <Skeleton className="h-3 w-4 rounded-xl" />
                ) : (
                  stacheSOLAPY?.toFixed(2) + "%"
                )}
              </div>
            </div>
            <Link
              className={
                "bg-[var(--color-primary-neon)] cursor-pointer text-neutral-100 px-4 py-4 rounded-md transition-colors duration-300 ease-in-out w-full text-center"
              }
              target="_blank"
              href="https://app.sanctum.so/stacheSOL"
            >
              Stake
            </Link>
          </div>
        </div>
      </div>
      <NativeStakeModal
        isOpen={nativeStakeModalOpen}
        onClose={() => setNativeStakeModalOpen(false)}
      />
    </>
  );
};

export default StakeSection;
