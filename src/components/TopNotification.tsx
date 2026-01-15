import { useState } from 'react';

export default function TopNotification() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-[#e0e7ff] flex gap-2 items-center justify-center px-4 py-3 relative w-full">
            <div className="relative shrink-0 w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16V12" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8H12.01" stroke="#4338CA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="flex-1 text-sm text-[#334155] leading-5">
                <span>Los campos Bodega, Moneda y otros están en </span>
                <span className="font-bold">Más ajustes (⋮)</span>.
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="shrink-0 p-1 hover:bg-[#c7d2fe] rounded-full transition-colors"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5L5 15" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 5L15 15" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}
