// pages/api/stake-transaction.ts
import { NextApiRequest, NextApiResponse } from "next";
import {
  Connection,
  PublicKey,
  StakeProgram,
  Keypair,
  Authorized,
  Lockup,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  CreateActionPostResponseArgs,
  createPostResponse,
} from "@solana/actions";

// Your validator vote account
const VALIDATOR_VOTE_ACCOUNT = new PublicKey("YOUR_VALIDATOR_VOTE_ACCOUNT");

type TransactionResponse = {
  transaction: string; // base64 encoded transaction
  message?: string;
  error?: {
    message: string;
  };
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<TransactionResponse>
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      transaction: "",
      error: { message: "Method not allowed" },
    });
  }

  try {
    const amountParam = req.query.amount;
    const pubkeyParam = req.query.publicKey as string;

    if (!pubkeyParam) {
      return res.status(400).json({
        transaction: "",
        error: { message: "Missing required parameter: publicKey" },
      });
    }

    // Convert parameters
    const publicKey = new PublicKey(pubkeyParam);
    const validator = VALIDATOR_VOTE_ACCOUNT;
    const stakeAmount =
      typeof amountParam === "string" ? parseFloat(amountParam) : 1;

    // Connect to Solana network
    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
      "confirmed"
    );

    // Generate a new stake account
    const stakeAccount = await Keypair.generate();
    const minimumStakeBalance =
      await connection.getMinimumBalanceForRentExemption(StakeProgram.space);

    // Create stake account instructions
    const createStakeAccountIxs = StakeProgram.createAccount({
      authorized: new Authorized(publicKey, publicKey),
      fromPubkey: publicKey,
      lamports: minimumStakeBalance + stakeAmount * LAMPORTS_PER_SOL,
      lockup: new Lockup(0, 0, publicKey),
      stakePubkey: stakeAccount.publicKey,
    }).instructions;

    // Add validator delegation instructions
    const delegateIxs = StakeProgram.delegate({
      stakePubkey: stakeAccount.publicKey,
      authorizedPubkey: publicKey,
      votePubkey: validator,
    }).instructions;

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();

    // Create transaction message
    const messageV0 = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions: [...createStakeAccountIxs, ...delegateIxs],
    }).compileToV0Message();

    // Create versioned transaction
    const transaction = new VersionedTransaction(messageV0);

    // Since we can't sign the transaction server-side (private key is with the user),
    // we serialize it and send it to the client for signing

    const message = `Transaction created for staking ${stakeAmount} SOL to validator ${validator.toString()}. The stake account public key is ${stakeAccount.publicKey.toString()}.`;

    const payload: CreateActionPostResponseArgs = {
      fields: {
        type: "transaction",
        transaction,
        message,
      },
    };

    return createPostResponse(payload);
  } catch (error) {
    console.error("Error creating stake transaction:", error);
    return res.status(500).json({
      transaction: "",
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create staking transaction",
      },
    });
  }
}
