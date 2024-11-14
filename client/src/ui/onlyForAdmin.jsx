import {useAuth} from "../auth/AuthContext";
import React from "react";
import {Navigate} from "react-router-dom";

export const onlyForAdmin = (Component) => (props) => {
    const {userRole} = useAuth();

    if (userRole === 'Admin') {
        return <Component {...props} />;
    } else {
        return ''
    }
};
