"use client";

import { useState } from 'react';
import { WalletModal } from '../components/WalletModal';
import { Progress } from '../components/Progress';
import { TxStatus } from '../components/TxStatus';
import { useSoroban } from '../hooks/useSoroban';

export default function Home() {
    const [userAddress, setUserAddress] = useState<string>('');
    const [depositAmount, setDepositAmount] = useState<string>('');
    const { deposit, status, errorMsg, txHash, amountRaised, target } = useSoroban();

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userAddress) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!depositAmount || isNaN(Number(depositAmount))) {
            alert("Please enter a valid amount.");
            return;
        }

        await deposit(Number(depositAmount), userAddress);
        setDepositAmount('');
    };

    return (
        <main className="min-h-screen bg-obsidian text-white font-sans selection:bg-gold/30">
            {/* Header / Navbar */}
            <header className="border-b border-silver/10 bg-obsidian-soft/50 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-gold-bright flex items-center justify-center font-bold text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            S
                        </div>
                        <h1 className="text-2xl font-semibold tracking-widest text-gold">
                            STELLARFUND
                        </h1>
                    </div>
                    <WalletModal onConnect={setUserAddress} />
                </div>
            </header>

            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h2 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-silver">
                    Premium <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-bright">Crowdfunding</span>
                </h2>
                <p className="text-lg md:text-xl text-silver-muted mb-16 max-w-2xl mx-auto leading-relaxed tracking-wide">
                    Support the next generation of Stellar projects. Deposit XLM securely through our seamless smart contract integration.
                </p>

                {/* Progress Card */}
                <div className="bg-obsidian-soft border border-silver/20 rounded-xl p-6 shadow-2xl max-w-2xl mx-auto mb-16 transition-all duration-300">
                    <h3 className="text-2xl font-medium tracking-wider mb-8 text-white">NEXT-GEN DEFI APP</h3>
                    <Progress amountRaised={amountRaised || 500} target={target || 1000} /> {/* Mock defaults for visual */}
                    
                    <form onSubmit={handleDeposit} className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                        <div className="relative w-full sm:w-72">
                            <input 
                                type="number" 
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                placeholder="Enter Amount"
                                className="w-full bg-obsidian-soft border border-silver/20 rounded-lg px-6 py-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 text-white placeholder-silver-muted tracking-wide"
                                required
                                min="1"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-silver font-medium tracking-wider">XLM</span>
                        </div>
                        <button 
                            type="submit"
                            disabled={status === 'pending' || !userAddress}
                            className="bg-gold text-obsidian font-bold py-4 px-10 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none tracking-wider"
                        >
                            {status === 'pending' ? 'PROCESSING...' : 'FUND PROJECT'}
                        </button>
                    </form>
                    {!userAddress && (
                        <p className="mt-6 text-sm text-gold/80 tracking-wide">
                            Connect your wallet to participate in the crowdfund.
                        </p>
                    )}
                </div>
            </div>

            <TxStatus status={status} txHash={txHash} errorMsg={errorMsg} />
        </main>
    );
}
