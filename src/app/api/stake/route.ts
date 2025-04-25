// pages/api/validator-stake-blink.ts

// import { VALIDATOR_VOTE_ACCOUNT } from "@/constants";
import { ActionGetResponse } from "@solana/actions";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!req.url) {
    return new Response("No URL provided", { status: 400 });
  }

  try {
    // Your validator public key
    // const validatorVoteKey = VALIDATOR_VOTE_ACCOUNT;

    // Get staking amount from query params (in SOL)
    const url = new URL(req.url);
    const amountParam = url.searchParams.get("amount");
    const stakeAmount =
      typeof amountParam === "string" ? parseFloat(amountParam) : 1;

    // Base URL for your site
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://steakstache.com";

    // Create transaction URL - this would be the URL that actually executes the stake transaction
    const transactionUrl = `${baseUrl}/api/stake-transaction?amount=${stakeAmount}`;

    // Create the blink data according to the specified format
    const blinkData: ActionGetResponse = {
      type: "action",
      icon: `${baseUrl}/assets/images/logo.png`,
      title: "Stake to My Validator",
      description: "Support my Solana validator and earn rewards",
      // extendedDescription:
      //   "By staking your SOL with my validator, you'll earn rewards while helping secure the Solana network.",
      label: "Stake Now",
      disabled: false,
      links: {
        actions: [
          {
            type: "transaction",
            href: transactionUrl,
            label: `Stake ${stakeAmount} SOL`,
            parameters: [],
          },
        ],
      },
      // context: {
      //   url: `${baseUrl}/validator`,
      //   websiteUrl: baseUrl,
      //   category: "Staking",
      //   provider: {
      //     name: "Your Validator Name",
      //     icon: `${baseUrl}/validator-icon.png`,
      //   },
      // },
      // preview: {
      //   image: `${baseUrl}/validator-preview.jpg`,
      //   title: "Stake with My Validator",
      //   description: `Stake ${stakeAmount} SOL and earn rewards`,
      //   cta: "Stake Now",
      //   context: {
      //   url: `${baseUrl}/validator`,
      //   websiteUrl: baseUrl,
      //   category: "Staking",
      //   provider: {
      //     name: "Your Validator Name",
      //     icon: `${baseUrl}/validator-icon.png`,
      //   },
      //   },
      // },
    };

    // Return the blink data
    return new Response(JSON.stringify(blinkData), { status: 200 });
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
      { status: 500 }
    );
  }
}
