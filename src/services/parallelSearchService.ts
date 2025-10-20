import { SearchResult, VWorldSearchResponse } from "../../types/api";

const VWORLD_KEY: string = process.env.REACT_APP_VWORLD_KEY as string;

// 개별 검색 API 호출
const searchVWorldAPI = async (
  query: string,
  type: string,
  page: number = 1,
  size: number = 10
): Promise<SearchResult[]> => {
  const url = `/vworld/req/search?service=search&request=search&version=2.0&type=${type}&format=json&errorformat=json&crs=EPSG:4326&page=${page}&size=${size}&query=${encodeURIComponent(
    query
  )}&key=${VWORLD_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("검색 API 호출 실패");
    }

    const responseText = await response.text();
    const data: VWorldSearchResponse = JSON.parse(responseText);

    if (data.response && data.response.result && data.response.result.items) {
      // API 응답에서 개별 아이템들을 추출하여 SearchResult[] 형태로 반환
      const searchItems: SearchResult[] = data.response.result.items.map(
        (item: any) => ({
          id: item.id,
          title: item.title,
          geometry: item.geometry,
          point: {
            x: item.point.x, // 문자열로 유지
            y: item.point.y, // 문자열로 유지
          },
          // 타입별 추가 필드들
          district: item.district,
          category: item.category,
          address: item.address
            ? {
                zipcode: item.address.zipcode,
                road: item.address.road,
                parcel: item.address.parcel,
                category: item.address.category,
                bldnm: item.address.bldnm,
                bldnmdc: item.address.bldnmdc,
              }
            : undefined,
        })
      );

      // title 기준으로 중복 제거
      const uniqueItems = searchItems.filter(
        (item: SearchResult, index: number, self: SearchResult[]) =>
          index === self.findIndex((t) => t.title === item.title)
      );

      return uniqueItems;
    }

    return [];
  } catch (error) {
    console.error(`VWorld API ${type} 검색 오류:`, error);
    return [];
  }
};

// 병렬 검색 실행
export const searchAllTypes = async (query: string) => {
  console.log(`🔍 React Query - 병렬 검색 시작: "${query}"`);

  try {
    const [placeResults, roadResults, districtResults, addressResults] =
      await Promise.all([
        searchVWorldAPI(query, "place"),
        searchVWorldAPI(query, "road"),
        searchVWorldAPI(query, "district"),
        searchVWorldAPI(query, "address"),
      ]);

    const totalResults =
      placeResults.length +
      roadResults.length +
      districtResults.length +
      addressResults.length;

    console.log(`📊 React Query - 병렬 검색 완료:`, {
      query,
      place: placeResults.length,
      road: roadResults.length,
      district: districtResults.length,
      address: addressResults.length,
      total: totalResults,
    });

    return {
      place: placeResults,
      road: roadResults,
      district: districtResults,
      address: addressResults,
      total: totalResults,
    };
  } catch (error) {
    console.error("병렬 검색 오류:", error);
    return {
      place: [],
      road: [],
      district: [],
      address: [],
      total: 0,
    };
  }
};
