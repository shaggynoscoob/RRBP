export default function Donate() {
    return (
        <div className="p-6 space-y-10 text-center min-h-screen">
            <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-pink-600 bg-clip-text text-transparent">
                FUND THE FUN. ALL PROCEEDS NOT SPENT ON HOT DOGS OR BEER WILL GO DIRECTLY TOWARDS REGIME CHANGE IN VENEZUELA
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">

                {/* VENMO */}
                <a
                    href="https://venmo.com/u/RileyOshag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                >
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:rotate-1">
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.14 3H4.86C3.83 3 3 3.83 3 4.86v14.28C3 20.17 3.83 21 4.86 21h14.28c1.03 0 1.86-.83 1.86-1.86V4.86C21 3.83 20.17 3 19.14 3zM8.54 17.33l-1.9-8.03h2.02l1.18 6.47 1.52-6.47h1.94l-1.9 8.03H9.74l-1.2-6.47-1.9 6.47z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">Venmo</h3>
                        <p className="text-blue-100 font-medium">@RileyOshag</p>
                        <p className="text-xs text-blue-200 mt-2 opacity-0 group-hover:opacity-100 transition">
                            Tap to send →
                        </p>
                    </div>
                </a>

                {/* CASHAPP */}
                <a
                    href="https://cash.app/$rileyoshag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                >
                    <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:-rotate-1">
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 7h-1.26A5.97 5.97 0 0 0 12 3a5.97 5.97 0 0 0-4.74 4H6C4.9 7 4 7.9 4 9v6c0 1.1.9 2 2 2h1.26c.54 1.59 2.02 2.73 3.74 3v1h2v-1c1.72-.27 3.2-1.41 3.74-3H18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">Cash App</h3>
                        <p className="text-green-100 font-medium">$rileyoshag</p>
                        <p className="text-xs text-green-200 mt-2 opacity-0 group-hover:opacity-100 transition">
                            Tap to send →
                        </p>
                    </div>
                </a>

            </div>

            <p className="text-sm opacity-70 mt-8">
                All funds go to beer, ice, and questionable decisions.
            </p>
        </div>
    );
}