import { HashRouter, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar";
import UserProfile from "./pages/UserProfile";
import TreeShop from "./pages/TreeShop";
import Landing from "./pages/Landing";
import SendGift from "./pages/SendGift";
import CarbonCreditMarketplace from "./pages/CarbonCreditMarketplace";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route
          path="/ccmarketplace"
          element={<CarbonCreditMarketplace />} />
        <Route
          path="/sendgift"
          element={<SendGift />} />
        <Route
          path="/treeshop"
          element={<TreeShop />} />
        <Route
          path="/userprofile"
          element={<UserProfile />} />
        <Route
          path="/"
          element={<Landing />} />
      </Routes>
    </HashRouter>
  )
}

export default App
