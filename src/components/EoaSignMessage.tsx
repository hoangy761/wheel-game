import {API_KEY, BUNDLER_ENDPOINT, SECRET_KEY} from "@/constants/constant";
import {useState} from "react";

export default function EoaSignMessage() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [result, setResult] = useState("");
  async function signMessage() {
    const response = await fetch(`${BUNDLER_ENDPOINT}eoa-wallet/sign-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-api-key": API_KEY,
        "x-secret-key": SECRET_KEY,
      },
      body: JSON.stringify({
        chainId: 2484,
        message: message,
      }),
    });
    const data = await response.json();
    if (data.data.signature) {
      setSignature(data.data.signature);
    }
  }

  async function verifyMessage() {
    if (!signature) {
      alert("Please sign the message first");
      return;
    }
    const response = await fetch(`${BUNDLER_ENDPOINT}eoa-wallet/verify-signature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-api-key": API_KEY,
        "x-secret-key": SECRET_KEY,
      },
      body: JSON.stringify({
        chainId: 2484,
        message: message,
        signature: signature,
      }),
    });
    const data = await response.json();
    setResult(data.data.isValid);
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full text-black"
        />

        <button
          className="bg-blue-500 w-72 px-4 py-2 rounded-md border-2 border-blue-500 text-nowrap"
          onClick={signMessage}
        >
          EOA Sign Message
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full text-black"
        />

        <button
          className="bg-blue-500 w-72  px-4 py-2 rounded-md border-2 border-blue-500 text-nowrap"
          disabled={!signature}
          onClick={verifyMessage}
        >
          EOA Verify Signature
        </button>
      </div>
      <div className="flex gap-2 text-black">
        Result:{" "}
        {result ? (
          <p className="text-green-500">Signature is valid</p>
        ) : (
          <p className="text-red-500">Signature is invalid</p>
        )}
      </div>
    </div>
  );
}
