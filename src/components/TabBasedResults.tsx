import React from "react";
import { PlaceCard, RoadCard, DistrictCard, AddressCard } from "./cards";
import { SearchResult } from "../../types/api";

interface TabBasedResultsProps {
  searchResults:
    | {
        place: SearchResult[];
        road: SearchResult[];
        district: SearchResult[];
        address: SearchResult[];
        total: number;
      }
    | undefined;
  tempResults: SearchResult[];
  activeTab: string;
  onResultClick: (result: SearchResult) => void;
  isSearching: boolean;
  onTabChange?: (tab: string) => void;
}

export function TabBasedResults({
  searchResults,
  tempResults,
  activeTab,
  onResultClick,
  isSearching,
  onTabChange,
}: TabBasedResultsProps) {
  const tabs = [
    { key: "all", label: "전체", count: searchResults?.total || 0 },
    { key: "place", label: "장소", count: searchResults?.place?.length || 0 },
    { key: "road", label: "도로", count: searchResults?.road?.length || 0 },
    {
      key: "district",
      label: "행정구역",
      count: searchResults?.district?.length || 0,
    },
    {
      key: "address",
      label: "주소",
      count: searchResults?.address?.length || 0,
    },
  ];

  const renderResultsByTab = () => {
    if (tempResults.length > 0) {
      return tempResults.map((result, index) => (
        <div
          key={index}
          style={{ padding: "12px", textAlign: "center", color: "#666" }}
        >
          {result.title}
        </div>
      ));
    }

    switch (activeTab) {
      case "place":
        return (
          searchResults?.place?.map((result, index) => (
            <PlaceCard key={index} result={result} onClick={onResultClick} />
          )) || []
        );

      case "road":
        return (
          searchResults?.road?.map((result, index) => (
            <RoadCard key={index} result={result} onClick={onResultClick} />
          )) || []
        );

      case "district":
        return (
          searchResults?.district?.map((result, index) => (
            <DistrictCard key={index} result={result} onClick={onResultClick} />
          )) || []
        );

      case "address":
        return (
          searchResults?.address?.map((result, index) => (
            <AddressCard key={index} result={result} onClick={onResultClick} />
          )) || []
        );

      case "all":
      default:
        return [
          ...(searchResults?.place?.map((result, index) => (
            <PlaceCard
              key={`place-${index}`}
              result={result}
              onClick={onResultClick}
            />
          )) || []),
          ...(searchResults?.road?.map((result, index) => (
            <RoadCard
              key={`road-${index}`}
              result={result}
              onClick={onResultClick}
            />
          )) || []),
          ...(searchResults?.district?.map((result, index) => (
            <DistrictCard
              key={`district-${index}`}
              result={result}
              onClick={onResultClick}
            />
          )) || []),
          ...(searchResults?.address?.map((result, index) => (
            <AddressCard
              key={`address-${index}`}
              result={result}
              onClick={onResultClick}
            />
          )) || []),
        ];
    }
  };

  if (!searchResults && !tempResults.length && !isSearching) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
        주소를 입력하여 검색해보세요 (예: 서울시 강남구)
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* 탭 네비게이션 */}
      <div
        style={{
          display: "flex",
          gap: "5px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange?.(tab.key)}
            style={{
              padding: "8px 12px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: activeTab === tab.key ? "#007bff" : "#f8f9fa",
              color: activeTab === tab.key ? "white" : "#333",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeTab === tab.key ? "bold" : "normal",
              minWidth: "60px",
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* 검색 결과 리스트 */}
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {renderResultsByTab()}
      </div>
    </div>
  );
}
