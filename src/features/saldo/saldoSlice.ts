import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BalanceItem } from "../../types/IBalance";

const initialState: BalanceItem = {
    balance: 0,
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        updateBalance: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
        },
        decreaseBalance: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload;
        },
    }
})

export const { setBalance, updateBalance, decreaseBalance } = balanceSlice.actions;

export default balanceSlice.reducer;