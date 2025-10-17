import React from "react";
import RoutesSetup from "./routes/route";
import { QueryProvider } from "./providers/QueryProvider";

// Cesium Ion 토큰 설정 (무료 토큰)

// 루트 앱 컴포넌트
const App: React.FC = () => {
  return (
    <QueryProvider>
      <RoutesSetup />
    </QueryProvider>
  );
};

export default App;
