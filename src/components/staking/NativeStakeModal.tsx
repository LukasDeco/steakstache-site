import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { VALIDATOR_VOTE_ACCOUNT } from "@/constants";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  StakeProgram,
  VersionedTransaction,
  TransactionMessage,
  LAMPORTS_PER_SOL,
  Lockup,
  Authorized,
  PublicKey,
} from "@solana/web3.js";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--color-charcoal)",
    border: "none",
    borderRadius: "12px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export const NativeStakeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [stakeAmount, setStakeAmount] = useState(0);
  const { data: balance } = useTokenBalance({
    tokenMint: new PublicKey("So11111111111111111111111111111111111111112"),
  });

  const handleChangeStakeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      if (Number(value) > Number(balance)) {
        setStakeAmount(Number(balance));
      } else {
        setStakeAmount(Number(value));
      }
    }
  };

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Native Staking"
      style={customStyles}
    >
      <div className="flex flex-col gap-4 text-[var(--color-text-primary)] px-4 py-6">
        <h3 className="text-2xl font-bold mb-4">Native Stake</h3>
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/sol.svg"
            alt="Solana Logo"
            width={24}
            height={24}
          />
          <span>{balance} SOL</span>
        </div>
        <Input
          type="number"
          className="bg-transparent border-none outline-none p-4 h-12"
          value={stakeAmount}
          onChange={handleChangeStakeAmount}
        />
        <Button
          className="bg-[var(--color-primary-neon)] cursor-pointer text-neutral-100 p-4 h-12 rounded-md transition-colors duration-300 ease-in-out"
          onClick={handleStake}
        >
          Stake
        </Button>
      </div>
    </Modal>
  );
};
