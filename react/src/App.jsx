import { HashRouter, Route, Routes } from "react-router-dom";

import TreeMap from "./pages/TreeMap";

function App() {

  return (
    <HashRouter>
      <Routes>
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
