import React, { useState, useRef, useEffect } from "react";
import { Viewer, Entity, RectangleGraphics } from "resium";
import {
  Cartesian3,
  Color,
  Ion,
  Viewer as CesiumViewer,
  Rectangle,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartographic,
  Math as CesiumMath,
} from "cesium";
import CustomWidget from "./components/CustomWidget";
import InfoPanel from "./components/InfoPanel";
import { MapProvider, useMapContext } from "./context/MapContext";
import {
  calculateZoomHeight,
  flyToZoomLevel,
  flyToSeoul,
  flyToCurrentLocation,
  shouldMoveCamera,
} from "./utils";

// Cesium Ion 토큰 설정 (무료 토큰)
const accessToken =
  process.env.REACT_APP_CESIUM_ION_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQxYWYtYjY3MC1jMTQyODBkMjY0YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjU0NzQ5Nn0.7d5Wj9a1q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0";

Ion.defaultAccessToken = accessToken;

// Cesium 리소스 기본 경로 설정
(window as any).CESIUM_BASE_URL = "/cesium/";

// 메인 앱 컴포넌트 (MapProvider 내부)
const AppContent: React.FC = () => {
  const position = Cartesian3.fromDegrees(127.0, 37.5, 1000);
  const [showCustomWidget, setShowCustomWidget] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const viewerRef = useRef<CesiumViewer | null>(null);
  const { state, actions } = useMapContext();

  // 줌 레벨 변경 시 카메라 이동
  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      const targetHeight = calculateZoomHeight(state.zoomLevel);

      if (shouldMoveCamera(viewer, targetHeight)) {
        flyToZoomLevel(
          viewer,
          state.currentLocation.longitude,
          state.currentLocation.latitude,
          state.zoomLevel
        );
      }
    }
  }, [
    state.zoomLevel,
    state.currentLocation.latitude,
    state.currentLocation.longitude,
  ]);

  // 서울로 이동 버튼 클릭 시 카메라 이동
  useEffect(() => {
    if (viewerRef.current && state.currentLocation.latitude === 37.5665) {
      const viewer = viewerRef.current;
      flyToSeoul(viewer, state.currentLocation.altitude);
    }
  }, [state.currentLocation]);

  // 마우스 클릭 이벤트 처리
  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

      handler.setInputAction((event: any) => {
        const pickedPosition = viewer.camera.pickEllipsoid(
          event.position,
          viewer.scene.globe.ellipsoid
        );

        if (pickedPosition) {
          const cartographic = Cartographic.fromCartesian(pickedPosition);
          const longitude = CesiumMath.toDegrees(cartographic.longitude);
          const latitude = CesiumMath.toDegrees(cartographic.latitude);
          const altitude = cartographic.height;

          actions.setClickedLocation({
            latitude,
            longitude,
            altitude: Math.round(altitude),
          });
        }
      }, ScreenSpaceEventType.LEFT_CLICK);

      return () => {
        handler.destroy();
      };
    }
  }, [actions]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Viewer
        full
        ref={(e) => {
          if (e && e.cesiumElement) {
            viewerRef.current = e.cesiumElement;
          }
        }}
      >
        <Entity name="Seoul" position={position}>
          <RectangleGraphics
            coordinates={Rectangle.fromDegrees(
              126.978,
              37.5665,
              127.0,
              37.5665
            )}
            material={Color.RED}
          />
        </Entity>
      </Viewer>

      {/* 커스텀 위젯들 */}
      {showCustomWidget && (
        <CustomWidget onClose={() => setShowCustomWidget(false)} />
      )}
      {showInfoPanel && <InfoPanel onClose={() => setShowInfoPanel(false)} />}
    </div>
  );
};

// 루트 앱 컴포넌트
const App: React.FC = () => {
  return (
    <MapProvider>
      <AppContent />
    </MapProvider>
  );
};

export default App;
