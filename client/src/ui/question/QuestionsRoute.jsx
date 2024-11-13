import {Route, Routes} from 'react-router-dom';
import {QuestionFormPage} from "./QuestionFormPage";
import Layout from "../Layout";
import {QuestionList} from "./QuestionList";
import {QuestionPage} from "./QuestionPage";

export const QuestionsRoute = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<QuestionList/>}/>
                <Route path=":id" element={<QuestionPage/>}/>
                <Route path='create-question' element={<QuestionFormPage/>}/>
            </Route>
        </Routes>
    )
}