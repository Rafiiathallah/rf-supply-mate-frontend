import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function viewNFT() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">View NFT</h1>
        <p className="text-lg text-center mb-8">Enter the NFT ID</p>
      </main>
      <Footer />
    </div>
  );
}
