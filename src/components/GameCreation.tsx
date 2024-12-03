// import { useEffect, useState } from "react";
// import {
//   useAccount,
//   useWriteContract,
//   useWaitForTransactionReceipt,
// } from "wagmi";
// import { parseEther } from "viem";
// import { contractAddress, contractAbi } from "../constants/contractInfo";
// import { toast } from "react-hot-toast";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// export default function GameCreation({ setGameState, setGameData }) {
//   const [gameType, setGameType] = useState(0);
//   const [stake, setStake] = useState("0.01");

//   const { address, isConnected } = useAccount();
//   const { data: hash, isPending, writeContract } = useWriteContract();
//   const {
//     isLoading: isConfirming,
//     error,
//     isSuccess: isConfirmed,
//   } = useWaitForTransactionReceipt({ hash });

//   const handleCreateGame = async () => {
//     if (!isConnected) return;
//     try {
//       writeContract({
//         address: contractAddress,
//         abi: contractAbi,
//         functionName: "createGame",
//         args: [gameType],
//         value: parseEther(stake),
//       });
//       setGameData({ gameType, stake });
//       setGameState("play");
//     } catch (error) {
//       toast.error("Failed to create game" + error);
//     }
//   };

//   useEffect(() => {
//     if (isConfirmed) {
//       toast.success("Successfully created a game");
//     }
//     if (error) {
//       toast.error("Failed to create game" + error);
//     }
//   }, [isConfirmed, error]);

//   return (
//     <div className="mt-8">
//       <ConnectButton />
//       <h2 className="text-xl font-semibold mb-4">Create a New Game</h2>
//       <div className="mb-4">
//         <label className="block mb-2">Game Type:</label>
//         <select
//           className="w-full p-2 border rounded"
//           value={gameType}
//           onChange={(e) => setGameType(Number(e.target.value))}
//         >
//           <option value={0}>One Round</option>
//           <option value={1}>Best of Three</option>
//           <option value={2}>Best of Five</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Stake (ETH):</label>
//         <input
//           type="number"
//           className="w-full p-2 border rounded"
//           value={stake}
//           onChange={(e) => setStake(e.target.value)}
//           step="0.01"
//           min="0.01"
//         />
//       </div>
//       <button
//         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         onClick={handleCreateGame}
//       ></button>
//     </div>
//   );
// }
