import React from "react";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { SearchResult } from "../hooks/useSearch";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

interface SearchWidgetProps {
  onClose: () => void;
  onLocationSelect?: (x: number, y: number, name: string) => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  onClose,
  onLocationSelect,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    tempResults,
    isSearching,
    handleImmediateSearch,
  } = useSearchQuery();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleImmediateSearch();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onLocationSelect && result.x !== 0 && result.y !== 0) {
      onLocationSelect(result.x, result.y, result.name);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "350px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
          padding: "16px",
        }}
      >
        <SearchHeader onClose={onClose} />

        <SearchInput
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onKeyPress={handleKeyPress}
          isSearching={isSearching}
        />

        <SearchResults
          searchResults={searchResults}
          tempResults={tempResults}
          onResultClick={handleResultClick}
          isSearching={isSearching}
        />
      </div>
    </>
  );
};
