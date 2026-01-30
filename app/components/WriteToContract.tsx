"use client"; 

import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { primitivesABI } from "../primitives-abi";

const CONTRACT = "0xF526C4fB3A22f208058163A34278989D1f953619" as const;

export default function WriteToContract() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("name") as string | null;
    const walletValue = formData.get("wallet") as string | null;

    if (nameValue?.trim()) {
      writeContract({
        address: CONTRACT,
        abi: primitivesABI,
        functionName: "setName",
        args: [nameValue.trim()],
      });
    }

    if (walletValue?.trim()) {
      const trimmed = walletValue.trim();
      if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
        writeContract({
          address: CONTRACT,
          abi: primitivesABI,
          functionName: "setWallet",
          args: [trimmed as `0x${string}`],
        });
      } else {
        alert("Некорректный адрес кошелька");
        return;
      }
    }

    (e.target as HTMLFormElement).reset();
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <input
            name="name"
            placeholder="Set Name"
            required
            className="w-full px-5 py-4 text-gray-800 rounded-xl bg-white/90 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-500 text-lg"
          />
        </div>

        <div>
          <input
            name="wallet"
            placeholder="Set Wallet"
            required
            className="w-full px-5 py-4 text-gray-800 rounded-xl bg-white/90 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-500 text-lg"
          />
        </div>

        <div>
          <button
            disabled={isPending || isConfirming}
            type="submit"
            className="w-full py-5 px-8 bg-linear-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xl rounded-xl shadow-2xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isPending
              ? "Sign In Wallet..."
              : isConfirming
              ? "Waiting For Confirmation..."
              : isConfirmed
              ? "Changes Are Saved"
              : "Confirm Changes"}
          </button>
        </div>
      </form>

      {hash && (
        <div className="mt-4 text-sm text-center break-all">
          Tx hash:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {hash.slice(0, 10)}...{hash.slice(-6)}
          </a>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-xl text-center w-70 h-30">
          {(error as BaseError).shortMessage ||
            error.message ||
            "Error"}
        </div>
      )}
    </div>
  );
}
