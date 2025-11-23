import { PropertyProps } from './index';
import crypto from 'crypto';

// Secure ID generation function
function generateSecureId(title: string): string {
  const salt = process.env.ID_SALT || 'excellent-property-secure-salt-2024';
  const hash = crypto.createHash('sha256')
    .update(title + salt)
    .digest('hex')
    .substring(0, 12);
  return hash;
}

const propertiesWithoutIds = [
  {
    title: "Luxury 5-Bedroom Villa with Pool",
    description: "Stunning modern villa with panoramic views, premium finishes, and exclusive amenities in the heart of Lekki.",
    price: 280000000,
    location: "Lekki Phase 1",
    neighborhood: "Lekki",
    propertyType: "villa",
    status: "for-sale",
    bedrooms: 5,
    bathrooms: 4,
    hasSwimmingPool: true,
    hasGarden: true,
    hasParking: true,
    parkingSpaces: 4,
    squareFeet: 4500,
    hasGym: true,
    hasConcierge: true,
    hasSecurity: true,
    yearBuilt: 2020,
    totalUnits: 1,
    furnishing: "furnished",
    hasBalcony: true,
    hasAirConditioning: true,
    hasWardrobes: true,
    powerBackup: "generator",
    waterSource: { available: true, type: "borehole" },
    internet: true,
    agentFee: { required: true, amount: 8550000 },
    cautionFee: { required: true, amount: 5000000 },
    legalFee: { required: true, amount: 2000000 },
    maintenanceFee: { required: false },
    // 🎯 CORRECT: With properties folder
    featuredImage: "/assets/images/properties/villa/villa1.png",
    images: [
      "/assets/images/properties/villa/villa2.png",
      "/assets/images/properties/villa/villa3.png",
      "/assets/images/properties/villa/villa4.png"
    ],
    videoTour: "/assets/videos/villa-tour.mp4",
    coordinates: { lat: 6.435, lng: 3.594 },
    landmarks: ["Ikota Mall", "Lekki Conservation Centre"],
    nearbyAmenities: ["Schools", "Hospitals", "Shopping Mall", "Bus Stop"],
    agent: {
      name: "Chinonso Adebayo",
      company: "Elite Properties NG",
      phone: "+2348012345678",
      image: "/assets/images/agents/agent1.png",
      whatsappLink: "https://wa.me/2348012345678"
    },
    legalDocumentsAvailable: true,
    surveyPlans: { available: true },
    relatedProperties: [],
    reviews: [
      { rating: 5, text: "Amazing property, highly recommended!", date: "2025-11-01", reviewer: "Adaeze N." }
    ],
    condition: "new"
  },
  {
    title: "Modern 3-Bedroom Apartment",
    description: "Fully furnished apartment with modern interiors, ideal for families looking for comfort and convenience.",
    price: 120000000,
    location: "Ikota Estate",
    neighborhood: "Lekki",
    propertyType: "apartment",
    status: "for-rent",
    bedrooms: 3,
    bathrooms: 3,
    hasSwimmingPool: false,
    hasGarden: false,
    hasParking: true,
    parkingSpaces: 2,
    squareFeet: 1800,
    hasGym: true,
    hasConcierge: false,
    hasSecurity: true,
    yearBuilt: 2018,
    totalUnits: 10,
    furnishing: "furnished",
    hasBalcony: true,
    hasAirConditioning: true,
    hasWardrobes: true,
    powerBackup: "inverter",
    waterSource: { available: true, type: "municipal" },
    internet: true,
    agentFee: { required: false },
    cautionFee: { required: true, amount: 3000000 },
    legalFee: { required: false },
    maintenanceFee: { required: true, amount: 50000 },
    // 🎯 CORRECT: With properties folder
    featuredImage: "/assets/images/properties/apartment/apartment1.png",
    images: [
      "/assets/images/properties/apartment/apartment2.png",
      "/assets/images/properties/apartment/apartment3.png",
      "/assets/images/properties/apartment/apartment4.png"
    ],
    coordinates: { lat: 6.430, lng: 3.600 },
    landmarks: ["Lekki Gardens", "Shoprite Lekki"],
    nearbyAmenities: ["School", "Hospital", "Supermarket", "Bus Stop"],
    agent: {
      name: "Funke Adeyemi",
      company: "Lekki Homes",
      phone: "+2348023456789",
      image: "/assets/images/agents/agent2.png",
      whatsappLink: "https://wa.me/2348023456789"
    },
    legalDocumentsAvailable: true,
    surveyPlans: { available: false },
    relatedProperties: [],
    reviews: [
      { rating: 4, text: "Comfortable apartment with great security.", date: "2025-10-25", reviewer: "Confidence C." }
    ],
    condition: "renovated"
  },
  {
    title: "Executive 4-Bedroom Penthouse",
    description: "High-rise penthouse offering luxury living with breathtaking city views and premium amenities.",
    price: 320000000,
    location: "Victoria Island",
    neighborhood: "Lagos Island",
    propertyType: "penthouse",
    status: "on-lease",
    bedrooms: 4,
    bathrooms: 4,
    hasSwimmingPool: true,
    hasGarden: false,
    hasParking: true,
    parkingSpaces: 3,
    squareFeet: 3800,
    hasGym: true,
    hasConcierge: true,
    hasSecurity: true,
    yearBuilt: 2021,
    totalUnits: 1,
    furnishing: "semi-furnished",
    hasBalcony: true,
    hasAirConditioning: true,
    hasWardrobes: true,
    powerBackup: "generator",
    waterSource: { available: true, type: "both" },
    internet: true,
    agentFee: { required: true, amount: 9600000 },
    cautionFee: { required: true, amount: 5000000 },
    legalFee: { required: true, amount: 2500000 },
    maintenanceFee: { required: true, amount: 100000 },
    // 🎯 CORRECT: With properties folder
    featuredImage: "/assets/images/properties/penthouse/penthouse1.png",
    images: [
      "/assets/images/properties/penthouse/penthouse2.png",
      "/assets/images/properties/penthouse/penthouse3.png",
      "/assets/images/properties/penthouse/penthouse4.png"
    ],
    coordinates: { lat: 6.428, lng: 3.421 },
    landmarks: ["Lagos Marina", "Eko Hotel"],
    nearbyAmenities: ["School", "Hospital", "Shopping Mall"],
    agent: {
      name: "Tunde Oladipo",
      company: "Prime Estates",
      phone: "+2348034567890",
      image: "/assets/images/agents/agent3.png",
      whatsappLink: "https://wa.me/2348034567890"
    },
    legalDocumentsAvailable: true,
    surveyPlans: { available: true },
    relatedProperties: [],
    reviews: [
      { rating: 5, text: "Penthouse with an amazing view and facilities.", date: "2025-11-05", reviewer: "Adaeze N." }
    ],
    condition: "new"
  },
  {
    title: "Modern Office Space",
    description: "Spacious office with modern infrastructure, ideal for startups and corporate teams.",
    price: 50000000,
    location: "Ajah",
    neighborhood: "Lagos",
    propertyType: "office",
    status: "for-sale",
    bedrooms: 0,
    bathrooms: 2,
    hasSwimmingPool: false,
    hasGarden: false,
    hasParking: true,
    parkingSpaces: 5,
    squareFeet: 2500,
    hasGym: false,
    hasConcierge: false,
    hasSecurity: true,
    yearBuilt: 2019,
    totalUnits: 1,
    furnishing: "unfurnished",
    hasBalcony: false,
    hasAirConditioning: true,
    hasWardrobes: false,
    powerBackup: "inverter",
    waterSource: { available: true, type: "municipal" },
    internet: true,
    agentFee: { required: true, amount: 1500000 },
    cautionFee: { required: false },
    legalFee: { required: false },
    maintenanceFee: { required: true, amount: 50000 },
    // 🎯 CORRECT: With properties folder
    featuredImage: "/assets/images/properties/office/office1.png",
    images: [
      "/assets/images/properties/office/office2.png",
      "/assets/images/properties/office/office3.png",
      "/assets/images/properties/office/office4.png"
    ],
    coordinates: { lat: 6.435, lng: 3.600 },
    landmarks: ["Ajah Business Hub", "Lekki Toll Gate"],
    nearbyAmenities: ["ATM", "Bus Stop", "Restaurant"],
    agent: {
      name: "Bola Akindele",
      company: "OfficePro NG",
      phone: "+2348045678901",
      image: "/assets/images/agents/agent4.png",
      whatsappLink: "https://wa.me/2348045678901"
    },
    legalDocumentsAvailable: true,
    surveyPlans: { available: true },
    relatedProperties: [],
    reviews: [
      { rating: 4, text: "Perfect office for our startup team.", date: "2025-10-30", reviewer: "Confidence C." }
    ],
    condition: "renovated"
  },
  {
    title: "Elegant 3-Bedroom Shortlet",
    description: "Fully furnished shortlet with all utilities included, ideal for business travelers and tourists.",
    price: 70000,
    location: "VGC",
    neighborhood: "Lekki",
    propertyType: "shortlet",
    status: "for-rent",
    bedrooms: 3,
    bathrooms: 3,
    hasSwimmingPool: true,
    hasGarden: true,
    hasParking: true,
    parkingSpaces: 2,
    squareFeet: 1600,
    hasGym: false,
    hasConcierge: false,
    hasSecurity: true,
    yearBuilt: 2022,
    totalUnits: 1,
    furnishing: "furnished",
    hasBalcony: true,
    hasAirConditioning: true,
    hasWardrobes: true,
    powerBackup: "solar",
    waterSource: { available: true, type: "both" },
    internet: true,
    agentFee: { required: false },
    cautionFee: { required: true, amount: 1500000 },
    legalFee: { required: false },
    maintenanceFee: { required: true, amount: 30000 },
    // 🎯 CORRECT: With properties folder
    featuredImage: "/assets/images/properties/shortlet/shortlet1.png",
    images: [
      "/assets/images/properties/shortlet/shortlet2.png",
      "/assets/images/properties/shortlet/shortlet3.png",
      "/assets/images/properties/shortlet/shortlet4.png"
    ],
    coordinates: { lat: 6.450, lng: 3.620 },
    landmarks: ["VGC Mall", "Lekki Phase 2"],
    nearbyAmenities: ["Hospital", "School", "Shopping Mall"],
    agent: {
      name: "Ngozi Chukwu",
      company: "Lekki Shortlets",
      phone: "+2348056789012",
      image: "/assets/images/agents/agent1.png",
      whatsappLink: "https://wa.me/2348056789012"
    },
    legalDocumentsAvailable: true,
    surveyPlans: { available: false },
    relatedProperties: [],
    reviews: [
      { rating: 5, text: "Great shortlet, very comfortable.", date: "2025-11-02", reviewer: "Adaeze N." }
    ],
    condition: "new"
  }
];

export const propertyFeatures: PropertyProps[] = propertiesWithoutIds.map(property => ({
  id: generateSecureId(property.title),
  ...property
})) as PropertyProps[];