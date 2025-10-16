import { Cartesian3, Viewer as CesiumViewer } from "cesium";

// 줌 레벨에 따른 높이 계산
export const calculateZoomHeight = (zoomLevel: number): number => {
  // 줌 레벨 5일 때 높이 1000이 되도록 계산
  // 줌 레벨 1: 20000, 줌 레벨 5: 1000, 줌 레벨 10: 62.5
  return Math.max(100, 20000 / Math.pow(2, zoomLevel - 1));
};

// 카메라를 특정 위치로 부드럽게 이동
export const flyToLocation = (
  viewer: CesiumViewer,
  longitude: number,
  latitude: number,
  height: number,
  duration: number = 1.5
): Promise<void> => {
  return new Promise((resolve) => {
    const camera = viewer.camera;

    camera.flyTo({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      duration,
      complete: () => {
        console.log(
          `카메라 이동 완료: ${latitude}, ${longitude}, 높이: ${height}m`
        );
        resolve();
      },
    });
  });
};

// 줌 레벨에 따른 카메라 이동
export const flyToZoomLevel = (
  viewer: CesiumViewer,
  longitude: number,
  latitude: number,
  zoomLevel: number,
  duration: number = 1.5
): Promise<void> => {
  const targetHeight = calculateZoomHeight(zoomLevel);
  return flyToLocation(viewer, longitude, latitude, targetHeight, duration);
};

// 서울로 이동
export const flyToSeoul = (
  viewer: CesiumViewer,
  altitude: number = 1000,
  duration: number = 2.0
): Promise<void> => {
  return flyToLocation(viewer, 126.978, 37.5665, altitude, duration);
};

// 현재 위치로 이동 (예시: 제주도)
export const flyToCurrentLocation = (
  viewer: CesiumViewer,
  duration: number = 2.0
): Promise<void> => {
  return flyToLocation(viewer, 126.5312, 33.4996, 5000, duration);
};

// 카메라 이동이 필요한지 확인
export const shouldMoveCamera = (
  viewer: CesiumViewer,
  targetHeight: number,
  threshold: number = 1000
): boolean => {
  const currentHeight = viewer.camera.positionCartographic.height;
  return Math.abs(currentHeight - targetHeight) > threshold;
};
