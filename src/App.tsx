import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeScreen />} path="/" />
        {/*<Route element={<MovieScreen />} path="/movie" />
        <Route element={<UserScreen />} path="/user" />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
