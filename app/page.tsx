"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import "./styles.css";
import { SendTransaction } from "./SendTransaction";
import ReadContract from "./components/ReadContract";
import WriteToContract from "./components/WriteToContract";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const formattedBalance = balance
    ? Number(formatEther(balance.value)).toFixed(4)
    : "—";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div>
        <div>
          <ReadContract />
        </div>
        <div className="m-2">
          <ConnectKitButton />
        </div>
        {isConnected && (
          <div className="flex items-center justify-center bg-white w-24 h-10 mt-2 ml-2 rounded-xl">
            <p className="text-[#414451] font-medium text-1xl">
              {formattedBalance} ETH
            </p>
          </div>
        )}
      </div>
      <div className="flex absolute top-1/2 left-1/2 -translate-1/2 items-center space-x-5">
        <div className="flex items-center">
          <SendTransaction />
        </div>
        <div>
          <WriteToContract />
        </div>
      </div>
    </div>
  );
}
