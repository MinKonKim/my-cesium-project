import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAllTypes } from "../services/parallelSearchService";

export const useOptimizedSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 활성 탭에 따라 필요한 API만 호출하는 조건 설정
  const shouldFetchPlace = activeTab === "all" || activeTab === "place";
  const shouldFetchRoad = activeTab === "all" || activeTab === "road";
  const shouldFetchDistrict = activeTab === "all" || activeTab === "district";
  const shouldFetchAddress = activeTab === "all" || activeTab === "address";

  const {
    data: searchResults,
    isLoading: isSearching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["optimizedSearch", searchQuery, activeTab],
    queryFn: () => searchAllTypes(searchQuery),
    enabled: searchQuery.trim().length > 0,
    staleTime: 3 * 1000, // 3초 디바운스
    gcTime: 5 * 60 * 1000, // 5분 캐시 유지
  });

  // API 호출 결과 디버깅
  React.useEffect(() => {
    if (searchResults) {
      console.log("🔍 useOptimizedSearch - API 호출 결과:", {
        activeTab,
        searchQuery,
        place: searchResults.place,
        road: searchResults.road,
        district: searchResults.district,
        address: searchResults.address,
        total: searchResults.total,
      });
    }
  }, [searchResults, activeTab, searchQuery]);

  // 임시 결과 표시 (검색어 입력 중)
  const tempResults =
    searchQuery.trim() && searchResults?.total === 0 && isSearching
      ? [
          {
            zipcode: "",
            name: `${searchQuery} 검색 중...`,
            address: "검색 결과를 불러오는 중입니다",
            x: 0,
            y: 0,
            type: "loading",
          },
        ]
      : [];

  // 즉시 검색 실행
  const handleImmediateSearch = () => {
    if (searchQuery.trim()) {
      refetch();
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab: handleTabChange,
    searchResults,
    tempResults,
    isSearching,
    error,
    handleImmediateSearch,
    // 최적화 조건들
    shouldFetchPlace,
    shouldFetchRoad,
    shouldFetchDistrict,
    shouldFetchAddress,
  };
};
