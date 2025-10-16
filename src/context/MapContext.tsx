import React, { createContext, useContext, useState, ReactNode } from "react";

// 지도 상태 타입 정의
interface MapState {
  mapStyle: string;
  zoomLevel: number;
  showBuildings: boolean;
  currentLocation: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  clickedLocation: {
    latitude: number;
    longitude: number;
    altitude: number;
  } | null;
}

// 지도 액션 타입 정의
interface MapActions {
  setMapStyle: (style: string) => void;
  setZoomLevel: (level: number) => void;
  setShowBuildings: (show: boolean) => void;
  setCurrentLocation: (location: {
    latitude: number;
    longitude: number;
    altitude: number;
  }) => void;
  setClickedLocation: (
    location: {
      latitude: number;
      longitude: number;
      altitude: number;
    } | null
  ) => void;
  flyToSeoul: () => void;
  flyToCurrentLocation: () => void;
}

// Context 타입 정의
interface MapContextType {
  state: MapState;
  actions: MapActions;
}

// 초기 상태
const initialState: MapState = {
  mapStyle: "satellite",
  zoomLevel: 1,
  showBuildings: true,
  currentLocation: {
    latitude: 37.5,
    longitude: 127.0,
    altitude: 1000,
  },
  clickedLocation: null,
};

// Context 생성
const MapContext = createContext<MapContextType | undefined>(undefined);

// Provider 컴포넌트
export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<MapState>(initialState);

  const actions: MapActions = {
    setMapStyle: (style: string) => {
      setState((prev) => ({ ...prev, mapStyle: style }));
    },

    setZoomLevel: (level: number) => {
      setState((prev) => ({ ...prev, zoomLevel: level }));
    },

    setShowBuildings: (show: boolean) => {
      setState((prev) => ({ ...prev, showBuildings: show }));
    },

    setCurrentLocation: (location: {
      latitude: number;
      longitude: number;
      altitude: number;
    }) => {
      setState((prev) => ({ ...prev, currentLocation: location }));
    },

    setClickedLocation: (
      location: {
        latitude: number;
        longitude: number;
        altitude: number;
      } | null
    ) => {
      setState((prev) => ({ ...prev, clickedLocation: location }));
    },

    flyToSeoul: () => {
      setState((prev) => ({
        ...prev,
        currentLocation: {
          latitude: 37.5665,
          longitude: 126.978,
          altitude: 20000,
        },
      }));
    },

    flyToCurrentLocation: () => {
      // 실제 GPS 위치를 가져오는 로직 (현재는 제주도 예시)
      setState((prev) => ({
        ...prev,
        currentLocation: {
          latitude: 33.4996,
          longitude: 126.5312,
          altitude: 5000,
        },
      }));
    },
  };

  return (
    <MapContext.Provider value={{ state, actions }}>
      {children}
    </MapContext.Provider>
  );
};

// Custom Hook
export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
