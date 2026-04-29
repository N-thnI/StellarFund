import { TxStatus as StatusType } from '../hooks/useSoroban';

interface Props {
    status: StatusType;
    txHash: string;
    errorMsg: string;
}

export function TxStatus({ status, txHash, errorMsg }: Props) {
    if (status === 'idle') return null;

    return (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-obsidian-soft p-6 rounded-xl shadow-2xl border border-silver/20 animate-fade-in backdrop-blur-md">
            {status === 'pending' && (
                <div className="flex items-center text-gold font-medium tracking-wide">
                    {/* Updated to use the requested border-t-gold border-silver animate-spin */}
                    <div className="w-6 h-6 mr-4 rounded-full border-2 border-silver border-t-gold animate-spin"></div>
                    <span>PROCESSING TRANSACTION...</span>
                </div>
            )}
            
            {status === 'success' && (
                <div className="flex flex-col text-gold-bright">
                    <div className="flex items-center font-bold tracking-wider mb-2">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        TRANSACTION SUCCESSFUL
                    </div>
                    {txHash && (
                        <a 
                            href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="text-sm text-silver hover:text-white underline transition-colors break-all"
                        >
                            View on Stellar.Expert
                        </a>
                    )}
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col text-red-500">
                    <div className="flex items-center font-bold tracking-wider mb-2">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        TRANSACTION FAILED
                    </div>
                    <span className="text-sm text-silver-muted tracking-wide leading-relaxed">{errorMsg}</span>
                </div>
            )}
        </div>
    );
}
