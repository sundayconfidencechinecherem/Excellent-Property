import React, { useMemo, useState } from 'react';
import { PropertyProps } from '@/interfaces';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaLocationArrow,
  FaCar,
  FaExpand,
  FaShieldAlt,
  FaUserFriends,
  FaHome,
} from 'react-icons/fa';
import Link from 'next/link';
import clsx from 'clsx';

// Constants
const RESIDENTIAL_TYPES: PropertyProps['propertyType'][] = [
  'villa', 'mansion', 'apartment', 'bungalow', 'duplex', 'shortlet', 'penthouse', 'estate'
];

const COMMERCIAL_TYPES: PropertyProps['propertyType'][] = [
  'office', 'shop', 'warehouse', 'event-center', 'commercial'
];

const STATUS_CONFIG: Record<PropertyProps['status'], { color: string; textColor: string; label: string }> = {
  'for-sale': { color: 'bg-green-100', textColor: 'text-green-800', label: 'For Sale' },
  'for-rent': { color: 'bg-blue-100', textColor: 'text-blue-800', label: 'For Rent' },
  'sold': { color: 'bg-gray-200', textColor: 'text-gray-800', label: 'Sold' },
  'rented': { color: 'bg-indigo-100', textColor: 'text-indigo-800', label: 'Rented' },
  'on-lease': { color: 'bg-yellow-100', textColor: 'text-yellow-800', label: 'On Lease' },
  'leased': { color: 'bg-red-100', textColor: 'text-red-800', label: 'Leased' },
};

// Base features
const BASE_FEATURES = {
  bedrooms: { icon: <FaBed className="text-gray-600" />, showValue: true, ariaLabel: 'bedrooms' },
  bathrooms: { icon: <FaBath className="text-gray-600" />, showValue: true, ariaLabel: 'bathrooms' },
  parkingSpaces: { icon: <FaCar className="text-gray-600" />, showValue: true, ariaLabel: 'parking spaces' },
  squareFeet: { icon: <FaExpand className="text-gray-600" />, showValue: true, ariaLabel: 'square feet' },
  hasSecurity: { icon: <FaShieldAlt className="text-green-600" />, showValue: false, ariaLabel: 'security' },
  businessNeighbors: { icon: <FaUserFriends className="text-blue-600" />, showValue: false, ariaLabel: 'good business area' },
};

// Feature component
interface PropertyFeatureProps {
  icon: React.ReactNode;
  value: string | number;
  showValue: boolean;
  ariaLabel?: string;
}

function PropertyFeature({ icon, value, showValue, ariaLabel }: PropertyFeatureProps) {
  return (
    <div className="flex items-center gap-1 text-sm" aria-label={ariaLabel}>
      {icon}
      {showValue && (value !== undefined && value !== null && value !== '') && (
        <span className="text-gray-700 font-medium">{value}</span>
      )}
    </div>
  );
}

// Helper functions
const validateImageUrl = (url: string): string => {
  if (!url) return '/fallback-property.png';
  if (url.startsWith('/')) return url;
  try { 
    new URL(url); 
    return url; 
  } catch { 
    return url.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i) ? url : '/fallback-property.png'; 
  }
};
export { validateImageUrl };


const generateAltText = (property: PropertyProps): string => {
  const type = property.propertyType || 'Property';
  const location = property.location || 'unknown location';
  const title = property.title || '';
  return title ? `${title} - ${type} in ${location}` : `${type} in ${location}`;
};

// Status badge component
const StatusBadge = ({ status }: { status: PropertyProps['status'] }) => {
  // Comprehensive error handling with multiple fallbacks
  const getStatusConfig = (): { color: string; textColor: string; label: string } => {
    // 1. Check if status is valid
    if (!status || typeof status !== 'string') {
      console.warn('Invalid status provided to StatusBadge:', status);
      return {
        color: 'bg-gray-100',
        textColor: 'text-gray-800', 
        label: 'Unknown Status'
      };
    }

    // 2. Check if status exists in config
    const config = STATUS_CONFIG[status];
    if (!config) {
      console.warn(`Status "${status}" not found in STATUS_CONFIG. Available:`, Object.keys(STATUS_CONFIG));
      
      // 3. Smart fallback based on status content
      if (status.includes('sale') || status.includes('sell')) {
        return {
          color: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'For Sale'
        };
      } else if (status.includes('rent') || status.includes('lease')) {
        return {
          color: 'bg-blue-100', 
          textColor: 'text-blue-800',
          label: 'For Rent'
        };
      } else if (status.includes('sold')) {
        return {
          color: 'bg-gray-200',
          textColor: 'text-gray-800',
          label: 'Sold'
        };
      }
      
      // 4. Generic fallback with formatted label
      return {
        color: 'bg-gray-100',
        textColor: 'text-gray-800',
        label: status.replace(/-/g, ' ').toUpperCase()
      };
    }

    return config;
  };

  const cfg = getStatusConfig();

  return (
    <span 
      className={clsx(
        'inline-block text-sm py-1.5 px-3 font-medium rounded-full border',
        cfg.color, 
        cfg.textColor,
        'border-opacity-20'
      )}
      title={`Status: ${cfg.label}`}
      aria-label={`Property status: ${cfg.label}`}
    >
      {cfg.label}
    </span>
  );
};

// Main component
interface CardPropertyProps { 
  property: PropertyProps; 
}

function PropertyCard({ property }: CardPropertyProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = useMemo(
    () => imageError ? '/fallback-property.png' : validateImageUrl(property.featuredImage),
    [imageError, property.featuredImage]
  );

  const altText = useMemo(() => generateAltText(property), [property]);


  const formattedPrice = useMemo(() => {
    if (!property.price) return '₦0';

    if (property.price >= 1000000) {
      const millions = property.price / 1000000;
      // Remove unnecessary decimal if whole number
      return `₦${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
    }

    // Use Intl.NumberFormat for < 1 million
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0, // No decimals for thousands
    }).format(property.price);

  }, [property.price]);
  

  const isResidential = RESIDENTIAL_TYPES.includes(property.propertyType);
  const isCommercial = COMMERCIAL_TYPES.includes(property.propertyType);

  const isUnavailable = property.status === 'leased' || property.status === 'sold';
  const currentStatus = STATUS_CONFIG[property.status];

  const handleFindSimilarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/properties?filter=available';
  };

  const featuresToShow = useMemo(() => {
    const config: Array<{ key: keyof PropertyProps; icon: React.ReactNode; showValue: boolean; condition?: (prop: PropertyProps) => boolean; ariaLabel?: string }> = [];

    const addFeature = (key: keyof typeof BASE_FEATURES, condition?: (prop: PropertyProps) => boolean) => {
      const base = BASE_FEATURES[key];
      if (!base) return;
      if (!condition || condition(property)) {
        config.push({ key, icon: base.icon, showValue: base.showValue, condition, ariaLabel: base.ariaLabel });
      }
    };

    if (isResidential) {
      switch (property.status) {
        case 'for-sale':
          addFeature('bedrooms', (p) => !!p.bedrooms);
          addFeature('bathrooms', (p) => !!p.bathrooms);
          addFeature('parkingSpaces', (p) => !!p.parkingSpaces);
          addFeature('squareFeet', (p) => !!p.squareFeet);
          break;
        case 'for-rent':
          addFeature('bedrooms', (p) => !!p.bedrooms);
          addFeature('bathrooms', (p) => !!p.bathrooms);
          addFeature('parkingSpaces', (p) => !!p.parkingSpaces);
          addFeature('hasSecurity', (p) => !!p.hasSecurity);
          break;
        case 'on-lease':
          addFeature('bedrooms', (p) => !!p.bedrooms);
          addFeature('bathrooms', (p) => !!p.bathrooms);
          addFeature('parkingSpaces', (p) => !!p.parkingSpaces);
          addFeature('squareFeet', (p) => !!p.squareFeet);
          break;
      }
    }

    if (isCommercial) {
      switch (property.status) {
        case 'for-sale':
          addFeature('parkingSpaces', (p) => !!p.parkingSpaces);
          addFeature('squareFeet', (p) => !!p.squareFeet);
          break;
        case 'for-rent':
          addFeature('parkingSpaces', (p) => !!p.parkingSpaces);
          addFeature('hasSecurity', (p) => !!p.hasSecurity);
          addFeature('businessNeighbors', (p) => !!p.businessNeighbors);
          break;
        case 'on-lease':
          addFeature('parkingSpaces', (p) => !!p.parkingSpaces);
          addFeature('squareFeet', (p) => !!p.squareFeet);
          break;
      }
    }

    if (config.length === 0) {
      config.push({
        key: 'title',
        icon: <FaHome className="text-gray-400" />,
        showValue: true,
        ariaLabel: 'Property details available on request'
      });
    }

    return config.slice(0, 4).map(f => ({
      icon: f.icon,
      value: f.showValue ? property[f.key] as string | number : '',
      showValue: f.showValue,
      ariaLabel: f.ariaLabel
    }));
  }, [property, isResidential, isCommercial]);

  return (
    <Link 
      href={`/properties/${property.id}`}
      aria-label={`View ${property.title} in ${property.location}`}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl block h-full"
    >
      <div className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
        <figure className="relative w-full shrink-0">
          <div className="relative w-full h-0 pb-[56.25%]">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-2xl"
              onError={() => !imageError && setImageError(true)}
              priority={false}
            />
          </div>

          {isUnavailable && (
            <>
              <div className="absolute top-3 right-3 bg-red-600 text-white py-1 px-3 rounded-full font-bold text-sm shadow-lg z-10">
                {currentStatus.label}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 py-2 px-4 text-center">
                <p className="text-white text-sm font-medium">
                  {currentStatus.label} - Reference Only
                </p>
                <button 
                  type="button"
                  onClick={handleFindSimilarClick}
                  className="text-blue-300 hover:text-blue-200 text-xs mt-1 inline-block transition-colors bg-transparent border-none cursor-pointer"
                >
                  Find Similar →
                </button>
              </div>
            </>
          )}
        </figure>

        <div className="p-4 flex flex-col grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1 shrink-0">{property.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 shrink-0">{property.description}</p>

          {!isUnavailable
            ? <p className="text-lg font-bold text-gray-900 mb-2 shrink-0">{formattedPrice}</p>
            : <p className="text-lg font-bold text-gray-500 mb-2 line-through shrink-0">{formattedPrice}</p>
          }

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 shrink-0">
            <FaLocationArrow className="text-gray-500 shrink-0" />
            <p className="line-clamp-1">{property.location}</p>
          </div>

          <div className="flex items-center mb-3 gap-2 min-h-8 grow">
            <span className="text-sm text-gray-700 font-medium capitalize mr-2 shrink-0">{property.propertyType}</span>
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              {featuresToShow.map((f, i) => <PropertyFeature key={i} {...f} />)}
            </div>
          </div>

          <div className="mt-auto pt-2 shrink-0">
            {!isUnavailable && <StatusBadge status={property.status} />}
          </div>
        </div>
      </div>
    </Link>
  );
}

const arePropsEqual = (prevProps: CardPropertyProps, nextProps: CardPropertyProps): boolean => {
  return prevProps.property.id === nextProps.property.id &&
    prevProps.property.status === nextProps.property.status &&
    prevProps.property.price === nextProps.property.price &&
    prevProps.property.featuredImage === nextProps.property.featuredImage &&
    prevProps.property.title === nextProps.property.title &&
    prevProps.property.description === nextProps.property.description &&
    prevProps.property.location === nextProps.property.location &&
    prevProps.property.propertyType === nextProps.property.propertyType;
};

export default React.memo(PropertyCard, arePropsEqual);
