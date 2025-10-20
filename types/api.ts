export type SearchResult = {
  crs: string;
  type: string;
  items: {
    item: {
      id: string;
      title?: string;
      district?: string;
      category?: string;
      geometry?: string;
      address: {
        zipcode?: string;
        road: string;
        parcel: string;
        category?: string;
        bldnm?: string;
        bldnmdc?: string;
      };
      point: {
        x: number;
        y: number;
      };
    };
  };
};

export type SearchResponse = {
  service;
};
