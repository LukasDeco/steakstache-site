// pages/api/validator-stake-blink.ts
import { NextApiRequest, NextApiResponse } from "next";
// import { VALIDATOR_VOTE_ACCOUNT } from "@/constants";

type BlinkActionResponse = {
  type: string;
  icon: string;
  title: string;
  description: string;
  extendedDescription?: string;
  label: string;
  disabled?: boolean;
  links: {
    actions: Array<{
      type: string;
      href: string;
      label: string;
      parameters: Array<any>;
    }>;
    dataTable?: string;
  };
  error?: {
    message: string;
  };
  context?: {
    url: string;
    websiteUrl: string;
    category: string;
    provider: {
      name: string;
      icon: string;
    };
  };
  preview?: {
    image: string;
    title: string;
    description: string;
    cta: string;
    context: {
      url: string;
      websiteUrl: string;
      category: string;
      provider: {
        name: string;
        icon: string;
      };
    };
  };
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Your validator public key
    // const validatorVoteKey = VALIDATOR_VOTE_ACCOUNT;

    // Get staking amount from query params (in SOL)
    const amountParam = req.query.amount;
    const stakeAmount =
      typeof amountParam === "string" ? parseFloat(amountParam) : 1;

    // Base URL for your site
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://steakstache.com";

    // Create transaction URL - this would be the URL that actually executes the stake transaction
    const transactionUrl = `${baseUrl}/api/stake-transaction?amount=${stakeAmount}`;

    // Create the blink data according to the specified format
    const blinkData: BlinkActionResponse = {
      type: "action",
      icon: `${baseUrl}/assets/images/logo.png`,
      title: "Stake to My Validator",
      description: "Support my Solana validator and earn rewards",
      extendedDescription:
        "By staking your SOL with my validator, you'll earn rewards while helping secure the Solana network.",
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
      context: {
        url: `${baseUrl}/validator`,
        websiteUrl: baseUrl,
        category: "Staking",
        provider: {
          name: "Your Validator Name",
          icon: `${baseUrl}/validator-icon.png`,
        },
      },
      preview: {
        image: `${baseUrl}/validator-preview.jpg`,
        title: "Stake with My Validator",
        description: `Stake ${stakeAmount} SOL and earn rewards`,
        cta: "Stake Now",
        context: {
          url: `${baseUrl}/validator`,
          websiteUrl: baseUrl,
          category: "Staking",
          provider: {
            name: "Your Validator Name",
            icon: `${baseUrl}/validator-icon.png`,
          },
        },
      },
    };

    // Return the blink data
    return res.status(200).json(blinkData);
  } catch (error) {
    console.error("Error generating staking blink:", error);

    // Return error in the format expected by the blink system
    return res.status(500).json({
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
    });
  }
}
