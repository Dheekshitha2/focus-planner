import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Today from "./pages/Today";
import Topics from "./pages/Topics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/today" replace />} />
        <Route path="/today" element={<Today />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
