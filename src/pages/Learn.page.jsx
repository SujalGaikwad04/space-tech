import { Routes, Route } from "react-router-dom";

import Learn from "../components/learn/learn";
import WhatIf from "../components/whatif/whatif";
import Detailquiz from "../components/quiz/detailquiz";

function Learnpage() {
  return (
    <Routes>
      <Route path="/learning" element={<Learn />} />
      <Route path="/whatif" element={<WhatIf />} />
      <Route path="/quiz" element={<Detailquiz />} />
    </Routes>
  );
}

export default Learnpage;