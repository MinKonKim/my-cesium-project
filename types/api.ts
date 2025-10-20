// 개별 검색 아이템 (실제 사용하는 단위)
export type SearchItem = {
  id: string;
  title: string;
  geometry?: string;
  point: {
    x: string; // API에서 문자열로 제공
    y: string; // API에서 문자열로 제공
  };
  // 타입별로 다른 필드들 (선택적)
  district?: string;
  category?: string;
  address?: {
    zipcode?: string;
    road?: string;
    parcel?: string;
    category?: string;
    bldnm?: string;
    bldnmdc?: string;
  };
};

// VWorld API 응답의 result 부분 (원본 구조)
export type VWorldSearchResult = {
  crs: string;
  type: string;
  items: SearchItem[];
};

// 컴포넌트에서 사용하는 검색 결과 (단일 아이템)
export type SearchResult = SearchItem;

// 전체 API 응답 구조
export type VWorldSearchResponse = {
  response: {
    service: {
      name: string;
      version: string;
      operation: string;
      time: string;
    };
    status: string;
    record: {
      total: string;
      current: string;
    };
    page: {
      total: string;
      current: string;
      size: string;
    };
    result: VWorldSearchResult;
  };
};
