// pages/api/validator-stake-blink.ts

// import { VALIDATOR_VOTE_ACCOUNT } from "@/constants";
import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
  BLOCKCHAIN_IDS,
} from "@solana/actions";
import { NextRequest } from "next/server";

const blockchain = BLOCKCHAIN_IDS.mainnet;

const headers = {
  "Content-Type": "application/json",
  ...ACTIONS_CORS_HEADERS,
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.4",
};

export async function GET(req: NextRequest) {
  if (!req.url) {
    return new Response("No URL provided", { status: 400, headers });
  }

  try {
    // Base URL for your site
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://steakstache.com";

    // Create transaction URL - this would be the URL that actually executes the stake transaction
    const transactionUrl = `${baseUrl}/api/stake-transaction`;

    // Create the blink data according to the specified format
    const blinkData: ActionGetResponse = {
      type: "action",
      icon: `${baseUrl}/assets/images/steak-pilot.png`,
      title: "Grow your stache with SteakStache",
      description:
        "Stake your SOL with a low-commission, high-performance validator that sports a killer stache.",
      label: "Stake Now",
      disabled: false,
      links: {
        actions: [
          {
            // Defines this as a blockchain transaction
            type: "transaction",
            label: "1 SOL",
            // This is the endpoint for the POST request
            href: `${transactionUrl}?amount=1`,
          },
          {
            type: "transaction",
            label: "5 SOL",
            href: `${transactionUrl}?amount=5`,
          },
          {
            type: "transaction",
            label: "10 SOL",
            href: `${transactionUrl}?amount=10`,
          },
          {
            type: "transaction",
            href: `${transactionUrl}?amount={amount}`,
            label: `Stake Now`,
            parameters: [
              {
                name: "amount",
                label: "Enter a custom SOL amount",
                type: "number",
              },
            ],
          },
        ],
      },
    };

    // Return the blink data
    return new Response(JSON.stringify(blinkData), { status: 200, headers });
  } catch (error) {
    console.error("Error generating staking blink:", error);

    // Return error in the format expected by the blink system
    return new Response(
      JSON.stringify({
        type: "action",
        icon: "https://yourdomain.com/validator-icon.png",
        title: "Stake to My Validator",
        description: "Support my Solana validator and earn rewards",
        label: "Stake Now",
        disabled: true,
        links: {
          actions: [],
        },
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Failed to generate staking blink",
        },
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}
