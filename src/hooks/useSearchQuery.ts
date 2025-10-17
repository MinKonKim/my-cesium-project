import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchVWorldAPI } from "../services/searchService";
import { SearchResult } from "./useSearch";

//TODO : 장소, 도로명 검색 추가
export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: searchResults = [],
    isLoading: isSearching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchVWorldAPI(searchQuery),
    enabled: searchQuery.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 임시 결과 표시 (검색어 입력 중)
  const tempResults: SearchResult[] =
    searchQuery.trim() && searchResults.length === 0 && isSearching
      ? [
          {
            zipcode: "",
            name: `${searchQuery} 검색 중...`,
            address: "검색 결과를 불러오는 중입니다",
            x: 0,
            y: 0,
          },
        ]
      : [];

  // 즉시 검색 실행
  const handleImmediateSearch = () => {
    if (searchQuery.trim()) {
      refetch();
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    tempResults,
    isSearching,
    error,
    handleImmediateSearch,
  };
};
