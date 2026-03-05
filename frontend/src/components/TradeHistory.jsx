import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function TradeHistory({ trades }) {
    if (!trades || trades.length === 0) {
        return (
            <div className="text-center p-8 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                No trades executed yet.
            </div>
        );
    }

    // Sort by recent first
    const sortedTrades = [...trades].sort((a, b) => new Date(b.ts) - new Date(a.ts));

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold dark:text-white">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Time</th>
                            <th scope="col" className="px-6 py-3">Asset</th>
                            <th scope="col" className="px-6 py-3">Side</th>
                            <th scope="col" className="px-6 py-3 text-right">Price</th>
                            <th scope="col" className="px-6 py-3 text-right">Qty</th>
                            <th scope="col" className="px-6 py-3 text-right">Fee</th>
                            <th scope="col" className="px-6 py-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTrades.map((t, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 dark:border-slate-800">
                                <td className="px-6 py-4 font-medium whitespace-nowrap">
                                    {new Date(t.ts).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 font-bold dark:text-white">
                                    {t.symbol}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    <span className={`flex items-center gap-1 ${t.side === 'BUY' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {t.side === 'BUY' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                        {t.side}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">₹{t.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">{t.qty}</td>
                                <td className="px-6 py-4 text-right text-rose-500">-₹{t.fee.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-bold dark:text-white">
                                    ₹{(t.qty * t.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
