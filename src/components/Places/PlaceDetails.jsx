import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const PlaceDetails = () => {
  const {id} = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    if (id)
      axios.get(`http://localhost:8081/places/${id}`).then((res) => {
        console.log(id);
        if (res.data && res.data.data) {
          setPlaceDetails(res.data.data);
          console.log(res.data.data);
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

  return (
    <div>
      {placeDetails ? (
        <div>
          <h1>{placeDetails.location}</h1>
          <img src={placeDetails.image_path} alt="" />
          <p>{placeDetails.rating}</p>
          <Link
            className="underline text-darkGreen"
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
  );
};
export default PlaceDetails;
