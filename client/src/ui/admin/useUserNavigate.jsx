import {useNavigate} from "react-router-dom";

export function useUserNavigate() {
    const navigate = useNavigate();

    return {
        goToUserListPage: () => navigate('/users'),
        goToUser: (id) => id ? navigate(`/profile/${id}`) : navigate('/profile'),
    }
}