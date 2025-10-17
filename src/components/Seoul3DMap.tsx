import {
  Cesium3DTileFeature,
  createWorldTerrainAsync,
  Ion,
  IonResource,
  ScreenSpaceEventType,
  WebMapTileServiceImageryProvider,
} from "cesium";
import { useMemo, useRef, useEffect } from "react";
import {
  Cesium3DTileset,
  ImageryLayer,
  ScreenSpaceEvent,
  ScreenSpaceEventHandler,
  Viewer,
} from "resium";
import { MapProvider } from "../context/MapContext";

const VWORLD_KEY =
  process.env.REACT_APP_VWORLD_KEY || "CB8912F1-3A08-318D-9471-81A04D8D3B38";

// Cesium Ion 토큰 설정
Ion.defaultAccessToken =
  process.env.REACT_APP_CESIUM_ION_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQxYWYtYjY3MC1jMTQyODBkMjY0YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjU0NzQ5Nn0.7d5Wj9a1q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0q0W9v0";

function Seoul3DMap() {
  const viewerRef = useRef<any>(null);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (viewerRef.current?.cesiumElement) {
        viewerRef.current.cesiumElement.destroy();
      }
    };
  }, []);

  // VWorld 배경지도 (위성 + 하이브리드)
  const satelliteProvider = useMemo(
    () =>
      new WebMapTileServiceImageryProvider({
        url: `http://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Satellite/{TileMatrix}/{TileRow}/{TileCol}.jpeg`,
        layer: "Satellite",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "EPSG:3857",
        maximumLevel: 19,
      }),
    []
  );
  const hybridProvider = useMemo(
    () =>
      new WebMapTileServiceImageryProvider({
        url: `http://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Hybrid/{TileMatrix}/{TileRow}/{TileCol}.png`,
        layer: "Hybrid",
        style: "default",
        format: "image/png",
        tileMatrixSetID: "EPSG:3857",
        maximumLevel: 19,
      }),
    []
  );

  // 클릭 이벤트 핸들러
  const handleClick = (e: any) => {
    if (!viewerRef.current?.cesiumElement) return;

    try {
      const viewer = viewerRef.current.cesiumElement;
      if (viewer.isDestroyed()) return;

      const picked = viewer.scene.pick(e.position);
      if (picked && picked instanceof Cesium3DTileFeature) {
        const name = picked.getProperty("name");
        const height = picked.getProperty("height");
        console.log("Clicked building:", name, "Height:", height);
        alert(name ? `${name} — 높이: ${height}m` : `높이: ${height}m`);
      }
    } catch (error) {
      console.warn("클릭 이벤트 처리 중 오류:", error);
    }
  };

  return (
    <Viewer ref={viewerRef} full terrainProvider={createWorldTerrainAsync()}>
      <ImageryLayer imageryProvider={satelliteProvider} />
      <ImageryLayer imageryProvider={hybridProvider} />
      <Cesium3DTileset url={IonResource.fromAssetId(96188)} />{" "}
      {/* OSM Buildings */}
      <ScreenSpaceEventHandler>
        <ScreenSpaceEvent
          type={ScreenSpaceEventType.LEFT_CLICK}
          action={handleClick}
        />
      </ScreenSpaceEventHandler>
    </Viewer>
  );
}

export default function SeoulMap() {
  return (
    <MapProvider>
      <Seoul3DMap />
    </MapProvider>
  );
}
