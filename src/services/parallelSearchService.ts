const VWORLD_KEY =
  process.env.REACT_APP_VWORLD_KEY || "CB8912F1-3A08-318D-9471-81A04D8D3B38";

// 개별 검색 API 호출
const searchVWorldAPI = async (
  query: string,
  type: string,
  page: number = 1,
  size: number = 10
): Promise<any[]> => {
  const url = `/vworld/req/search?service=search&request=search&version=2.0&type=${type}&format=json&errorformat=json&crs=EPSG:4326&page=${page}&size=${size}&query=${encodeURIComponent(
    query
  )}&key=${VWORLD_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("검색 API 호출 실패");
    }

    const responseText = await response.text();
    const data = JSON.parse(responseText);

    if (data.response && data.response.result && data.response.result.items) {
      const results = data.response.result.items.map((item: any) => ({
        zipcode: item.address?.zipcode || "",
        name: item.address?.bldnm || item.address?.road || "알 수 없는 장소",
        address: item.address?.road || item.address?.parcel || "",
        x: parseFloat(item.point?.x || 0),
        y: parseFloat(item.point?.y || 0),
        type: type, // 검색 타입 추가
      }));

      // address 기준으로 중복 제거
      const uniqueResults = results.filter(
        (item: any, index: number, self: any[]) =>
          index === self.findIndex((t) => t.address === item.address)
      );

      return uniqueResults;
    }

    return [];
  } catch (error) {
    console.error(`VWorld API ${type} 검색 오류:`, error);
    return [];
  }
};

// 병렬 검색 실행
export const searchAllTypes = async (query: string) => {
  console.log(`🔍 병렬 검색 시작: "${query}"`);

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

    console.log(`📊 병렬 검색 완료:`, {
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
