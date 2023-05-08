import {ABOUT_APP_ROUTE, ABOUT_AUTHOR_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REG_ROUTE} from "./consts";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TodoContainer from "../components/TodoContainer";
import About from "../pages/About";

export const publicRoutes = [{
    path: REG_ROUTE, Component: RegisterPage
}, {
    path: LOGIN_ROUTE, Component: LoginPage
}]

export const authRoutes = [{
    path: MAIN_ROUTE, Component: TodoContainer
}, {
    path: ABOUT_APP_ROUTE, Component: About
}, {
    path: ABOUT_AUTHOR_ROUTE, Component: About
}]
