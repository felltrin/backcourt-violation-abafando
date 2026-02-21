export interface RideType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  eta: string;
  priceMultiplier: number;
  basePrice: number;
  icon: "car" | "car-front" | "crown" | "users" | "zap";
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface SavedPlace {
  id: string;
  name: string;
  address: string;
  icon: "home" | "briefcase" | "star";
}

export interface RideHistory {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  price: string;
  driverName: string;
  driverRating: number;
  vehicleType: string;
  status: "completed" | "cancelled";
  duration: string;
  distance: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  trips: number;
  vehicle: string;
  licensePlate: string;
  eta: number;
  avatarInitials: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
}

export const rideTypes: RideType[] = [
  {
    id: "uberx",
    name: "UberX",
    description: "Affordable, everyday rides",
    capacity: 4,
    eta: "3 min",
    priceMultiplier: 1,
    basePrice: 12.5,
    icon: "car",
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Newer cars with extra legroom",
    capacity: 4,
    eta: "5 min",
    priceMultiplier: 1.4,
    basePrice: 17.5,
    icon: "car-front",
  },
  {
    id: "uberxl",
    name: "UberXL",
    description: "Affordable rides for groups up to 6",
    capacity: 6,
    eta: "8 min",
    priceMultiplier: 1.8,
    basePrice: 22.5,
    icon: "users",
  },
  {
    id: "black",
    name: "Black",
    description: "Premium rides in luxury cars",
    capacity: 4,
    eta: "6 min",
    priceMultiplier: 2.5,
    basePrice: 31.25,
    icon: "crown",
  },
  {
    id: "green",
    name: "Green",
    description: "Electric & hybrid vehicles",
    capacity: 4,
    eta: "7 min",
    priceMultiplier: 1.1,
    basePrice: 13.75,
    icon: "zap",
  },
];

export const savedPlaces: SavedPlace[] = [
  {
    id: "home",
    name: "Home",
    address: "742 Evergreen Terrace, Springfield",
    icon: "home",
  },
  {
    id: "work",
    name: "Work",
    address: "1600 Amphitheatre Pkwy, Mountain View",
    icon: "briefcase",
  },
  {
    id: "gym",
    name: "Downtown Gym",
    address: "455 Market St, San Francisco",
    icon: "star",
  },
];

export const recentLocations: Location[] = [
  {
    id: "loc1",
    name: "San Francisco Airport (SFO)",
    address: "San Francisco, CA 94128",
    lat: 37.6213,
    lng: -122.379,
  },
  {
    id: "loc2",
    name: "Union Square",
    address: "333 Post St, San Francisco, CA",
    lat: 37.7879,
    lng: -122.4074,
  },
  {
    id: "loc3",
    name: "Golden Gate Park",
    address: "501 Stanyan St, San Francisco, CA",
    lat: 37.7694,
    lng: -122.4862,
  },
  {
    id: "loc4",
    name: "Pier 39",
    address: "Beach St & The Embarcadero, SF",
    lat: 37.8087,
    lng: -122.4098,
  },
  {
    id: "loc5",
    name: "Oracle Park",
    address: "24 Willie Mays Plaza, SF, CA",
    lat: 37.7786,
    lng: -122.3893,
  },
];

export const rideHistory: RideHistory[] = [
  {
    id: "ride1",
    date: "Feb 18, 2026",
    pickup: "742 Evergreen Terrace",
    dropoff: "San Francisco Airport (SFO)",
    price: "$42.30",
    driverName: "Marcus J.",
    driverRating: 4.92,
    vehicleType: "UberX",
    status: "completed",
    duration: "38 min",
    distance: "14.2 mi",
  },
  {
    id: "ride2",
    date: "Feb 16, 2026",
    pickup: "1600 Amphitheatre Pkwy",
    dropoff: "Union Square",
    price: "$28.15",
    driverName: "Sarah L.",
    driverRating: 4.97,
    vehicleType: "Comfort",
    status: "completed",
    duration: "25 min",
    distance: "9.8 mi",
  },
  {
    id: "ride3",
    date: "Feb 14, 2026",
    pickup: "Pier 39",
    dropoff: "Golden Gate Park",
    price: "$18.60",
    driverName: "David K.",
    driverRating: 4.85,
    vehicleType: "UberX",
    status: "completed",
    duration: "18 min",
    distance: "5.3 mi",
  },
  {
    id: "ride4",
    date: "Feb 12, 2026",
    pickup: "Oracle Park",
    dropoff: "742 Evergreen Terrace",
    price: "$0.00",
    driverName: "Michael R.",
    driverRating: 4.78,
    vehicleType: "UberXL",
    status: "cancelled",
    duration: "-",
    distance: "-",
  },
  {
    id: "ride5",
    date: "Feb 10, 2026",
    pickup: "Downtown Gym",
    dropoff: "Home",
    price: "$15.40",
    driverName: "Elena V.",
    driverRating: 4.95,
    vehicleType: "Green",
    status: "completed",
    duration: "14 min",
    distance: "4.1 mi",
  },
  {
    id: "ride6",
    date: "Feb 8, 2026",
    pickup: "Union Square",
    dropoff: "San Francisco Airport (SFO)",
    price: "$52.80",
    driverName: "James T.",
    driverRating: 4.88,
    vehicleType: "Black",
    status: "completed",
    duration: "32 min",
    distance: "13.5 mi",
  },
];

export const mockDriver: Driver = {
  id: "driver1",
  name: "Marcus J.",
  rating: 4.92,
  trips: 3847,
  vehicle: "Toyota Camry",
  licensePlate: "7ABC123",
  eta: 3,
  avatarInitials: "MJ",
};

export const promotions: Promotion[] = [
  {
    id: "promo1",
    title: "50% off next ride",
    description: "Get 50% off your next UberX ride, up to $10",
    code: "SAVE50",
    discount: "50%",
  },
  {
    id: "promo2",
    title: "Free ride to airport",
    description: "Free ride to SFO, up to $40 value",
    code: "FLYAWAY",
    discount: "100%",
  },
  {
    id: "promo3",
    title: "$5 off Comfort",
    description: "$5 off your next Comfort ride",
    code: "COMFORT5",
    discount: "$5",
  },
];

export const searchSuggestions: Location[] = [
  {
    id: "sug1",
    name: "Fisherman's Wharf",
    address: "Jefferson St, San Francisco, CA",
    lat: 37.808,
    lng: -122.4177,
  },
  {
    id: "sug2",
    name: "Chinatown Gate",
    address: "Grant Ave & Bush St, SF, CA",
    lat: 37.7908,
    lng: -122.4058,
  },
  {
    id: "sug3",
    name: "Twin Peaks",
    address: "501 Twin Peaks Blvd, SF, CA",
    lat: 37.7544,
    lng: -122.4477,
  },
  {
    id: "sug4",
    name: "Ghirardelli Square",
    address: "900 North Point St, SF, CA",
    lat: 37.8059,
    lng: -122.4228,
  },
];
