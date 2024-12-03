'use client'

import { useState } from 'react'
import { main } from '../../../src/example'

type GameResult = {
    success: boolean
    hash: string
    playerChoice: number
    result: number
    won: boolean
    amount: string
}

export default function CoinFlip() {
    const [betAmount, setBetAmount] = useState('1')
    const [isFlipping, setIsFlipping] = useState(false)
    const [result, setResult] = useState<GameResult | null>(null)

    const handleFlip = async () => {
        try {
            setIsFlipping(true)
            const gameResult = await main('playGame', betAmount)
            if (gameResult && 'success' in gameResult) {
                setResult(gameResult as GameResult)
            }
        } catch (error) {
            console.error('Game error:', error)
        } finally {
            setIsFlipping(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">USDe Coin Flip</h1>
                
                <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
                    <div className="mb-6 text-center">
                        <div className="text-2xl font-bold">
                            {result ? (
                                <div className={`${result.won ? 'text-green-500' : 'text-red-500'}`}>
                                    {result.won ? `Won ${result.amount} USDe!` : `Lost ${betAmount} USDe`}
                                </div>
                            ) : (
                                'Place your bet'
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Bet Amount (USDe)
                        </label>
                        <input
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            min="0.1"
                            step="0.1"
                            disabled={isFlipping}
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleFlip}
                            disabled={isFlipping}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200 disabled:opacity-50"
                        >
                            {isFlipping ? 'Flipping...' : 'Flip Coin'}
                        </button>
                    </div>

                    {result && (
                        <div className="mt-6 space-y-2">
                            <div className="text-center">
                                <span className="text-gray-400">You got: </span>
                                <span className="font-bold">{result.playerChoice ? 'Tails' : 'Heads'}</span>
                            </div>
                            <div className="text-center">
                                <span className="text-gray-400">Result was: </span>
                                <span className="font-bold">{result.result ? 'Tails' : 'Heads'}</span>
                            </div>
                            <div className="text-sm text-center text-gray-400">
                                <a
                                    href={`https://explorer-ethena-testnet-0.t.conduit.xyz/tx/${result.hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    View transaction
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 

