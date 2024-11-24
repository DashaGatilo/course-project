import {useNavigate} from "react-router-dom";

export function useProfileNavigation() {
    const navigate = useNavigate();
    return {
        goToMyProfile: () => navigate('/profile'),
    }
}