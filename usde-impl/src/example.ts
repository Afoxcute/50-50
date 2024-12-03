import "dotenv/config"
import {
    createKernelAccount,
    createZeroDevPaymasterClient,
    createKernelAccountClient,
    getERC20PaymasterApproveCall,
    ZeroDevPaymasterClient
} from "@zerodev/sdk"
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator"
import {
    ENTRYPOINT_ADDRESS_V07,
    bundlerActions
} from "permissionless"
import {
    http,
    Hex,
    createPublicClient,
    zeroAddress,
    parseEther,
    defineChain
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { EntryPoint } from "permissionless/types"
import { KERNEL_V3_1 } from "@zerodev/sdk/constants"
import * as ethers from "ethers"

if (
    !process.env.BUNDLER_RPC ||
    !process.env.PAYMASTER_RPC ||
    !process.env.PRIVATE_KEY
) {
    throw new Error("BUNDLER_RPC or PAYMASTER_RPC or PRIVATE_KEY is not set")
}
const usdeAddress = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE"
const HOUSE_ADDRESS = "0x..." // Address that will receive/send USDe tokens

const chain = defineChain({
    id: 52085143,
    name: "Ethena",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH"
    },
    rpcUrls: {
        default: {
            http: ["https://rpc-ethena-testnet-0.t.conduit.xyz"]
        }
    },
    blockExplorers: {
        default: {
            name: "Explorer",
            url: "https://explorer-ethena-testnet-0.t.conduit.xyz"
        }
    }
})
const publicClient = createPublicClient({
    transport: http(process.env.BUNDLER_RPC),
    chain
})

const signer = privateKeyToAccount(process.env.PRIVATE_KEY as Hex)
const entryPoint = ENTRYPOINT_ADDRESS_V07

const main = async (action: string, betAmount?: string) => {
    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
        entryPoint,
        signer,
        kernelVersion: KERNEL_V3_1
    })

    const account = await createKernelAccount(publicClient, {
        entryPoint,
        plugins: {
            sudo: ecdsaValidator
        },
        kernelVersion: KERNEL_V3_1,
        useMetaFactory: false
    })

    if (action === "getAddress") {
        return { address: account.address };
    }

    if (action === "playGame") {
        if (!betAmount) throw new Error("Bet amount is required");

        const paymasterClient = createZeroDevPaymasterClient({
            chain,
            entryPoint,
            transport: http(process.env.PAYMASTER_RPC)
        })

        const kernelClient = createKernelAccountClient({
            entryPoint,
            account,
            chain,
            bundlerTransport: http(process.env.BUNDLER_RPC),
            middleware: {
                sponsorUserOperation: async ({ userOperation }) => {
                    return paymasterClient.sponsorUserOperation({
                        userOperation,
                        entryPoint,
                        gasToken: usdeAddress
                    })
                }
            }
        })

        // Simulate coin flip
        const playerChoice = Math.round(Math.random())
        const gameResult = Math.round(Math.random())
        const playerWon = playerChoice === gameResult

        // Encode the transfer data for USDe token (ERC20 transfer function)
        const erc20Interface = new ethers.utils.Interface([
            "function transfer(address to, uint256 amount)"
        ]);

        const transferData = erc20Interface.encodeFunctionData("transfer", [
            HOUSE_ADDRESS,
            parseEther(betAmount)
        ]);

        const userOpHash = await kernelClient.sendUserOperation({
            userOperation: {
                callData: await account.encodeCallData([
                    await getERC20PaymasterApproveCall(
                        paymasterClient as ZeroDevPaymasterClient<EntryPoint>,
                        {
                            gasToken: usdeAddress,
                            approveAmount: parseEther(betAmount),
                            entryPoint
                        }
                    ),
                    {
                        to: usdeAddress,
                        value: BigInt(0),
                        data: transferData
                    }
                ])
            }
        })

        const bundlerClient = kernelClient.extend(bundlerActions(entryPoint))
        const userOp = await bundlerClient.waitForUserOperationReceipt({
            hash: userOpHash,
            timeout: 1000000
        })
        
        return {
            success: true,
            hash: userOp.receipt.transactionHash,
            playerChoice,
            result: gameResult,
            won: playerWon,
            amount: playerWon ? (parseFloat(betAmount) * 2).toString() : "0"
        }
    }
}

export { main }
