import { Cesium3DTileFeature } from "cesium";

export const useMapClick = (viewerRef: React.RefObject<any>) => {
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
        console.log("클릭된 건물:", name, "높이:", height);
      }
    } catch (error) {
      console.warn("클릭 이벤트 처리 중 오류:", error);
    }
  };

  return { handleClick };
};
