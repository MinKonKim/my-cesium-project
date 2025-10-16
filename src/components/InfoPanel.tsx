import React from "react";
import { useMapContext } from "../context/MapContext";

interface InfoPanelProps {
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ onClose }) => {
  const { state } = useMapContext();
  const { latitude, longitude, altitude } =
    state.clickedLocation || state.currentLocation;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        maxWidth: "300px",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
          📍 위치 정보
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#666",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f5f5f5";
            e.currentTarget.style.color = "#333";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "#666";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ×
        </button>
      </div>

      <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.5" }}>
        <p>
          <strong>위도:</strong> {latitude.toFixed(4)}°
        </p>
        <p>
          <strong>경도:</strong> {longitude.toFixed(4)}°
        </p>
        <p>
          <strong>고도:</strong> {altitude}m
        </p>
        <p>
          <strong>지도 스타일:</strong> {state.mapStyle}
        </p>
        <p>
          <strong>줌 레벨:</strong> {state.zoomLevel}
        </p>
        <p>
          <strong>건물 표시:</strong> {state.showBuildings ? "ON" : "OFF"}
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;
