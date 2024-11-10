import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from '../App.jsx';
// import QuestionList from '../components/QuestionList.jsx';
// import QuestionDetails from '../components/QuestionDetails.jsx';
// import CreateQuestion from '../components/CreateQuestion.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
// import CreateCategory from '../components/CreateCategory.jsx';
import AppAdmin from '../components/navbar/AppAdmin.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route index element={<QuestionList />} /> */}
      {/* <Route path="/questions/:id" element={<QuestionDetails />} /> */}
      {/* <Route path="/create-question" element={<CreateQuestion />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/create-category" element={<CreateCategory />} /> */}
      <Route path="/admin" element={<AppAdmin />} /> {/* Маршрут для админ-панели */}
    </Route>
  )
);

export default router;