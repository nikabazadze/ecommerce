import React from "react";
import { useSelector } from 'react-redux';
import Auth from "../Auth";
import Profile from "../Profile";
import { selectIsLoggedIn } from "../../store/UserSlice";

function Account() {
    const userLoggedIn = useSelector(selectIsLoggedIn);
    
    return userLoggedIn ? <Profile /> : <Auth />;
};

export default Account;