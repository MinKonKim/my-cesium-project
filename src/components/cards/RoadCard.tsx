import React from "react";

interface RoadCardProps {
  result: any;
  onClick: (result: any) => void;
}

export function RoadCard({ result, onClick }: RoadCardProps) {
  // 도로 데이터 디버깅
  React.useEffect(() => {
    console.log("🛣️ RoadCard - 도로 데이터:", result);
  }, [result]);

  return (
    <div
      onClick={() => onClick(result)}
      style={{
        padding: "12px",
        border: "1px solid #e8f5e8",
        borderRadius: "8px",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor: "#f8fff8",
        transition: "all 0.2s",
        borderLeft: "4px solid #4caf50",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e8f5e8";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(76, 175, 80, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#f8fff8";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <span style={{ fontSize: "16px", marginRight: "8px" }}>🛣️</span>
        <span
          style={{ fontSize: "10px", color: "#4caf50", fontWeight: "bold" }}
        >
          도로명
        </span>
      </div>
      <div
        style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}
      >
        {result.name || "알 수 없는 도로"}
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
        {result.address || "주소 정보 없음"}
      </div>
      {result.roadType && (
        <div style={{ fontSize: "10px", color: "#999" }}>
          도로 유형: {result.roadType}
        </div>
      )}
    </div>
  );
}
