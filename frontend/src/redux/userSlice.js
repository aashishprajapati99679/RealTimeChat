import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")) : null,
        selectedUser: null,
        OtherUsers: [],
        onlineUsers: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        updateUserConversation: (state, action) => {
            const { userId, newMessage, incrementUnread } = action.payload;
            const userIndex = state.otherUsers.findIndex(u => u._id === userId);
            if (userIndex !== -1) {
                state.otherUsers[userIndex].lastMessage = newMessage;
                if (incrementUnread) {
                    state.otherUsers[userIndex].unreadCount = (state.otherUsers[userIndex].unreadCount || 0) + 1;
                }
                
                // Optional: Move the user to the top of the list
                const [updatedUser] = state.otherUsers.splice(userIndex, 1);
                state.otherUsers.unshift(updatedUser);
            }
        },
        clearUnreadCount: (state, action) => {
            const userId = action.payload;
            const userIndex = state.otherUsers.findIndex(u => u._id === userId);
            if (userIndex !== -1) {
                state.otherUsers[userIndex].unreadCount = 0;
            }
        }
    }
})

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, updateUserConversation, clearUnreadCount } = userSlice.actions;
export default userSlice.reducer;