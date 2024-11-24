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
        goToCategoryQuestions: (categoryId) => navigate(paths.questions + `?categoryId=${categoryId}`),
        goToQuestionPage: (id) => navigate(`${paths.questions}/` + id),
    }
}