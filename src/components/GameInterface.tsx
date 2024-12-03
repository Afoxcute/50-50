// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAccount } from 'wagmi';
// import { Hand, Scissors, Layers, CheckCircle } from 'lucide-react';

// const GameInterface = ({ onMakeMove, gameDetails }) => {
//   const { isConnected, address } = useAccount();
//   const router = useRouter();
//   const { gameId } = router.query;

//   // Track the player's selected move
//   const [selectedMove, setSelectedMove] = useState(null);
//   const [gameStatus, setGameStatus] = useState('');

//   useEffect(() => {
//     if (gameDetails) {
//       setGameStatus(gameDetails.isActive ? 'Active' : 'Inactive');
//     }
//   }, [gameDetails]);

//   const handleMoveSelection = (choice) => {
//     setSelectedMove(choice);
//     onMakeMove(gameId, choice);
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
//       <div className='w-full max-w-lg px-4 py-6 bg-gray-800 rounded-lg shadow-md'>
//         {/* Game ID and Status */}
//         <div className='text-center mb-8'>
//           <h2 className='text-2xl font-bold'>Game ID: {gameId}</h2>
//           <p className='text-lg font-medium'>Status: {gameStatus}</p>
//         </div>

//         {/* Game Details */}
//         {gameDetails && (
//           <div className='mb-8'>
//             <p className='text-lg'>Stake: {gameDetails.stake} ETH</p>
//             <p className='text-lg'>Player 1: {gameDetails.players[0]}</p>
//             <p className='text-lg'>
//               Player 2: {gameDetails.players[1] || 'Waiting for opponent...'}
//             </p>
//             {gameDetails.isActive && (
//               <p className='text-lg'>
//                 Your Move: {selectedMove || 'Not made yet'}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Move Selection */}
//         <div className='flex justify-around mb-8'>
//           <button
//             onClick={() => handleMoveSelection('Rock')}
//             className={`flex items-center justify-center p-4 rounded-lg ${
//               selectedMove === 'Rock' ? 'bg-blue-500' : 'bg-gray-700'
//             } text-white hover:bg-blue-500 transition`}
//           >
//             <Hand size={36} className='mr-2' />
//             <span className='text-lg'>Rock</span>
//           </button>
//           <button
//             onClick={() => handleMoveSelection('Paper')}
//             className={`flex items-center justify-center p-4 rounded-lg ${
//               selectedMove === 'Paper' ? 'bg-yellow-500' : 'bg-gray-700'
//             } text-white hover:bg-yellow-500 transition`}
//           >
//             <Layers size={36} className='mr-2' />
//             <span className='text-lg'>Paper</span>
//           </button>
//           <button
//             onClick={() => handleMoveSelection('Scissors')}
//             className={`flex items-center justify-center p-4 rounded-lg ${
//               selectedMove === 'Scissors' ? 'bg-red-500' : 'bg-gray-700'
//             } text-white hover:bg-red-500 transition`}
//           >
//             <Scissors size={36} className='mr-2' />
//             <span className='text-lg'>Scissors</span>
//           </button>
//         </div>

//         {/* Move Status */}
//         {selectedMove && (
//           <div className='text-center mt-4'>
//             <CheckCircle
//               size={36}
//               className='inline-block text-green-500 mb-2'
//             />
//             <p className='text-lg font-semibold'>
//               You selected {selectedMove}! Waiting for the opponent to make
//               their move.
//             </p>
//           </div>
//         )}

//         {/* Disabled if not connected */}
//         {!isConnected && (
//           <div className='text-center mt-4'>
//             <p className='text-red-500'>
//               Please connect your wallet to participate in the game.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GameInterface;


