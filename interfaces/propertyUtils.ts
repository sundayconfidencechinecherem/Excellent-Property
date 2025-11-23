import { PropertyProps } from '@/interfaces';

export function getSimilarProperties(currentProperty: PropertyProps, allProperties: PropertyProps[]): PropertyProps[] {
  const scoredProperties = allProperties
    .filter(property => property.id !== currentProperty.id)
    .map(property => {
      let score = 0;
      const maxPossibleScore = 100;
      
      // 1. Property Type & Status (Highest Priority - 35 points)
      if (property.propertyType === currentProperty.propertyType) {
        score += 25;
      }
      if (property.status === currentProperty.status) {
        score += 10;
      }
      
      // 2. Price Range (High Priority - 30 points)
      const priceDifference = Math.abs(property.price - currentProperty.price);
      const priceRatio = priceDifference / currentProperty.price;
      
      if (priceRatio <= 0.15) { // Within 15%
        score += 30;
      } else if (priceRatio <= 0.3) { // Within 30%
        score += 20;
      } else if (priceRatio <= 0.5) { // Within 50%
        score += 10;
      }
      
      // 3. Location & Neighborhood (Medium Priority - 20 points)
      if (property.location === currentProperty.location) {
        score += 15;
      } else if (property.neighborhood === currentProperty.neighborhood) {
        score += 10;
      }
      
      // 4. Bedrooms & Bathrooms (Medium Priority - 15 points)
      if (property.bedrooms === currentProperty.bedrooms) {
        score += 10;
      } else if (property.bedrooms && currentProperty.bedrooms && 
                 Math.abs(property.bedrooms - currentProperty.bedrooms) === 1) {
        score += 5;
      }
      
      if (property.bathrooms === currentProperty.bathrooms) {
        score += 5;
      }
      
      return {
        property,
        score,
        similarityPercentage: (score / maxPossibleScore) * 100
      };
    })
    .filter(item => item.similarityPercentage >= 40) // Only show properties with at least 40% similarity
    .sort((a, b) => b.score - a.score); // Sort by highest similarity score
  
  return scoredProperties.map(item => item.property);
}

// Alternative simple version for specific use cases
export function getSimilarPropertiesSimple(currentProperty: PropertyProps, allProperties: PropertyProps[]): PropertyProps[] {
  const isResidential = ['apartment', 'penthouse', 'villa', 'duplex', 'bungalow', 'shortlet'].includes(currentProperty.propertyType);
  
  return allProperties
    .filter(property => property.id !== currentProperty.id)
    .filter(property => {
      if (isResidential) {
        const priceDiff = Math.abs(property.price - currentProperty.price) / currentProperty.price;
        const sameArea = property.location === currentProperty.location || 
                       property.neighborhood === currentProperty.neighborhood;
        
        return property.propertyType === currentProperty.propertyType &&
               property.status === currentProperty.status &&
               priceDiff <= 0.4 &&
               sameArea;
      }
      
      const priceDiff = Math.abs(property.price - currentProperty.price) / currentProperty.price;
      return property.propertyType === currentProperty.propertyType &&
             priceDiff <= 0.6;
    })
    .slice(0, 4);
}