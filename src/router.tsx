import { BrowserRouter, Route, Routes } from "react-router";
import HomeScreen from "./screens/home/page";
import UserScreen from "./screens/user/page";
import MovieScreen from "./screens/movie/page";
import LoginPage from "./screens/auth/login/page";
import RegisterPage from "./screens/auth/register/page";
import SearchPage from "./screens/search/page";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/user/:id" element={<UserScreen />} />
                <Route path="/movie/:id" element={<MovieScreen />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </BrowserRouter>
    )
}