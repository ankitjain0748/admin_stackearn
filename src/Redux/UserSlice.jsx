import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {

        adduser: (state, action) => {
            state.users.push(action.payload)
        },
        reduxdatauser: (state, action) => {
            state.users.push(action.payload)
        },
       
         socialmedia: (state, action) => {
            state.users.push(action.payload)
        },
    }
})

export const { adduser ,reduxdatauser ,socialmedia} = UserSlice.actions;

export const selectuser = (state) => state.users.users;
export default UserSlice.reducer;