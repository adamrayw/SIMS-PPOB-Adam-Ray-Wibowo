import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceItem } from "../../types/IService";

const initialState: ServiceItem = {
    service_code: '',
    service_icon: '',
    service_name: '',
    service_tariff: 0
}

export const layananSlice = createSlice({
    name: 'layanan',
    initialState,
    reducers: {
        currentLayanan: (state, action: PayloadAction<ServiceItem>) => {
            return {...state, ...action.payload}
        }
    }
})

export const { currentLayanan } = layananSlice.actions;

export default layananSlice.reducer;