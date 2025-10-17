import { useMemo } from "react";
import { WebMapTileServiceImageryProvider } from "cesium";

const VWORLD_KEY =
  process.env.REACT_APP_VWORLD_KEY || "CB8912F1-3A08-318D-9471-81A04D8D3B38";

export const useMapLayers = () => {
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

  return { satelliteProvider, hybridProvider };
};
