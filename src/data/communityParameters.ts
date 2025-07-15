// communityParameters.ts

export interface WaterParameters {
    ph: number;
    kh: number; // dKH
    gh: number; // dGH
}

export interface CommunityData {
    name: string;
    parameters: WaterParameters;
}

// DISCLAIMER: These are example values. Actual tap water parameters can vary greatly
// within a region/city and may differ from these examples. Always recommend
// testing local tap water for accurate results.
export const COMMUNITY_WATER_PARAMETERS: CommunityData[] = [
    { "name": "Álava", "parameters": { "ph": 7.0, "kh": 4, "gh": 6 } },
    { "name": "Albacete", "parameters": { "ph": 7.8, "kh": 9, "gh": 12 } },
    { "name": "Alicante", "parameters": { "ph": 8.0, "kh": 10, "gh": 14 } },
    { "name": "Almería", "parameters": { "ph": 7.9, "kh": 10, "gh": 13 } },
    { "name": "Asturias", "parameters": { "ph": 6.8, "kh": 4, "gh": 5 } },
    { "name": "Ávila", "parameters": { "ph": 7.5, "kh": 8, "gh": 10 } },
    { "name": "Badajoz", "parameters": { "ph": 7.8, "kh": 9, "gh": 12 } },
    { "name": "Barcelona", "parameters": { "ph": 7.6, "kh": 8, "gh": 12 } },
    { "name": "Burgos", "parameters": { "ph": 7.3, "kh": 6, "gh": 8 } },
    { "name": "Cáceres", "parameters": { "ph": 7.7, "kh": 8, "gh": 11 } },
    { "name": "Cádiz", "parameters": { "ph": 7.9, "kh": 10, "gh": 14 } },
    { "name": "Cantabria", "parameters": { "ph": 6.9, "kh": 4, "gh": 6 } },
    { "name": "Castellón", "parameters": { "ph": 7.8, "kh": 9, "gh": 13 } },
    { "name": "Ceuta", "parameters": { "ph": 7.8, "kh": 9, "gh": 13 } },
    { "name": "Ciudad Real", "parameters": { "ph": 7.6, "kh": 8, "gh": 11 } },
    { "name": "Córdoba", "parameters": { "ph": 7.9, "kh": 10, "gh": 14 } },
    { "name": "Cuenca", "parameters": { "ph": 7.5, "kh": 8, "gh": 10 } },
    { "name": "Girona", "parameters": { "ph": 7.4, "kh": 7, "gh": 10 } },
    { "name": "Granada", "parameters": { "ph": 7.8, "kh": 9, "gh": 12 } },
    { "name": "Guadalajara", "parameters": { "ph": 7.5, "kh": 8, "gh": 11 } },
    { "name": "Guipúzcoa", "parameters": { "ph": 6.9, "kh": 4, "gh": 6 } },
    { "name": "Huelva", "parameters": { "ph": 7.8, "kh": 9, "gh": 13 } },
    { "name": "Huesca", "parameters": { "ph": 7.2, "kh": 6, "gh": 9 } },
    { "name": "Islas Baleares", "parameters": { "ph": 7.9, "kh": 9, "gh": 12 } },
    { "name": "Jaén", "parameters": { "ph": 7.8, "kh": 9, "gh": 13 } },
    { "name": "La Coruña", "parameters": { "ph": 6.8, "kh": 3, "gh": 5 } },
    { "name": "La Rioja", "parameters": { "ph": 7.3, "kh": 6, "gh": 9 } },
    { "name": "Las Palmas", "parameters": { "ph": 7.7, "kh": 8, "gh": 11 } },
    { "name": "León", "parameters": { "ph": 7.0, "kh": 5, "gh": 8 } },
    { "name": "Lérida", "parameters": { "ph": 7.4, "kh": 7, "gh": 10 } },
    { "name": "Lugo", "parameters": { "ph": 6.9, "kh": 4, "gh": 6 } },
    { "name": "Madrid", "parameters": { "ph": 7.5, "kh": 8, "gh": 11 } },
    { "name": "Málaga", "parameters": { "ph": 7.8, "kh": 9, "gh": 13 } },
    { "name": "Melilla", "parameters": { "ph": 7.8, "kh": 9, "gh": 13 } },
    { "name": "Murcia", "parameters": { "ph": 8.0, "kh": 10, "gh": 14 } },
    { "name": "Navarra", "parameters": { "ph": 7.1, "kh": 5, "gh": 8 } },
    { "name": "Ourense", "parameters": { "ph": 6.9, "kh": 4, "gh": 6 } },
    { "name": "Palencia", "parameters": { "ph": 7.2, "kh": 6, "gh": 9 } },
    { "name": "Pontevedra", "parameters": { "ph": 6.8, "kh": 3, "gh": 5 } },
    { "name": "Salamanca", "parameters": { "ph": 7.3, "kh": 6, "gh": 9 } },
    { "name": "Santa Cruz de Tenerife", "parameters": { "ph": 7.7, "kh": 8, "gh": 11 } },
    { "name": "Segovia", "parameters": { "ph": 7.4, "kh": 7, "gh": 10 } },
    { "name": "Sevilla", "parameters": { "ph": 7.9, "kh": 10, "gh": 14 } },
    { "name": "Soria", "parameters": { "ph": 7.2, "kh": 6, "gh": 8 } },
    { "name": "Tarragona", "parameters": { "ph": 7.6, "kh": 8, "gh": 11 } },
    { "name": "Teruel", "parameters": { "ph": 7.3, "kh": 6, "gh": 9 } },
    { "name": "Toledo", "parameters": { "ph": 7.6, "kh": 8, "gh": 11 } },
    { "name": "Valencia", "parameters": { "ph": 7.9, "kh": 10, "gh": 14 } },
    { "name": "Valladolid", "parameters": { "ph": 7.4, "kh": 7, "gh": 10 } },
    { "name": "Vizcaya", "parameters": { "ph": 7.0, "kh": 4, "gh": 6 } },
    { "name": "Zamora", "parameters": { "ph": 7.3, "kh": 6, "gh": 9 } },
    { "name": "Zaragoza", "parameters": { "ph": 7.5, "kh": 8, "gh": 11 } }

];