import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAllTypes } from "../services/parallelSearchService";
import { SearchResult } from "../../types/api";
import { useDebounce } from "./useDebounce";

export const useOptimizedSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
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
    queryKey: ["optimizedSearch", debouncedSearchQuery, activeTab],
    queryFn: () => searchAllTypes(debouncedSearchQuery),
    enabled: debouncedSearchQuery.trim().length > 0,
    staleTime: 3 * 1000, // 3초 디바운스
    gcTime: 5 * 60 * 1000, // 5분 캐시 유지
  });

  // React Query를 통한 API 호출 결과만 콘솔에 표시
  React.useEffect(() => {
    if (searchResults) {
      console.log("🔍 React Query API 호출 결과:", {
        query: debouncedSearchQuery,
        activeTab,
        results: {
          place: searchResults.place?.length || 0,
          road: searchResults.road?.length || 0,
          district: searchResults.district?.length || 0,
          address: searchResults.address?.length || 0,
          total: searchResults.total,
        },
      });
    }
  }, [searchResults, activeTab, debouncedSearchQuery]);

  // 임시 결과 표시 (검색어 입력 중)
  const tempResults: SearchResult[] =
    searchQuery.trim() && searchResults?.total === 0 && isSearching
      ? [
          {
            id: "loading",
            title: `${searchQuery} 검색 중...`,
            district: "",
            category: "",
            geometry: "",
            address: {
              zipcode: "",
              road: "검색 결과를 불러오는 중입니다",
              parcel: "",
              category: "",
              bldnm: "",
              bldnmdc: "",
            },
            point: {
              x: "0",
              y: "0",
            },
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
