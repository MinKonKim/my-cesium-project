import React from "react";
import { Viewer, Entity } from "resium";
import { Cartesian3, Color, Ion } from "cesium";

// Cesium Ion 토큰 설정 (무료 토큰)
const accessToken =
  process.env.REACT_APP_CESIUM_ION_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQxYWYtYjY3MC1jMTQyODBkMjY0YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjU0NzQ5Nn0.7d5Wj9a1q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0";

Ion.defaultAccessToken = accessToken;

// Cesium 리소스 기본 경로 설정
(window as any).CESIUM_BASE_URL = "/cesium/";
const App: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Viewer full>
        <Entity
          name="Seoul"
          position={Cartesian3.fromDegrees(127.0, 37.5, 1000)}
          point={{ pixelSize: 10, color: Color.RED }}
          description="서울 위치입니다."
        />
      </Viewer>
    </div>
  );
};

export default App;
