import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Nav from "../navbar/Nav";
import {Icon} from "@iconify/react";
import {Tooltip} from "react-tooltip";
import "animate.css";

const PlaceDetails = () => {
  const {id} = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    if (id)
      axios.get(`http://localhost:8081/places/${id}`).then((res) => {
        if (res.data && res.data.data) {
          setPlaceDetails(res.data.data);
        }
      });
  }, [id]);

  const handleLinkClick = (link) => {
    const confirmed = window.confirm(
      "This will take you to another page outside the app. Are you sure?"
    );
    if (!confirmed) {
      return false;
    }
    return true;
  };

  const navigate = useNavigate();

  return (
    <main className="">
      <div className="p-4 h-screen animate__animated animate__fadeIn bg-mustard">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Back to list!"
          onClick={() => navigate(-1)}
          className="cursor-pointer flex gap-4 items-center"
        >
          <Icon icon="ep:back" width={30} />
        </button>
        <Tooltip id="my-tooltip" />
        {placeDetails ? (
          <div className="p-4">
            <h1 className="font-bold text-lg">{placeDetails.location}</h1>
            <img src={placeDetails.image_path} alt="" />
            <p className="">{placeDetails.rating}</p>

            <p>{placeDetails.cuisine}</p>
            <Link
              className="underline "
              to={placeDetails.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) =>
                !handleLinkClick(placeDetails.link) && e.preventDefault()
              }
            >
              {placeDetails.link}
            </Link>
            <p>{placeDetails.notes}</p>
          </div>
        ) : (
          <p>Loading place details...</p>
        )}
      </div>
      <Nav />
    </main>
  );
};
export default PlaceDetails;
