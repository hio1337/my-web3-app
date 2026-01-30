"use client";

import * as React from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

export function SendTransaction() {
  const { sendTransaction, data: hash, isPending } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;

    if (!to || !value) return;

    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={submit} className="space-y-6">
        <div>
          <input
            name="address"
            placeholder="0x0000…0000"
            required
            className="w-full px-5 py-4 text-gray-800 rounded-xl bg-white/90 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-500 text-lg"
          />
        </div>

        <div>
          <input
            name="value"
            placeholder="0.05 ETH"
            required
            step="any"
            type="number"
            className="w-full px-5 py-4 text-gray-800 rounded-xl bg-white/90 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-500 text-lg"
          />
        </div>

        <div>
          <button
            disabled={isPending || isConfirming}
            type="submit"
            className="w-full py-5 px-8 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xl rounded-xl shadow-2xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isPending || isConfirming ? "Confirming..." : "Send Transaction"}
          </button>
        </div>

        {hash && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-white/80 text-sm mb-1">Transaction sent!</p>
            <p className="text-blue-300 font-mono text-xs break-all">{hash}</p>
            {isSuccess && <p className="text-green-400 mt-2">Confirmed</p>}
          </div>
        )}
      </form>
    </div>
  );
}
