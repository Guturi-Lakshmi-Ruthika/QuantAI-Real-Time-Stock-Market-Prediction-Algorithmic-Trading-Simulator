import React from "react";
import { DEFAULT_SYMBOLS } from "../state/store";

export default function TickerSelect({ symbol, setSymbol }) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold dark:text-white">Live Market</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Select an asset to analyze</p>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="ticker" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Asset:
                </label>
                <select
                    id="ticker"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                    {DEFAULT_SYMBOLS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
