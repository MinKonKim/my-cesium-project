import React from "react";
import { SearchResult } from "../hooks/useSearch";

interface SearchResultsProps {
  searchResults: SearchResult[];
  tempResults: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  isSearching: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  tempResults,
  onResultClick,
  isSearching,
}) => {
  const hasResults = searchResults.length > 0 || tempResults.length > 0;

  const seen = new Set();
  const uniqueResults = searchResults.filter(
    ({ zipcode }) => !seen.has(zipcode) && seen.add(zipcode)
  );

  if (!hasResults && !isSearching) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#999",
          fontSize: "12px",
          padding: "20px",
        }}
      >
        주소를 입력하여 검색해보세요 (예: 서울시 강남구)
      </div>
    );
  }

  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #eee",
        borderRadius: "4px",
      }}
    >
      {uniqueResults.map((result, index) => (
        <div
          key={index}
          onClick={() => onResultClick(result)}
          style={{
            padding: "12px",
            borderBottom:
              index < uniqueResults.length - 1 ? "1px solid #eee" : "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "4px" }}>
            {result.name}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {result.address}
          </div>
        </div>
      ))}
    </div>
  );
};
