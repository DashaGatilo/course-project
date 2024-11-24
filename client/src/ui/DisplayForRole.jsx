import {useAuth} from "../auth/AuthContext";

export function DisplayForAdmin({children}) {
    const {userRole} = useAuth();
    if (userRole === 'admin') {
        return children
    } else {
        return null;
    }
}

export function DisplayForManager({children}) {
    const {userRole} = useAuth();
    if (userRole === 'manager') {
        return children
    } else {
        return null;
    }
}