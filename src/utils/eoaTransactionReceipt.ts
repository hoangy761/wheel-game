import {API_KEY, BUNDLER_ENDPOINT, SECRET_KEY} from "@/constants/constant";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const waitForEoaTransactionReceipt = async (
  transactionId: string,
  timeout = 60000,
  interval = 5000
): Promise<any> => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const res = await getEoaTransactionReceipt(transactionId);
    if (res && res.receipt) {
      console.log("Done: waitForEoaTransactionReceipt", res.receipt);
      return res.receipt;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error("Timeout waiting for EOA transaction receipt");
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getEoaTransactionReceipt = async (transactionId: string): Promise<any | null> => {
  try {
    const response = await fetch(`${BUNDLER_ENDPOINT}eoa-wallet/transaction/${transactionId}/receipt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-api-key": API_KEY,
        "x-secret-key": SECRET_KEY,
      },
    });
    const txReceiptData = await response.json();
    // If no receipt found
    if (!txReceiptData.data) {
      return null;
    }
    console.log("Done: getEoaTransactionReceipt", txReceiptData.data);
    return txReceiptData.data;
  } catch (error) {
    console.error("Failed to get EOA transaction receipt:", error);
    throw error;
  }
};
