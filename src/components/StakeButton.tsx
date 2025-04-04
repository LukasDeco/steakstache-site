import {
  Keypair,
  StakeProgram,
  VersionedTransaction,
  TransactionMessage,
  LAMPORTS_PER_SOL,
  Lockup,
  Authorized,
} from "@solana/web3.js";
import { Button } from "./WalletButton";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { VALIDATOR_VOTE_ACCOUNT } from "@/constants";
export const StakeButton = () => {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [openedForm, setOpenedForm] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const handleStake = async () => {
    console.log("stakeAmount", stakeAmount);
    try {
      if (!publicKey || !wallet || !signTransaction)
        throw new Error("Wallet not connected");

      // Create a stake account transaction
      const stakeAccount = await Keypair.generate();
      const minimumStakeBalance =
        await connection.getMinimumBalanceForRentExemption(StakeProgram.space);

      // TODO try a simple sol transfer ix
      const createStakeAccountIxs = StakeProgram.createAccount({
        authorized: new Authorized(publicKey, publicKey), // Here we set two authorities: Stake Authority and Withdrawal Authority. Both are set to our wallet.
        fromPubkey: publicKey,
        lamports: minimumStakeBalance + stakeAmount * LAMPORTS_PER_SOL,
        lockup: new Lockup(0, 0, publicKey), // Optional. We'll set this to 0 for demonstration purposes.
        stakePubkey: stakeAccount.publicKey,
      }).instructions;

      // Add validator delegation
      const delegateIxs = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: publicKey,
        votePubkey: VALIDATOR_VOTE_ACCOUNT,
      }).instructions;

      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        instructions: [...createStakeAccountIxs, ...delegateIxs],
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);

      const simulate = await connection.simulateTransaction(transaction);

      console.log("simulate", simulate);

      const signedTx = await wallet.adapter.sendTransaction(
        transaction,
        connection,
        {
          signers: [stakeAccount],
        }
      );

      console.log("signedTx", signedTx);
    } catch (error: unknown) {
      console.error("Staking failed:", error);
    }
  };

  return (
    <>
      {openedForm ? (
        <div
          className={twMerge(
            "bg-[var(--color-background)] h-[64px] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out flex items-center w-full sm:w-auto",
            openedForm ? "" : "hover:bg-[var(--color-secondary-accent)]"
          )}
        >
          {openedForm ? (
            <div className="flex gap-2 items-center">
              <div>Enter Stake:</div>
              <input
                type="number"
                className="bg-transparent border-none outline-none"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
              />
              <button
                className="bg-[var(--color-secondary-accent)] cursor-pointer hover:bg-[#8ad2bb] text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
                onClick={handleStake}
              >
                Stake
              </button>
            </div>
          ) : (
            "Stake for Higher APY"
          )}
        </div>
      ) : (
        <Button
          onClick={() => setOpenedForm(true)}
          disabled={openedForm}
          className={twMerge(
            "bg-[var(--color-background)] h-[64px] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out w-full sm:w-auto",
            openedForm ? "" : "hover:bg-[var(--color-secondary-accent)]"
          )}
        >
          Stake for Higher APY
        </Button>
      )}
    </>
  );
};
