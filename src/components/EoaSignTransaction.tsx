import {WHEEL_ABI} from "@/constants/abis";
import {
  API_KEY,
  BUNDLER_ENDPOINT,
  LUCKY_WHEEL_CONTRACT,
  LUCKY_WHEEL_CONTRACT_A8_TESTNET,
  SECRET_KEY,
} from "@/constants/constant";
import {buildContractCallRequest} from "@layerg-ua-sdk/aa-sdk";
import {UserData} from "@/hooks/useAuth";

interface EoaSignTransactionProps {
  user: UserData;
}

export default function EoaSignTransaction({user}: EoaSignTransactionProps) {
  async function signTransaction() {
    const chainId = 2484;
    const wheel_contract = chainId === 2484 ? LUCKY_WHEEL_CONTRACT : LUCKY_WHEEL_CONTRACT_A8_TESTNET;

    const txRequest = buildContractCallRequest({
      sender: user.walletAddress || "0x0000000000000000000000000000000000000000",
      contractAddress: wheel_contract,
      abi: WHEEL_ABI,
      method: "spin",
      params: [],
    });

    const TEST_TRANSACTION = {
      chainId: chainId,
      transactionReq: {
        to: txRequest.to,
        value: "0",
        data: txRequest.data,
        maxPriorityFeePerGas: "1000000000", // Lower gas price for testing
        maxFeePerGas: "1200000000", // Lower gas price for testing
      },
    };
    const response = await fetch(`${BUNDLER_ENDPOINT}eoa-wallet/sign-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-api-key": API_KEY,
        "x-secret-key": SECRET_KEY,
      },
      body: JSON.stringify(TEST_TRANSACTION),
    });
    const data = await response.json();
    alert(JSON.stringify(data));
  }
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={signTransaction}>
      EOA Sign Transaction
    </button>
  );
}
