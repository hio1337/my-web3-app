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
    <>
      <div className="">
        <div className="">
          <ReadContract />
        </div>
        <div className="mt-2 ml-2">
          <ConnectKitButton />
        </div>
        {isConnected && (
          <div className="bg-white w-24 h-10 mt-2 ml-2 rounded-xl flex items-center justify-center">
            <p className="text-[#414451] font-medium text-1xl">
              {formattedBalance} ETH
            </p>
          </div>
        )}
      </div>
      <div className="flex min-h-screen items-center justify-center space-x-5">
        <div className="min-h-screen flex items-center justify-center">
          <SendTransaction />
        </div>
        <div>
          <WriteToContract />
        </div>
      </div>
    </>
  );
}
