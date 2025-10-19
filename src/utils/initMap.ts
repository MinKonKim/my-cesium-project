import React from "react";
import { Cartesian3, Cartographic, Math } from "cesium";

export const initMap = (
  center: Cartesian3,
  mapContainerRef: React.RefObject<any>,
  mapRef: React.RefObject<any>
) => {
  if (!window.vw) {
    console.error("vw (VWorld SDK)가 로드되지 않았습니다.");
    return;
  }

  const cartographic = Cartographic.fromCartesian(center);
  const x = Math.toDegrees(cartographic.longitude);
  const y = Math.toDegrees(cartographic.latitude);
  const z = cartographic.height;
  const mapOptions = new window.vw.MapOptions(
    window.vw.BasemapType.GRAPHIC,
    "",
    window.vw.DensityType.BASIC,
    window.vw.DensityType.BASIC,
    false,
    new window.vw.CameraPosition(
      new window.vw.CoordZ(x, y, z),
      new window.vw.Direction(0, -90, 0)
    ),
    new window.vw.CameraPosition(
      new window.vw.CoordZ(x, y, 1000),
      new window.vw.Direction(0, -90, 0)
    )
  );

  const map = new window.vw.Map(mapContainerRef.current, mapOptions);
  mapRef.current = map;

  // 예: 클릭 이벤트 처리
  map.onClick.addEventListener(
    (
      _windowPosition: any,
      _ecefPos: any,
      cartographic: any,
      _featureInfo: any,
      _event: any
    ) => {
      console.log("클릭 좌표 (cartographic):", cartographic);
      // 예: 좌표 → WFS API 호출 등
    }
  );
};
