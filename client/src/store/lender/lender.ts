import { create } from "zustand";
import { getLenderSuggestions } from "../../api";
import { Lender, LoanRequest } from "../../types";

interface LenderStore {
  lenders: Lender[];
  loading: boolean;
  error: string | null;
  fetchLenders: (loanData: LoanRequest) => Promise<void>;
  reset: () => void;
}

export const useLenderStore = create<LenderStore>((set) => ({
  lenders: [],
  loading: false,
  error: null,
  fetchLenders: async (loanData) => {
    set({ loading: true, error: null });

    try {
      const result = await getLenderSuggestions(loanData);
      set({ lenders: result });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },
  reset: () => set({ lenders: [], loading: false, error: null }),
}));
