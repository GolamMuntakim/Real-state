import { Link } from "react-router-dom";



const PropertyCard = ({property}) => {
    
    return (
        <div className="">
             <div className="card w-96 glass">
                <figure><img src={property.image} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Location: {property.location}</h2>
                    <p>Price: ${property.price}</p>
                    <div className="card-actions w-full ">
                      <Link to={`/propertyDetails/${property._id}`}>  <button className="btn bg-blue-900 text-white w-[300px]">Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;