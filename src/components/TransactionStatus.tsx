"use client";

import {CheckCircle, Loader2, XCircle} from "lucide-react";
import {TransactionState} from "@/types/game";

interface TransactionStatusProps {
  state: TransactionState;
}

const TransactionStatus = ({state}: TransactionStatusProps) => {
  if (!state.message) return null;

  return (
    <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg flex items-center">
      {state.isSuccess && <CheckCircle className="text-green-500 mr-2" size={16} />}
      {state.status === "pending" && <Loader2 className="animate-spin mr-2" size={16} />}
      {state.status === "failed" && <XCircle className="text-red-500 mr-2" size={16} />}

      <div>
        <p className="text-sm font-medium">{state.message}</p>
        {state.hash && (
          <p className="text-xs mt-1 text-blue-600">
            Tx: {state.hash.slice(0, 10)}...{state.hash.slice(-6)}
          </p>
        )}
        {state.error && <p className="text-xs mt-1 text-red-600">{state.error}</p>}
      </div>
    </div>
  );
};

export default TransactionStatus;
