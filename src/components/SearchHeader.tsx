import React from "react";

interface SearchHeaderProps {
  onClose: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
        장소 검색
      </h3>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#666",
        }}
      >
        ×
      </button>
    </div>
  );
};
