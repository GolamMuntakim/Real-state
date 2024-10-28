import { Link } from "react-router-dom";



const PropertyCard = ({property}) => {
    
    return (
        <div className="">
             <div className="h-[380px] w-full  lg:w-96 glass rounded-md">
                <figure><img src={property.image} alt="car!" className="h-[200px] w-full"/></figure>
                <div className="card-body">
                    <h2 className="card-title">Title: {property.title}</h2>
                    <p>Price: ${property.price}</p>
                    <div className="card-actions w-full ">
                      <Link to={`/propertyDetails/${property._id}`}>  <button className="btn bg-blue-900 text-white w-[300px] border-none">Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;