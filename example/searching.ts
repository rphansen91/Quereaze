export const API_URL = "https://api.antengo.com/supplylisting/rpc"

export interface Listing {
    id: string;
    title: string;
    price: string;
}

export interface SearchParams {
    // REQUIRED
    longitude?: number;
    latitude?: number;

    // OPTIONAL TO SET
    q?: string;
    categoryGroupId?: number;
    minPrice?: number;
    maxPrice?: number;
    
    distanceStart?: number;
    distance?: number;
    shippable?: number;
    membershipType?: number;

    // NEVER SET
    dataSourceId?: number;
    categoryId?: number;
    page?: number;
    hasPhoto?: boolean;
}

export const DefaultSearchParams: SearchParams = {
    q: "",
    latitude: 0,
    longitude: 0,
    categoryGroupId: 0,
    minPrice: 0,
    maxPrice: 0,
    distanceStart: 0,
    distance: 25000,
    shippable: 1,
    membershipType: 5,
    dataSourceId: 0,
    categoryId: 0,
    page: 1,
    hasPhoto: true
}