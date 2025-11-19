import { HashRouter, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar";
import UserProfile from "./pages/UserProfile";
import TreeShop from "./pages/TreeShop";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route
          path="/treeshop"
          element={<TreeShop />} />
        <Route
          path="/userprofile"
          element={<UserProfile />} />
        <Route
          path="/"
          element={<>Test</>} />
      </Routes>
    </HashRouter>
  )
}

export default App
