export interface PropertyProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  neighborhood?: string;
  propertyType: 'apartment' | 'penthouse' | 'villa' | 'mansion' | 'duplex' | 'commercial' | 'estate' | 'shortlet' | 'office' | 'shop' | 'warehouse' | 'event-center' | 'bungalow';
  status: 'for-rent' | 'for-sale' | 'sold' | 'rented' | 'on-lease' | 'leased';

  bedrooms?: number;
  bathrooms?: number;
  hasSwimmingPool?: boolean;
  hasGarden?: boolean;
  hasParking?: boolean;
  parkingSpaces?: number;
  parkingType?: 'street' | 'car-park';
  squareFeet?: number;
  hasGym?: boolean;
  hasSpa?: boolean;
  businessNeighbors?: boolean;
  hasConcierge?: boolean;
  hasSecurity?: boolean;
  hasSmartHome?: boolean;
  hasWineCellar?: boolean;
  hasHomeTheater?: boolean;
  yearBuilt?: number;
  lotSize?: number;
  views?: string[];
  
  furnishing?: 'furnished' | 'semi-furnished' | 'unfurnished';
  hasBalcony?: boolean;
  hasAirConditioning?: boolean;
  hasWardrobes?: boolean;

  powerBackup?: 'generator' | 'inverter' | 'solar' | 'none';
  waterSource?: { available: boolean; type?: 'borehole' | 'municipal' | 'both' };
  internet?: boolean;

  agentFee?: { required: boolean; amount?: number };
  cautionFee?: { required: boolean; amount?: number };
  legalFee?: { required: boolean; amount?: number };
  maintenanceFee?: { required: boolean; amount?: number };

  featuredImage: string;
  images?: string[];
  videoTour?: string;

  coordinates?: { lat: number; lng: number };
  landmarks?: string[];
  nearbyAmenities?: string[];

  agent: {
    name: string;
    company: string;
    phone?: string;
    image?: string;
    whatsappLink?: string;
  };

  legalDocumentsAvailable?: boolean;
  surveyPlans?: { available: boolean };

  relatedProperties?: PropertyProps[];
  reviews?: { rating: number; text: string; date: string; reviewer?: string }[];

  condition?: 'new' | 'renovated' | 'old';
  totalUnits?: number;
}


export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' ;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}