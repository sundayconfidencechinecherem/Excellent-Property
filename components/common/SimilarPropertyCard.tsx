import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaLocationArrow, FaExpand } from 'react-icons/fa';
import { PropertyProps } from '@/interfaces';

interface SimilarPropertyCardProps {
  property: PropertyProps;
}

const SimilarPropertyCard: React.FC<SimilarPropertyCardProps> = ({ property }) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'for-sale':
        return 'bg-green-600';
      case 'for-rent':
        return 'bg-blue-600';
      case 'sold':
        return 'bg-red-600';
      case 'leased':
      case 'on-lease':
        return 'bg-purple-600';
      case 'rented':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('-', ' ').toUpperCase();
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Image Section */}
      <div className="relative h-48">
        <Image 
          src={property.featuredImage} 
          fill
          alt={property.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute top-2 right-2 ${getStatusBadgeColor(property.status)} text-white px-2 py-1 rounded text-sm font-medium`}>
          {formatStatus(property.status)}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        
        {/* Location */}
        <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
          <FaLocationArrow className="text-xs" />
          {property.location}
          {property.neighborhood && `, ${property.neighborhood}`}
        </p>
        
        {/* Property Features */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 flex-wrap">
          {property.bedrooms && property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <FaBed className="text-xs" /> 
              {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
            </span>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <FaBath className="text-xs" /> 
              {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
            </span>
          )}
          {property.squareFeet && (
            <span className="flex items-center gap-1">
              <FaExpand className="text-xs" /> 
              {property.squareFeet.toLocaleString()} sq ft
            </span>
          )}
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 font-bold text-lg">
              ₦{property.price.toLocaleString()}
              {property.status.includes('rent') && <span className="text-sm font-normal">/year</span>}
            </p>
          </div>
          <Link 
            href={`/properties/${property.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimilarPropertyCard;