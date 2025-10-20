import React from "react";

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isSearching: boolean;
}

export function SearchInput({
  searchQuery,
  onSearchQueryChange,
  onKeyPress,
  isSearching,
}: SearchInputProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="주소를 입력하세요 (예: 서울시 강남구)"
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
        {isSearching && (
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: "#f8f9fa",
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                border: "2px solid #007bff",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            검색중...
          </div>
        )}
      </div>
    </div>
  );
}
