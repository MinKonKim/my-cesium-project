import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeoulMap from "../components/Seoul3DMap";

export default function RoutesSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SeoulMap />} />
      </Routes>
    </BrowserRouter>
  );
}
