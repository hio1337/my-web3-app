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
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <main className="grow">
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
      </main>

      <footer className="relative bg-linear-to-r from-blue-600 to-indigo-600 text-gray-300 py-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-6">
            <div>
              <p className="text-lg font-semibold text-white/90">My Web3 App</p>
              <p className="mt-1 text-sm">
                Created via Next.js, React, Wagmi, ConnectKit
              </p>
            </div>

            <div className="flex absolute left-1/2 -translate-x-1/2 gap-2 text-sm">
              <a
                href="https://github.com/hio1337/my-web3-app"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://t.me/twintractionbeam"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </div>

            <div className="text-sm opacity-75">
              © {new Date().getFullYear()} Built with ❤️
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
