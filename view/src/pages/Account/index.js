import React from "react";
import { useSelector } from 'react-redux';
import Auth from "../../components/Auth";
import Profile from "../../components/Profile";
import { selectIsLoggedIn } from "../../store/UserSlice";

function Account() {
    const userLoggedIn = useSelector(selectIsLoggedIn);
    
    return userLoggedIn ? <Profile /> : <Auth />;
};

export default Account;