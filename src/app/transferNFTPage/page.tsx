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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // Fetch NFTs owned by the current account
  const { data: nftsData, error: nftsError } = useContractRead({
    address: contractAddress,
    abi: supplyMate.abi,
    functionName: "viewNFTsByOwner",
    args: [address],
  });

  useEffect(() => {
    if (nftsData) {
      // Correctly map the data to the NFTDetails type
      const detailsArray = (nftsData as any[]).map((nft) => ({
        title: nft.title,
        description: nft.description,
        quantity: parseInt(nft.quantity), // Ensure quantity is correctly converted
        location: nft.location,
        currentOwner: nft.currentOwner,
        nextOwner: nft.nextOwner,
      }));

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

  const handleTransfer = (nft: NFTDetails) => {
    // Navigate to the verifyNFTPage with the selected NFT details encoded in the query parameters
    const query = new URLSearchParams({
      title: nft.title,
      description: nft.description,
      quantity: nft.quantity.toString(),
      location: nft.location,
      currentOwner: nft.currentOwner,
      nextOwner: nft.nextOwner,
    }).toString();

    router.push(`/verifyNFTPage?${query}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">Your NFTs</h1>

        {nftList.length > 0 ? (
          <div className="flex flex-col space-y-6 overflow-y-auto max-h-screen w-full">
            {nftList.map((nft, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg shadow-lg p-4 bg-black"
                style={{ minHeight: "200px" }}
              >
                <div className="p-4">
                  <h6 className="text-xl font-bold mb-2 text-orange-500">
                    {nft.title}
                  </h6>
                  <p className="mb-1">
                    <strong>Description:</strong> {nft.description}
                  </p>
                  <p className="mb-1">
                    <strong>Quantity:</strong> {nft.quantity}
                  </p>
                  <p className="mb-1">
                    <strong>Location:</strong> {nft.location}
                  </p>
                  <p className="mb-1">
                    <strong>Current Owner:</strong> {nft.currentOwner}
                  </p>
                  <p>
                    <strong>Next Owner:</strong> {nft.nextOwner}
                  </p>
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
