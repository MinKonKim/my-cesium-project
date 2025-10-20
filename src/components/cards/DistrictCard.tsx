import React from "react";
import { SearchResult } from "../../../types/api";

interface DistrictCardProps {
  result: SearchResult;
  onClick: (result: SearchResult) => void;
}

export function DistrictCard({ result, onClick }: DistrictCardProps) {
  // 행정구역 데이터 디버깅
  React.useEffect(() => {
    console.log("🏛️ DistrictCard - 행정구역 데이터:", result);
  }, [result]);

  return (
    <div
      onClick={() => onClick(result)}
      style={{
        padding: "12px",
        border: "1px solid #fff3e0",
        borderRadius: "8px",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor: "#fffbf5",
        transition: "all 0.2s",
        borderLeft: "4px solid #ff9800",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#fff3e0";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 152, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#fffbf5";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <span style={{ fontSize: "16px", marginRight: "8px" }}>🏛️</span>
        <span
          style={{ fontSize: "10px", color: "#ff9800", fontWeight: "bold" }}
        >
          행정구역
        </span>
      </div>
      <div
        style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}
      >
        {result.title || "알 수 없는 행정구역"}
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
        {result.address?.road || result.address?.parcel || "주소 정보 없음"}
      </div>
      {result.district && (
        <div style={{ fontSize: "10px", color: "#999" }}>
          행정구역: {result.district}
        </div>
      )}
    </div>
  );
}
