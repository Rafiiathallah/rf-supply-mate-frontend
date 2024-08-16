// TransferNFTPage.tsx

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

export default function TransferNFTPage() {
  const [nftList, setNftList] = useState<NFTDetails[]>([]);
  const { address, isConnected } = useAccount();
  const contractAddress = SupplyMateContractAddress as Address;

  // Fetch NFTs owned by the current account
  const { data: nftsData, error: nftsError } = useContractRead({
    address: contractAddress,
    abi: supplyMate.abi,
    functionName: "viewNFTsByOwner",
    args: [address],
  });

  useEffect(() => {
    if (nftsData) {
      const detailsArray = nftsData as unknown as NFTDetails[];
      setNftList(detailsArray);
      if (detailsArray.length === 0) {
        toast.warn("You do not own any NFTs.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("NFTs fetched successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (nftsError) {
      toast.error(`Error fetching NFTs: ${nftsError.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [nftsData, nftsError]);

  const handleTransfer = (tokenId: number) => {
    // Implement transfer logic here
    toast.info(`Transfer NFT ID: ${tokenId} button clicked`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">Your NFTs</h1>

        {nftList.length > 0 ? (
          <div className="flex flex-col space-y-20 overflow-y-auto max-h-screen w-full">
            {nftList.map((nft, index) => (
              <div
                key={index}
                className="card shadow-md rounded-lg overflow-visible w-2/3"
                style={{ minHeight: "200px", paddingBottom: "1rem" }}
              >
                <div className="p-4">
                  <h6 className="text-xl font-bold">{nft.title}</h6>
                  <p>Description: {nft.description}</p>
                  <p>Quantity: {nft.quantity}</p>
                  <p>Location: {nft.location}</p>
                  <p>Current Owner: {nft.currentOwner}</p>
                  <p>Next Owner: {nft.nextOwner}</p>
                  <button
                    onClick={() => handleTransfer(index + 1)}
                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500">You do not own any NFTs.</p>
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
