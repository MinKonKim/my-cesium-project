import React from "react";

interface AddressCardProps {
  result: any;
  onClick: (result: any) => void;
}

export function AddressCard({ result, onClick }: AddressCardProps) {
  // 주소 데이터 디버깅
  React.useEffect(() => {
    console.log("📍 AddressCard - 주소 데이터:", result);
  }, [result]);

  return (
    <div
      onClick={() => onClick(result)}
      style={{
        padding: "12px",
        border: "1px solid #fce4ec",
        borderRadius: "8px",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor: "#fef7f9",
        transition: "all 0.2s",
        borderLeft: "4px solid #e91e63",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#fce4ec";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#fef7f9";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <span style={{ fontSize: "16px", marginRight: "8px" }}>📍</span>
        <span
          style={{ fontSize: "10px", color: "#e91e63", fontWeight: "bold" }}
        >
          주소
        </span>
      </div>
      <div
        style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}
      >
        {result.name || "알 수 없는 주소"}
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
        {result.address || "주소 정보 없음"}
      </div>
      {result.zipcode && (
        <div style={{ fontSize: "10px", color: "#999" }}>
          우편번호: {result.zipcode}
        </div>
      )}
    </div>
  );
}
