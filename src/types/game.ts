export interface WheelSegment {
  color: string;
  text: string;
  prize: number;
}

export interface TransactionState {
  isSuccess: boolean;
  status: "pending" | "success" | "failed" | null;
  message: string;
  hash: string | null;
  error: string | null;
}

export interface GameResult {
  segment: WheelSegment;
  transactionHash: string;
}
