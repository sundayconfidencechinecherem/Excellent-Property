import Image from "next/image";
import { PropertyProps } from "@/interfaces";
import { FaBed, FaBath, FaLocationArrow } from "react-icons/fa";
import Link from "next/link";

interface SimilarPropertyCardProps {
  property: PropertyProps;
}

const SimilarPropertyCard = ({ property }: SimilarPropertyCardProps) => (
  <Link href={`/property/${property.id}`}>
    <a className="block border rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      <Image
        src={property.featuredImage}
        width={300}
        height={200}
        alt={property.title}
        className="object-cover w-full h-48"
      />
      <div className="p-3">
        <h3 className="text-lg font-bold">{property.title}</h3>
        <p className="text-blue-500 font-semibold">₦{property.price.toLocaleString()}</p>
        <div className="flex gap-4 mt-1 text-gray-600">
          <span><FaBed /> {property.bedrooms}</span>
          <span><FaBath /> {property.bathrooms}</span>
          <span><FaLocationArrow /> {property.location}</span>
        </div>
      </div>
    </a>
  </Link>
);

export default SimilarPropertyCard;
