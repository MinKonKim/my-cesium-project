import { useState, useEffect, useCallback } from "react";

// EPSG:900913 좌표를 WGS84로 변환하는 함수
// const transformCoordinates = (
//   x: number,
//   y: number
// ): { x: number; y: number } => {
//   // EPSG:900913 (Web Mercator) to WGS84 변환
//   const lon = (x / 20037508.34) * 180;
//   const lat =
//     Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / 20037508.34))) *
//     (180 / Math.PI);

//   return { x: lon, y: lat };
// };

export interface SearchResult {
  zipcode: string;
  name: string;
  address: string;
  x: number;
  y: number;
}

// VWorld 주소 검색 API 호출
const searchVWorldAPI = async (query: string): Promise<SearchResult[]> => {
  const VWORLD_KEY: string = process.env.REACT_APP_VMAP_API_KEYs || "";
  const url = `/vworld/req/search?service=search&request=search&version=2.0&type=address&category=road&format=json&errorformat=json&crs=EPSG:4326&page=1&size=10&query=${encodeURIComponent(
    query
  )}&key=${VWORLD_KEY}`;

  try {
    // VWorld 주소 검색 API 호출
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("검색 API 호출 실패");
    }

    // 응답 내용 확인 (디버깅용)
    const responseText = await response.text();
    console.log("API 응답:", responseText);

    // JSON 파싱 시도
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("JSON 파싱 실패:", error);
      console.log("응답 내용:", responseText);
      throw new Error("API가 JSON이 아닌 응답을 반환했습니다");
    }

    if (data.response && data.response.result && data.response.result.items) {
      // VWorld API 응답 구조에 맞게 수정
      return data.response.result.items.map((item: any) => {
        return {
          zipcode: item.address?.zipcode || "",
          name: item.address?.bldnm || item.address?.road || "알 수 없는 장소",
          address: item.address?.road || item.address?.parcel || "",
          x: parseFloat(item.point?.x || 0),
          y: parseFloat(item.point?.y || 0),
        };
      });
    }

    return [];
  } catch (error) {
    console.log(query);
    console.error("VWorld API 검색 오류:", error);
    // API 실패 시 빈 배열 반환
    return [];
  }
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [tempResults, setTempResults] = useState<SearchResult[]>([]);

  // 디바운스된 검색 함수
  const debouncedSearch = useCallback((query: string) => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        try {
          const results = await searchVWorldAPI(query);
          setSearchResults(results);
        } catch (error) {
          console.error("검색 오류:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 3000); // 3초로 변경

    return () => clearTimeout(timeoutId);
  }, []);

  // 검색어 변경 시 디바운스된 검색 실행
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // 임시 결과 표시 (검색어 입력 중)
  useEffect(() => {
    if (searchQuery.trim() && searchResults.length === 0 && !isSearching) {
      setTempResults([
        {
          zipcode: "",
          name: `${searchQuery} 검색 중...`,
          address: "검색 결과를 불러오는 중입니다",
          x: 0,
          y: 0,
        },
      ]);
    } else {
      setTempResults([]);
    }
  }, [searchQuery, searchResults.length, isSearching]);

  // 즉시 검색 실행
  const handleImmediateSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const results = await searchVWorldAPI(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("검색 오류:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    tempResults,
    isSearching,
    handleImmediateSearch,
  };
};
