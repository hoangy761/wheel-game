export interface WheelSegment {
  color: string;
  text: string;
  prize: number;
}

export interface TransactionState {
  isSuccess: boolean;
  status: string;
  hash: string | null;
  error: string | null;
}

export interface GameResult {
  segment: WheelSegment;
  transactionHash: string;
}
