import {useAuth} from "../auth/AuthContext";
import React from "react";

export const onlyForAdmin = (Component) => (props) => {
    const {userRole} = useAuth();

    if (userRole === 'admin') {
        return <Component {...props} />;
    } else {
        return ''
    }
};

export const onlyForManager = (Component) => (props) => {
    const {userRole} = useAuth();

    if (userRole === 'manager' || userRole === 'admin') {
        return <Component {...props} />;
    } else {
        return ''
    }
};
