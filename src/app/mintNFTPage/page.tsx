"use client"; // Ensure this component is client-side

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address } from "viem";
import supplyMate from "@/abi/SupplyMate.json"; // Assuming ABI is available
import { SupplyMateContractAddress } from "@/utils/smartContractAddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MintNFTPage() {
  const [title, setTitle] = useState(""); // NFT title
  const [description, setDescription] = useState(""); // NFT description
  const [quantity, setQuantity] = useState("1"); // Default quantity to mint
  const [location, setLocation] = useState(""); // Geographical location
  const [nextOwner, setNextOwner] = useState(""); // Next owner address
  const contractAddress = SupplyMateContractAddress as Address;
  const { isConnected } = useAccount(); // Check if the user is connected

  const { data, writeContract } = useWriteContract();
  const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt(
    {
      hash: data,
    }
  );

  const handleMintTransaction = () => {
    // Validation: Check if any input field is empty
    if (!title || !description || !quantity || !location || !nextOwner) {
      toast.error("Please fill in all fields before minting.", {
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

    if (!isConnected) {
      toast.error("Please connect your wallet before minting.", {
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
      functionName: "mintNFT",
      args: [title, description, quantity, location, nextOwner],
    });
  };

  useEffect(() => {
    if (txSuccess) {
      toast.success("Transaction successful! Your NFT has been minted.", {
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
        <div className="border border-gray-700 bg-black text-white shadow-lg rounded-lg overflow-hidden max-w-sm">
          <div className="p-4">
            <h6 className="text-xl font-bold text-white-800">Mint NFT</h6>
            <h6 className="text-md font-semibold text-gray-400 mt-2">
              Enter the details
            </h6>

            <div className="flex flex-col space-y-4 mt-4">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Title"
              />
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Description"
              />
              <input
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Item Quantity"
              />
              <input
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Location of Items"
              />
              <input
                onChange={(e) => setNextOwner(e.target.value)}
                type="text"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Next Owner Address"
              />
              <button
                onClick={handleMintTransaction}
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </div>
  );
}
