export interface Lender {
  id: string;
  name: string;
  monthly: number;
  interest: number;
  fee?: string;
  image?: string;
}
