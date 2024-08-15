"use client"; // Ensure this component is client-side

import React from "react";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function MintReceipt() {
  const router = useRouter();
  const { title, description, quantity, location, nextOwner, tokenId } =
    router.query;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="card shadow-md rounded-lg overflow-hidden max-w-sm">
          <div className="p-4">
            <h6 className="text-xl font-bold text-white-800">
              NFT Minted Successfully!
            </h6>
            <h6 className="text-md font-semibold text-gray-600 mt-2">
              Here are your NFT details:
            </h6>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Quantity:</strong> {quantity}
              </p>
              <p>
                <strong>Location:</strong> {location}
              </p>
              <p>
                <strong>Next Owner:</strong> {nextOwner}
              </p>
              <p>
                <strong>Token ID:</strong> {tokenId}
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
