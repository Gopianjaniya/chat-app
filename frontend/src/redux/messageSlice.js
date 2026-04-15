import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload); // realtime
        },
        setAllMessages: (state, action) => {
            state.messages = action.payload; // initial load
        }
    }
});

export const { addMessage, setAllMessages } = messageSlice.actions;
export default messageSlice.reducer;