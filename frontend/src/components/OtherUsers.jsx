import React from 'react'
import OtherUser from './OtherUser'
import UseGetOtherUsers from '../hooks/UseGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = ({ search = "" }) => {
    UseGetOtherUsers()
    const { otherUsers } = useSelector(store => store.user);

    if (!otherUsers) {
        return null; // early return in react IMP
    }

    // WhatsApp-like filtering as you type
    const filteredUsers = otherUsers.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto">
            {
                filteredUsers?.map((user) => {
                    return <OtherUser key={user._id} user={user} />
                })
            }
            {filteredUsers.length === 0 && (
                <div className="text-center text-slate-300 mt-4">
                    No users found.
                </div>
            )}
        </div>
    )
}

export default OtherUsers