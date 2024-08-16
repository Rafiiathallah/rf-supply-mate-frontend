"use client";

// main page

import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to Supply Mate
          </h1>
          <h2 className="text-xl text-center mb-8 text-gray-400">
            Your go-to solution for managing supply chains with blockchain
            technology.
          </h2>
          <div className="flex gap-4">
            <Link href="/viewNFTPage">
              <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View NFT
              </button>
            </Link>
            <Link href="/transferNFTPage">
              <button className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View Owned NFT
              </button>
            </Link>
            <Link href="/mintNFTPage">
              <button className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Mint NFT
              </button>
            </Link>
            <Link href="/burnNFTPage">
              <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Burn NFT
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
