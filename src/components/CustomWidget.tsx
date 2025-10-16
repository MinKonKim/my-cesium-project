import React, { useState } from "react";
import { useMapContext } from "../context/MapContext";

interface CustomWidgetProps {
  onClose: () => void;
}

const CustomWidget: React.FC<CustomWidgetProps> = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { state, actions } = useMapContext();

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        minWidth: "200px",
        transition: "all 0.3s ease",
      }}
    >
      {/* 위젯 헤더 */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f8f9fa";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
          🗺️ 지도 컨트롤
        </h3>
        <span
          style={{
            fontSize: "18px",
            color: "#666",
            transition: "all 0.2s ease",
            display: "inline-block",
          }}
        >
          {isExpanded ? "−" : "+"}
        </span>
      </div>

      {/* 위젯 내용 */}
      {isExpanded && (
        <div style={{ padding: "16px", width: "25vw", minWidth: "200px" }}>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontSize: "14px",
                color: "#555",
              }}
            >
              지도 스타일
            </label>
            <select
              value={state.mapStyle}
              onChange={(e) => actions.setMapStyle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              <option value="satellite">위성</option>
              <option value="terrain">지형</option>
              <option value="street">도로</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontSize: "14px",
                color: "#555",
              }}
            >
              줌 레벨
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={state.zoomLevel}
              onChange={(e) => actions.setZoomLevel(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              줌 레벨: {state.zoomLevel}
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <button
              onClick={actions.flyToSeoul}
              style={{
                flex: 1,
                padding: "8px 12px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#45a049";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(76, 175, 80, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#4CAF50";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              서울로 이동
            </button>
            <button
              onClick={actions.flyToCurrentLocation}
              style={{
                flex: 1,
                padding: "8px 12px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1976D2";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(33, 150, 243, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2196F3";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              현재 위치
            </button>
          </div>

          {/* 레이어 토글 */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#555" }}>건물 표시</span>
              <input
                type="checkbox"
                checked={state.showBuildings}
                onChange={(e) => actions.setShowBuildings(e.target.checked)}
                style={{
                  transform: "scale(1.2)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.4)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1.2)";
                  e.currentTarget.style.filter = "brightness(1)";
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "8px 12px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d32f2f";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(244, 67, 54, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f44336";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomWidget;
