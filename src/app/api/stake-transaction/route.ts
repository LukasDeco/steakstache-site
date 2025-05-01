// pages/api/stake-transaction.ts

import {
  ActionPostRequest,
  ACTIONS_CORS_HEADERS,
  CreateActionPostResponseArgs,
  createPostResponse,
} from "@solana/actions";
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
import { NextRequest } from "next/server";

// Your validator vote account
const VALIDATOR_VOTE_ACCOUNT = new PublicKey(
  process.env.NEXT_VOTE_ACCOUNT ?? ""
);

const headers = {
  "Content-Type": "application/json",
  ...ACTIONS_CORS_HEADERS,
};

export async function POST(req: NextRequest) {
  try {
    const amountParam = req.nextUrl.searchParams.get("amount");
    // Payer public key is passed in the request body
    const request: ActionPostRequest = await req.json();
    const pubkeyParam = new PublicKey(request.account);

    if (!pubkeyParam) {
      return new Response("Missing required parameter: publicKey", {
        status: 400,
        headers,
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

    console.log("payload", payload);

    const response = await createPostResponse(payload);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error creating stake transaction:", error);
    return new Response("Failed to create staking transaction", {
      status: 500,
      headers,
    });
  }
}
