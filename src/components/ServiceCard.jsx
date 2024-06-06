import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="border-2 border-primary bg-primary h-[400px] flex flex-col rounded-[15px] overflow-hidden transition-all hover:scale-105  hover:shadow-2xl group">
      <div className="w-full flex-1 flex justify-center items-center">
        <h1 className="text-2xl font-semibold">{service?.name}</h1>
      </div>
      <div className="h-[200px] flex-[2] flex flex-col justify-between bg-white rounded-[12px] p-[15px] transition-all">
        <div className="h-[130px] text-xl text-center flex items-center">
          <p>{service?.description}</p>
        </div>
        <p className="text-center text-2xl mb-2">{service?.price}</p>
        <Link
          to={`/booking/${service?._id}`}
          className="btn btn-primary w-full"
        >
          Book
        </Link>
      </div>
    </div>
  );
};


export default ServiceCard;