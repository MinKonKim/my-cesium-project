import { Cartesian3 } from "cesium";

export const useCamera = (viewerRef: React.RefObject<any>) => {
  // 검색 결과 클릭 시 카메라 이동
  const flyToLocation = (x: number, y: number, name: string) => {
    if (viewerRef.current?.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;

      // 좌표를 Cartesian3로 변환
      const position = Cartesian3.fromDegrees(x, y, 1000);

      // 카메라 이동
      viewer.camera.flyTo({
        destination: position,
        duration: 2.0,
        complete: () => {
          console.log(`${name}으로 카메라 이동 완료`);
        },
      });
    }
  };

  return { flyToLocation };
};
