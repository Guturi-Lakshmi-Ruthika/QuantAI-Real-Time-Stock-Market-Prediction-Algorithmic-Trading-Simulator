import React, { useState } from 'react';
import { executeTrade } from '../api/client';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function TradePanel({ symbol, currentPrice, onTradeSuccess }) {
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrade = async (side) => {
        if (!currentPrice || qty <= 0) return;
        setLoading(true);
        setError('');
        try {
            await executeTrade(symbol, side, qty);
            onTradeSuccess && onTradeSuccess();
            setQty(1);
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Trade failed");
        } finally {
            setLoading(false);
        }
    };

    const cost = currentPrice * qty;

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
                <h3 className="text-slate-500 dark:text-slate-400 font-medium">Market Order</h3>
                <p className="text-xs text-slate-400 mt-1">Execute virtual trades instantly</p>
            </div>

            {error && (
                <div className="bg-rose-50 text-rose-500 text-sm p-3 rounded-lg mb-4 border border-rose-100 dark:bg-rose-900/10 dark:border-rose-900/30">
                    {error}
                </div>
            )}

            <div className="flex-1 flex flex-col justify-center">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quantity (Shares)</label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={qty}
                        onChange={(e) => setQty(parseFloat(e.target.value) || 0)}
                        className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 text-center"
                    />
                </div>

                <div className="flex justify-between items-center text-sm mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">Est. Total:</span>
                    <span className="font-bold dark:text-white">₹{isNaN(cost) ? "0.00" : cost.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleTrade("BUY")}
                        disabled={loading || !currentPrice || qty <= 0}
                        className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white p-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                    >
                        <ArrowUpCircle size={18} /> BUY
                    </button>
                    <button
                        onClick={() => handleTrade("SELL")}
                        disabled={loading || !currentPrice || qty <= 0}
                        className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white p-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                    >
                        <ArrowDownCircle size={18} /> SELL
                    </button>
                </div>
            </div>
        </div>
    );
}
