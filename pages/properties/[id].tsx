import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { propertyFeatures } from '@/interfaces/data';
import Image from 'next/image';
import { FaBed, FaBath, FaLocationArrow, FaChevronLeft, FaChevronRight, FaCar, FaExpand,FaShieldAlt } from 'react-icons/fa';
import { PropertyProps } from '@/interfaces';
import SimilarPropertyCard from "@/components/common/SimilarPropertyCard";


export async function getStaticPathsForPropertyPages() {
  const allPropertyPagePaths = propertyFeatures.map((property) => ({
    params: { id: property.id }, 
  }));

  return {
    paths: allPropertyPagePaths,
    fallback: false, 
  };
}

export async function getPropertyDataForPage({ params }: { params: { id: string } }) {
  const propertyData = propertyFeatures.find(property => property.id === params.id);


  if (!propertyData) {
    return {
      notFound: true,
    };
  }


  return {
    props: {
      propertyData, 
    },
  };
}

interface PropertyPageProps {
  propertyData: PropertyProps;
}
function PropertyDetailsPage({ propertyData }: PropertyPageProps) {
    const getSimilarProperties = (currentProperty: PropertyProps) => {
  return propertyFeatures.filter((p) =>
    p.id !== currentProperty.id && // exclude the current property
    p.location === currentProperty.location && // same location
    p.propertyType === currentProperty.propertyType && // same type
    Math.abs(p.price - currentProperty.price) <= currentProperty.price * 0.3 // ±30% price
  );
};

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();

    if (router.isFallback) {
        return <div className="text-center py-20">Loading property details...</div>;
    }
    return (
        <div className="max-w-5xl mx-auto pt-20 w-full">
            <div className='relative'>
                <h1 className="text-3xl font-bold mb-4">{propertyData.title}</h1>
                <Image 
                    src={propertyData.images?.[currentImageIndex] || propertyData.featuredImage} 
                    width={800} 
                    height={500} 
                    alt={propertyData.title} 
                    className="rounded-lg mb-4" 
                />
                
                {/* Image Navigation Buttons */}
                <button 
                    className='absolute top-1/2 -translate-y-1/2 left-3 z-10' 
                    onClick={() => setCurrentImageIndex((prev) => prev === 0 ? (propertyData.images?.length || 1) - 1 : prev - 1)}
                >
                    <FaChevronLeft className='text-5xl font-bold bg-blue-200 shadow-md rounded-full px-3 py-3 opacity-70 text-black hover:bg-black hover:text-blue-500 transition-colors' />
                </button>
                <button 
                    className='absolute top-1/2 -translate-y-1/2 right-3 z-10' 
                    onClick={() => setCurrentImageIndex((prev) => prev === (propertyData.images?.length || 1) - 1 ? 0 : prev + 1)}
                >
                    <FaChevronRight className='text-5xl font-bold bg-blue-200 shadow-md rounded-full px-3 py-3 opacity-70 text-black hover:bg-black hover:text-blue-500 transition-colors' />
                </button>

                {/* Image Thumbnails */}
                <div className='flex gap-2 mb-4 justify-center items-center md:justify-start'>
                    {propertyData.images?.map((imageUrl, index) => (
                        <div 
                            key={index} 
                            onClick={() => setCurrentImageIndex(index)} 
                            className={`cursor-pointer ${currentImageIndex === index ? 'border-4 border-blue-300' : 'border-transparent'} rounded-md`}
                        >
                            <Image 
                                src={imageUrl} 
                                width={100} 
                                height={70} 
                                alt={`Property thumbnail ${index + 1}`}  
                                className='object-cover rounded-md'
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Property Details Section */}
            <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                <p className="mb-4 text-gray-700">{propertyData.description}</p>
                <p className="text-2xl font-bold text-blue-400 mb-4">₦{propertyData.price.toLocaleString()}</p>

                <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center gap-1"><FaBed /> {propertyData.bedrooms} Bedrooms</div>
                    <div className="flex items-center gap-1"><FaBath /> {propertyData.bathrooms} Bathrooms</div>
                    <div className="flex items-center gap-1"><FaLocationArrow /> {propertyData.location}</div>
                </div>
            </div>

            {/* Agent Contact Section */}
            <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                <h2 className='font-bold text-2xl mb-4'>Contact Agent</h2>
                <div className="flex items-start gap-4">
                    <figure>
                            {propertyData.agent.image && (
                                <Image 
                                    src={propertyData.agent.image}  // ← No template literal needed here!
                                    width={80} 
                                    height={80} 
                                    alt={propertyData.agent.name}
                                    className="rounded-full object-cover"
                                />
                            )}
                    </figure>
                    <div>
                        
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{propertyData.agent.name}</h3>
                        <p className="text-gray-600">{propertyData.agent.company}</p>
                        <div className="mt-3">
                            <p className="text-blue-600">{propertyData.agent.phone}</p>
                            <a 
                                href={propertyData.agent.whatsappLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700"
                            >
                                WhatsApp: {propertyData.agent.whatsappLink}
                            </a>
                        </div>
                    </div>
                </div>
             </div>

                            {/* Basic Property Features */}
                <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                    <h2 className='font-bold text-2xl mb-4'>Property Features</h2>
                    
                    <div className="flex flex-wrap gap-6">
                        {/* Bedrooms */}
                        {propertyData.bedrooms && (
                            <div className="flex items-center gap-2">
                                <FaBed className="text-gray-600 text-xl" />
                                <span className="font-medium">{propertyData.bedrooms} Bedrooms</span>
                            </div>
                        )}
                        
                        {/* Bathrooms */}
                        {propertyData.bathrooms && (
                            <div className="flex items-center gap-2">
                                <FaBath className="text-gray-600 text-xl" />
                                <span className="font-medium">{propertyData.bathrooms} Bathrooms</span>
                            </div>
                        )}
                        
                        {/* Parking */}
                        {propertyData.parkingSpaces && (
                            <div className="flex items-center gap-2">
                                <FaCar className="text-gray-600 text-xl" />
                                <span className="font-medium">{propertyData.parkingSpaces} Parking</span>
                            </div>
                        )}
                        
                        {/* Square Feet */}
                        {propertyData.squareFeet && (
                            <div className="flex items-center gap-2">
                                <FaExpand className="text-gray-600 text-xl" />
                                <span className="font-medium">{propertyData.squareFeet} sq ft</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Amenities & Boolean Features */}
                <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                    <h2 className='font-bold text-2xl mb-4'>Amenities</h2>
                    
                    <div className="flex flex-wrap gap-6">
                        {/* Security */}
                        {propertyData.hasSecurity && (
                            <div className="flex items-center gap-2">
                                <FaShieldAlt className="text-green-600 text-xl" />
                                <span className="font-medium">Security</span>
                            </div>
                        )}
                        
                        {/* Swimming Pool */}
                        {propertyData.hasSwimmingPool && (
                            <div className="flex items-center gap-2">
                                <div className="text-blue-500 text-xl">🏊</div>
                                <span className="font-medium">Swimming Pool</span>
                            </div>
                        )}
                        
                        {/* Gym */}
                        {propertyData.hasGym && (
                            <div className="flex items-center gap-2">
                                <div className="text-red-500 text-xl">💪</div>
                                <span className="font-medium">Gym</span>
                            </div>
                        )}
                        
                        {/* Garden */}
                        {propertyData.hasGarden && (
                            <div className="flex items-center gap-2">
                                <div className="text-green-500 text-xl">🌿</div>
                                <span className="font-medium">Garden</span>
                            </div>
                        )}
                    </div>
                </div>
                                {/* Utilities & Other Features */}
                <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                    <h2 className='font-bold text-2xl mb-4'>Utilities & Details</h2>
                    
                    <div className="flex flex-wrap gap-6">
                        {/* Power Backup */}
                        {propertyData.powerBackup && (
                            <div className="flex items-center gap-2">
                                <div className="text-yellow-500 text-xl">⚡</div>
                                <span className="font-medium capitalize">{propertyData.powerBackup} Power</span>
                            </div>
                        )}
                        
                        {/* Water Source */}
                        {propertyData.waterSource?.available && (
                            <div className="flex items-center gap-2">
                                <div className="text-blue-500 text-xl">💧</div>
                                <span className="font-medium capitalize">{propertyData.waterSource.type} Water</span>
                            </div>
                        )}
                        
                        {/* Internet */}
                        {propertyData.internet && (
                            <div className="flex items-center gap-2">
                                <div className="text-purple-500 text-xl">📶</div>
                                <span className="font-medium">Internet</span>
                            </div>
                        )}
                        
                        {/* Furnishing */}
                        {propertyData.furnishing && (
                            <div className="flex items-center gap-2">
                                <div className="text-brown-500 text-xl">🛋️</div>
                                <span className="font-medium capitalize">{propertyData.furnishing}</span>
                            </div>
                        )}
                    </div>
                </div>
                                {/* Property Condition & Details */}
                <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                    <h2 className='font-bold text-2xl mb-4'>Property Details</h2>
                    
                    <div className="flex flex-wrap gap-6">
                        {/* Condition */}
                        {propertyData.condition && (
                            <div className="flex items-center gap-2">
                                <div className="text-green-500 text-xl">🏠</div>
                                <span className="font-medium capitalize">{propertyData.condition}</span>
                            </div>
                        )}
                        
                        {/* Year Built */}
                        {propertyData.yearBuilt && (
                            <div className="flex items-center gap-2">
                                <div className="text-gray-500 text-xl">📅</div>
                                <span className="font-medium">Built {propertyData.yearBuilt}</span>
                            </div>
                        )}
                        
                        {/* Total Units */}
                        {propertyData.totalUnits && (
                            <div className="flex items-center gap-2">
                                <div className="text-blue-500 text-xl">🏢</div>
                                <span className="font-medium">{propertyData.totalUnits} Units</span>
                            </div>
                        )}
                        
                        {/* Concierge */}
                        {propertyData.hasConcierge && (
                            <div className="flex items-center gap-2">
                                <div className="text-purple-500 text-xl">🎩</div>
                                <span className="font-medium">Concierge</span>
                            </div>
                        )}
                    </div>
                </div>
                                {/* Fees Section */}
                <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                    <h2 className='font-bold text-2xl mb-4'>Fees</h2>
                    
                    <div className="flex flex-wrap gap-6">
                        {/* Agent Fee */}
                        {propertyData.agentFee?.required && propertyData.agentFee.amount && (
                            <div className="flex items-center gap-2">
                                <div className="text-green-500 text-xl">💰</div>
                                <span className="font-medium">Agent Fee: ₦{propertyData.agentFee.amount.toLocaleString()}</span>
                            </div>
                        )}
                        
                        {/* Caution Fee */}
                        {propertyData.cautionFee?.required && propertyData.cautionFee.amount && (
                            <div className="flex items-center gap-2">
                                <div className="text-yellow-500 text-xl">⚠️</div>
                                <span className="font-medium">Caution Fee: ₦{propertyData.cautionFee.amount.toLocaleString()}</span>
                            </div>
                        )}
                        
                        {/* Legal Fee */}
                        {propertyData.legalFee?.required && propertyData.legalFee.amount && (
                            <div className="flex items-center gap-2">
                                <div className="text-blue-500 text-xl">⚖️</div>
                                <span className="font-medium">Legal Fee: ₦{propertyData.legalFee.amount.toLocaleString()}</span>
                            </div>
                        )}
                        
                        {/* Maintenance Fee */}
                        {propertyData.maintenanceFee?.required && propertyData.maintenanceFee.amount && (
                            <div className="flex items-center gap-2">
                                <div className="text-orange-500 text-xl">🔧</div>
                                <span className="font-medium">Maintenance: ₦{propertyData.maintenanceFee.amount.toLocaleString()}/month</span>
                            </div>
                        )}
                    </div>
                   </div>

                                    {/* Legal Documents Section */}
                    <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                        <h2 className='font-bold text-2xl mb-4'>Legal Documents</h2>
                        
                        <div className="flex flex-wrap gap-6">
                            {/* Legal Documents Available */}
                            {propertyData.legalDocumentsAvailable && (
                                <div className="flex items-center gap-2">
                                    <div className="text-green-500 text-xl">📄</div>
                                    <span className="font-medium">Legal Documents Available</span>
                                </div>
                            )}
                            
                            {/* Survey Plans Available */}
                            {propertyData.surveyPlans?.available && (
                                <div className="flex items-center gap-2">
                                    <div className="text-blue-500 text-xl">🗺️</div>
                                    <span className="font-medium">Survey Plans Available</span>
                                </div>
                            )}
                        </div>
                    </div>
                                        {/* Location & Nearby Section */}
                    <div className='bg-white p-6 mb-6 shadow-md rounded-lg'>
                        <h2 className='font-bold text-2xl mb-4'>Location & Nearby</h2>
                        
                        <div className="space-y-4">
                            {/* Landmarks */}
                            {propertyData.landmarks && propertyData.landmarks.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                        <div className="text-purple-500">📍</div>
                                        Nearby Landmarks
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {propertyData.landmarks.map((landmark, index) => (
                                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                {landmark}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Nearby Amenities */}
                            {propertyData.nearbyAmenities && propertyData.nearbyAmenities.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                        <div className="text-green-500">🏪</div>
                                        Nearby Amenities
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {propertyData.nearbyAmenities.map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                        {/* Similar Properties Section */}
                        <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">Similar Properties</h2>
                        {getSimilarProperties(propertyData).length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {getSimilarProperties(propertyData).map((property) => (
                                <SimilarPropertyCard key={property.id} property={property} />
                            ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No similar properties found.</p>
                        )}
                        </div>

        </div>
    );
}


export { getStaticPathsForPropertyPages as getStaticPaths };
export { getPropertyDataForPage as getStaticProps };

export default PropertyDetailsPage;