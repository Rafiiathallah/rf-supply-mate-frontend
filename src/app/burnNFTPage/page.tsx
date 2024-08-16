"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address } from "viem";
import supplyMate from "@/abi/SupplyMate.json";
import { SupplyMateContractAddress } from "@/utils/smartContractAddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BurnNFTPage() {
  const [nftId, setNftId] = useState<string>("");
  const contractAddress = SupplyMateContractAddress as Address;
  const { isConnected } = useAccount();

  const { data, writeContract } = useWriteContract();
  const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt(
    {
      hash: data,
    }
  );

  const handleBurnTransaction = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet before burning an NFT.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    writeContract({
      address: contractAddress ?? undefined,
      abi: supplyMate.abi,
      functionName: "burnNFT",
      args: [nftId],
    });
  };

  useEffect(() => {
    if (txSuccess) {
      toast.success("Transaction successful! Your NFT has been burned.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (txError) {
      toast.error(`Transaction failed: ${txError.cause}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [txSuccess, txError]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="card shadow-md rounded-lg overflow-hidden max-w-sm">
          <div className="p-4">
            <h6 className="text-xl font-bold text-white-800">Burn NFT</h6>
            <h6 className="text-md font-semibold text-gray-600 mt-2">
              Enter the NFT ID to burn
            </h6>

            <div className="flex flex-col space-y-4 mt-4">
              <input
                onChange={(e) => setNftId(e.target.value)}
                type="text"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="NFT ID"
              />
              <button
                onClick={handleBurnTransaction}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Burn
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
