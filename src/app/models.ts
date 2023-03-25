export interface DataPoint {
    year: number;
    count: number;
    countryID: string;
}
    
export interface CountryData {
    countryID: string;
}

export interface WorldData {
    type: string;
    features: CountryData[];
}