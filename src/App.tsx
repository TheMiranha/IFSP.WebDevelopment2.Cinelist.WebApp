import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import UserScreen from "./screens/UserScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeScreen />} path="/" />
        <Route element={<MovieScreen />} path="/movie" />
        <Route element={<UserScreen />} path="/user" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
