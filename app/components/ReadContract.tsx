"use client";

import { type BaseError, useReadContracts } from "wagmi";
import { primitivesABI } from "../primitives-abi";

const CONTRACT = "0xF526C4fB3A22f208058163A34278989D1f953619" as const;

export default function ReadContract() {
  const { data, isPending, error } = useReadContracts({
    contracts: [
      {
        address: CONTRACT,
        abi: primitivesABI,
        functionName: "name",
      },
      {
        address: CONTRACT,
        abi: primitivesABI,
        functionName: "wallet",
      },
    ],
  });

  const name = data?.[0]?.result ?? "-";
  const wallet = data?.[1]?.result ?? "—";

  if (isPending)
    return (
      <div className="flex items-center justify-center bg-white w-55 h-10 m-2 rounded-xl">
        <h2 className="text-xl text-[#414451] font-medium">Loading...</h2>
      </div>
    );

  if (error) {
    return (
      error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )
    );
  }

  return (
    <>
      <div className="bg-white w-55 h-20 m-2 rounded-xl">
        <h2 className="text-xl text-center text-[#414451] font-medium">
          Data from Primitives
        </h2>

        <div className="text-1xl text-center"> Name: {name} </div>
        <div className="text-1xl text-center">
          {" "}
          Wallet:{" "}
          {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "—"}{" "}
        </div>
      </div>
    </>
  );
}
