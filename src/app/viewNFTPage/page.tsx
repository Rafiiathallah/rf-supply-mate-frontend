"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAccount, useContractRead } from "wagmi";
import supplyMate from "@/abi/SupplyMate.json"; // Assuming ABI is available
import { SupplyMateContractAddress } from "@/utils/smartContractAddress";
import { Address } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a type for your NFT details
type NFTDetails = {
  title: string;
  description: string;
  quantity: number;
  location: string;
  currentOwner: Address;
  nextOwner: Address;
};

export default function ViewNFTPage() {
  const [nftId, setNftId] = useState<string>("");
  const [nftDetails, setNftDetails] = useState<NFTDetails | null>(null);
  const [fetchData, setFetchData] = useState(false);

  const contractAddress = SupplyMateContractAddress as Address;
  const { isConnected } = useAccount();

  // useContractRead hook
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: supplyMate.abi,
    functionName: "viewNFT",
    args: [nftId],
  });

  useEffect(() => {
    if (fetchData && data) {
      const details = data as unknown as {
        title: string;
        description: string;
        quantity: any; // Temporarily using 'any' type to process BigNumber
        location: string;
        currentOwner: Address;
        nextOwner: Address;
      };

      if (details) {
        setNftDetails({
          title: details.title,
          description: details.description,
          quantity: Number(details.quantity), // Convert BigNumber to number
          location: details.location,
          currentOwner: details.currentOwner,
          nextOwner: details.nextOwner,
        });

        toast.success("NFT details fetched successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setFetchData(false);
    } else if (fetchData && error) {
      if (error.message.includes("NFT does not exist")) {
        toast.error("Invalid ID: NFT does not exist.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Error fetching NFT details: ${error.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setFetchData(false);
    }
  }, [fetchData, data, error]);

  const handleViewNFT = () => {
    if (!isConnected) {
      toast.warn("Please connect your wallet before viewing NFT details.", {
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
    if (!nftId) {
      toast.error("Please enter a valid NFT ID.", {
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
    setFetchData(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="card shadow-md rounded-lg overflow-hidden max-w-sm">
          <div className="p-4">
            <h6 className="text-xl font-bold text-white-800">View NFT</h6>
            <h6 className="text-md font-semibold text-gray-600 mt-2">
              Enter the NFT ID to view details
            </h6>

            <div className="flex flex-col space-y-4 mt-4">
              <input
                onChange={(e) => setNftId(e.target.value)}
                type="text"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="NFT ID"
              />
              <button
                onClick={handleViewNFT}
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View
              </button>
            </div>

            {nftDetails && (
              <div className="mt-4">
                <h6 className="text-lg font-bold text-orange-500">
                  NFT Details:
                </h6>
                <p>Title: {nftDetails.title}</p>
                <p>Description: {nftDetails.description}</p>
                <p>Quantity: {nftDetails.quantity}</p>
                <p>Location: {nftDetails.location}</p>
                <p>Current Owner: {nftDetails.currentOwner}</p>
                <p>Next Owner: {nftDetails.nextOwner}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
