import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/main/Dashboard";
import AllAbPage from "./pages/main/AllAb";
import NewAbPage from "./pages/main/NewAb";
import ActiveAbsPage from "./pages/main/ActiveAb";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/all-abs" element={<AllAbPage />} />
        <Route exact path="/active-abs" element={<ActiveAbsPage />} />
        <Route exact path="/new-ab" element={<NewAbPage />} />
      </Routes>
    </Layout>
  );
}
