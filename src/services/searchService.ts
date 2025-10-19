import { SearchResult } from "../hooks/useSearch";

const VWORLD_KEY =
  process.env.REACT_APP_VWORLD_KEY || "CB8912F1-3A08-318D-9471-81A04D8D3B38";

export const searchVWorldAPI = async (
  query: string
): Promise<SearchResult[]> => {
  const url = `/vworld/req/search?service=search&request=search&version=2.0&type=address&category=road&format=json&errorformat=json&crs=EPSG:4326&page=1&size=10&query=${encodeURIComponent(
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
      return data.response.result.items.map((item: any) => ({
        zipcode: item.address?.zipcode || "",
        name: item.address?.bldnm || item.address?.road || "알 수 없는 장소",
        address: item.address?.road || item.address?.parcel || "",
        x: parseFloat(item.point?.x || 0),
        y: parseFloat(item.point?.y || 0),
      }));
    }

    return [];
  } catch (error) {
    console.error("VWorld API 검색 오류:", error);
    return [];
  }
};
