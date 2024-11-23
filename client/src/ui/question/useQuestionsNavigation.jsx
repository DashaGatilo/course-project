import {useNavigate} from "react-router-dom";

const paths = {
    createQuestion: '/questions/create-question',
    questions: '/questions',
}

export function useQuestionsNavigation() {
    const navigate = useNavigate();


    return {
        paths,
        goToCreateQuestion: () => navigate(paths.createQuestion),
        goToAllQuestion: () => navigate(paths.questions),
        goToQuestionPage: (id) => navigate(`${paths.questions}/` + id),
    }
}