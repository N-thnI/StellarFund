export function Progress({ amountRaised, target }: { amountRaised: number, target: number }) {
    const percentage = target > 0 ? Math.min(100, (amountRaised / target) * 100) : 0;

    return (
        <div className="w-full max-w-md mx-auto my-8">
            <div className="flex justify-between mb-3 text-sm font-medium tracking-wider text-silver-muted">
                <span>RAISED: <span className="text-gold">{amountRaised} XLM</span></span>
                <span>TARGET: <span className="text-white">{target} XLM</span></span>
            </div>
            <div className="w-full bg-obsidian-soft rounded-full h-3 border border-silver/10 shadow-inner overflow-hidden relative">
                {/* The loading state spinner requested: border-t-gold border-silver animate-spin */}
                {amountRaised === 0 && (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="w-4 h-4 rounded-full border-2 border-silver border-t-gold animate-spin"></div>
                     </div>
                )}
                <div 
                    className="bg-gradient-to-r from-silver to-gold h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
