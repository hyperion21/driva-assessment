export interface BaseLender {
  id: string;
  name: string;
  interest: number;
  fee?: string;
}

export interface Lender extends BaseLender {
  monthly: number;
}
