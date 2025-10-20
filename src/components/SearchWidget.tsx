import React from "react";
import { useOptimizedSearch } from "../hooks/useOptimizedSearch";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";
import { TabBasedResults } from "./TabBasedResults";

interface SearchWidgetProps {
  onClose: () => void;
  onLocationSelect?: (x: number, y: number, name: string) => void;
}

export function SearchWidget({ onClose, onLocationSelect }: SearchWidgetProps) {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    searchResults,
    tempResults,
    isSearching,
    handleImmediateSearch,
  } = useOptimizedSearch();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleImmediateSearch();
    }
  };

  const handleResultClick = (result: any) => {
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
          width: "400px",
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

        <TabBasedResults
          searchResults={searchResults}
          tempResults={tempResults}
          activeTab={activeTab}
          onResultClick={handleResultClick}
          isSearching={isSearching}
          onTabChange={setActiveTab}
        />
      </div>
    </>
  );
}
