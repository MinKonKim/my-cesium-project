import {
  createWorldTerrainAsync,
  Ion,
  IonResource,
  ScreenSpaceEventType,
} from "cesium";
import { useRef, useEffect, useState } from "react";
import {
  Cesium3DTileset,
  ImageryLayer,
  ScreenSpaceEvent,
  ScreenSpaceEventHandler,
  Viewer,
} from "resium";
import { MapProvider } from "../context/MapContext";
import { SearchWidget } from "./SearchWidget";
import { useMapLayers } from "../hooks/useMapLayers";
import { useMapClick } from "../hooks/useMapClick";
import { useCamera } from "../hooks/useCamera";

// Cesium Ion 토큰 설정
Ion.defaultAccessToken =
  process.env.REACT_APP_CESIUM_ION_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQxYWYtYjY3MC1jMTQyODBkMjY0YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjU0NzQ5Nn0.7d5Wj9a1q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0";

function Seoul3DMap() {
  const viewerRef = useRef<any>(null);
  const [showSearchWidget, setShowSearchWidget] = useState(true);

  // 커스텀 훅들
  const { satelliteProvider, hybridProvider } = useMapLayers();
  const { handleClick } = useMapClick(viewerRef);
  const { flyToLocation } = useCamera(viewerRef);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (viewerRef.current?.cesiumElement) {
        viewerRef.current.cesiumElement.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Viewer ref={viewerRef} full terrainProvider={createWorldTerrainAsync()}>
        <ImageryLayer imageryProvider={satelliteProvider} />
        <ImageryLayer imageryProvider={hybridProvider} />
        <Cesium3DTileset url={IonResource.fromAssetId(96188)} />
        {/* OSM Buildings */}
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent
            type={ScreenSpaceEventType.LEFT_CLICK}
            action={handleClick}
          />
        </ScreenSpaceEventHandler>
      </Viewer>

      {/* 검색 위젯 */}
      {showSearchWidget && (
        <SearchWidget
          onClose={() => setShowSearchWidget(false)}
          onLocationSelect={flyToLocation}
        />
      )}
    </div>
  );
}

export default function SeoulMap() {
  return (
    <MapProvider>
      <Seoul3DMap />
    </MapProvider>
  );
}
