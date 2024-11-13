import {useNavigate} from "react-router-dom";

export function useQuestionsNavigation() {
    const navigate = useNavigate();

    return {
        goToCreateQuestion: () => navigate('/questions/create-question'),
        goToAllQuestion: () => navigate('/questions'),
        goToQuestionPage: (id) => navigate('/questions/' + id),
    }
}