import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

export const useTokenBalance = ({ tokenMint }: { tokenMint: PublicKey }) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["tokenBalance", publicKey?.toBase58(), tokenMint.toBase58()],
    queryFn: async () => {
      if (!publicKey) throw new Error("Wallet not connected");
      if (
        tokenMint.equals(
          new PublicKey("So11111111111111111111111111111111111111112")
        )
      ) {
        const balance = await connection.getBalance(publicKey);
        return (balance / LAMPORTS_PER_SOL).toFixed(3);
      }
      const tokenAccount = await connection.getTokenAccountBalance(tokenMint);
      return tokenAccount.value.uiAmountString;
    },
    enabled: !!publicKey && !!tokenMint && !!connection,
  });
};
