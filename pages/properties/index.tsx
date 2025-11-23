import React from 'react';
import { propertyFeatures } from '@/interfaces/data';
import PropertyCard from '@/components/common/PropertyCard';

function Properties() {
  return (
    <div className='mx-auto px-4 py-8 pt-20'>
      <h1 className='text-center mb-8  font-bold text-3xl'>Featured Properties</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6'>
        {
          propertyFeatures.map((property) => (
            <PropertyCard key={property.id}  property={property}/>
          ))
        }
      </div>
    </div>
  )
}

export default Properties;