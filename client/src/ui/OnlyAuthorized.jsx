import {useAuth} from "../auth/AuthContext";

export const OnlyAuthorized = ({children}) => {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated) {
        return children;
    } else {
        return null;
    }
}