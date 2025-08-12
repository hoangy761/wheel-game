interface EoaSignAndSendTransactionProps {
  onSpin: () => void;
}

export default function EoaSignAndSendTransaction({onSpin}: EoaSignAndSendTransactionProps) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onSpin}>
      EOA Sign and Send Transaction
    </button>
  );
}
