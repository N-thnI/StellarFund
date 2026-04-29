import { useState } from 'react';
import { connectWallet } from '../lib/stellar';

export function WalletModal({ onConnect }: { onConnect: (address: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState<string>('');
    const [isConnecting, setIsConnecting] = useState(false);

    const connect = async () => {
        setIsConnecting(true);
        const { address: albedoAddress, error } = await connectWallet();
        setIsConnecting(false);
        if (error) {
            alert(error);
        } else if (albedoAddress) {
            setAddress(albedoAddress);
            onConnect(albedoAddress);
            setIsOpen(false);
        }
    };

    if (address) {
        return (
            <div className="flex items-center px-5 py-2.5 bg-obsidian rounded-lg border border-silver/20 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-gold mr-3 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                <span className="text-sm text-white font-mono tracking-wider">
                    {address.slice(0, 4)}...{address.slice(-4)}
                </span>
            </div>
        );
    }

    return (
        <button 
            onClick={connect}
            disabled={isConnecting}
            className={`bg-transparent border border-gold text-gold font-bold py-2 px-6 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all ${isConnecting ? 'opacity-70 animate-shimmer-pulse cursor-not-allowed' : ''}`}
        >
            {isConnecting ? 'CONNECTING...' : 'CONNECT ALBEDO'}
        </button>
    );
}
