import { Button as WalletButton } from "../WalletButton";
import { NativeStakeModal } from "./NativeStakeModal";
import { useState } from "react";

export function StakeWithUsSection({
  title,
  description,
  cta = "Stake",
}: {
  title: string;
  description: string;
  cta?: string;
}) {
  const [nativeStakeModalOpen, setNativeStakeModalOpen] = useState(false);
  return (
    <>
      <div className="mt-8 w-full border-t border-neutral-700 py-6 bg-gradient-slate px-8">
        <h4 className="text-lg font-medium text-neutral-100 mb-4">{title}</h4>
        <p className="text-neutral-300 mb-4">{description}</p>
        <WalletButton
          onClick={() => setNativeStakeModalOpen(true)}
          disabled={nativeStakeModalOpen}
          className={
            "bg-grill-marks bg-[var(--color-primary-neon)] cursor-pointer text-neutral-100 px-4 py-4 rounded-md transition-colors duration-300 ease-in-out min-w-[200px]"
          }
        >
          {cta}
        </WalletButton>
      </div>
      <NativeStakeModal
        isOpen={nativeStakeModalOpen}
        onClose={() => setNativeStakeModalOpen(false)}
      />
    </>
  );
}
