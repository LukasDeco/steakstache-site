import {
  Keypair,
  Transaction,
  PublicKey,
  StakeProgram,
  VersionedTransaction,
  TransactionMessage,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Button } from "./WalletButton";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
export const StakeButton = () => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();
  const [openedForm, setOpenedForm] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const handleStake = async () => {
    console.log("stakeAmount", stakeAmount);
    try {
      if (!publicKey || !wallet) throw new Error("Wallet not connected");

      // Create a stake account transaction
      const stakeAccount = await Keypair.generate();
      const minimumStakeBalance =
        await connection.getMinimumBalanceForRentExemption(StakeProgram.space);

      const createStakeAccountIxs = StakeProgram.createAccount({
        fromPubkey: publicKey,
        stakePubkey: stakeAccount.publicKey,
        authorized: {
          staker: publicKey,
          withdrawer: publicKey,
        },
        lamports: minimumStakeBalance + stakeAmount * LAMPORTS_PER_SOL,
      }).instructions;

      // Add validator delegation
      const delegateIxs = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: publicKey,
        votePubkey: new PublicKey(
          "sT34kbaqmHWbPwjhyeG1GnjoX82KpXawFsnzUkzJpYX"
        ),
      }).instructions;

      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        instructions: [...createStakeAccountIxs, ...delegateIxs],
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);

      const signedTx = await wallet.adapter.sendTransaction(
        transaction,
        connection
      );

      console.log("signedTx", signedTx);

      //   await connection.confirmTransaction(signature);
      //   console.log("Staking transaction confirmed:", signature);
    } catch (error) {
      console.error("Staking failed:", error);
    }
  };

  return (
    <>
      {openedForm ? (
        <div
          className={twMerge(
            "bg-[#090C08] h-[64px] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out",
            openedForm ? "" : "hover:bg-[#18AB7C]"
          )}
        >
          {openedForm ? (
            <div className="flex gap-2">
              <div>Enter Stake:</div>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
              />
              <button
                className="bg-[#18AB7C] cursor-pointer hover:bg-[#8ad2bb] text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
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
            "bg-[#090C08] h-[64px] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out",
            openedForm ? "" : "hover:bg-[#18AB7C]"
          )}
        >
          Stake for Higher APY
        </Button>
      )}
    </>
  );
};
