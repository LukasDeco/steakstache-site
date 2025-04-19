import { BaseWalletMultiButton } from "./WalletButton";

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet",
} as const;

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  endIcon?: React.ReactElement;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: React.ReactElement;
  style?: React.CSSProperties;
  tabIndex?: number;
  children?: React.ReactNode;
  wrapperClassName?: string;
};

export function WalletMultiButton(props: ButtonProps) {
  return <BaseWalletMultiButton {...props} labels={LABELS} />;
}
