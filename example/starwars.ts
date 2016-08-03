export const STAR_WARS_URL = "//swapi.co/api/";

export interface SWarsParams {  
    people: boolean;
    films: boolean;
    planets: boolean;
    species: boolean;
    starships: boolean;
    vehicles: boolean;
}

export const DefaultSWarsParams: SWarsParams = {
    people: false,
    films: false,
    planets: false,
    species: false,
    starships: false,
    vehicles: false
}