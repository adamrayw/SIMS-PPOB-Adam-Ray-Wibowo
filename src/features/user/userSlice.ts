import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserItem } from "../../types/IUser";

const initialState: UserItem = {
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserItem>) => {
            return { ...state, ...action.payload };
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;