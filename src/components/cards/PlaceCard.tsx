import React from "react";
import { SearchResult } from "../../../types/api";

interface PlaceCardProps {
  result: SearchResult;
  onClick: (result: SearchResult) => void;
}

export function PlaceCard({ result, onClick }: PlaceCardProps) {
  return (
    <div
      onClick={() => onClick(result)}
      style={{
        padding: "12px",
        border: "1px solid #e3f2fd",
        borderRadius: "8px",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor: "#f8f9ff",
        transition: "all 0.2s",
        borderLeft: "4px solid #2196f3",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e3f2fd";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(33, 150, 243, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#f8f9ff";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <span style={{ fontSize: "16px", marginRight: "8px" }}>🏢</span>
        <span
          style={{ fontSize: "10px", color: "#2196f3", fontWeight: "bold" }}
        >
          장소명
        </span>
      </div>
      <div
        style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}
      >
        {result.title || "알 수 없는 장소"}
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
        {result.address?.road || result.address?.parcel || "주소 정보 없음"}
      </div>
      {result.category && (
        <div style={{ fontSize: "10px", color: "#999" }}>
          카테고리: {result.category}
        </div>
      )}
    </div>
  );
}
