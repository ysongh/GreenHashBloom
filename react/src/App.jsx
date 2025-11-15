import { HashRouter, Route, Routes } from "react-router-dom";

import TreeMap from "./pages/TreeMap";
import TreeShop from "./pages/TreeShop";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/treeshop"
          element={<TreeShop />} />
        <Route
          path="/map"
          element={<TreeMap />} />
        <Route
          path="/"
          element={<>Test</>} />
      </Routes>
    </HashRouter>
  )
}

export default App
