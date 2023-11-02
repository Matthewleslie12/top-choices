import {useEffect, useState} from "react";
import axios from "axios";
import Nav from "../../components/navbar/Nav";
import {Link, useNavigate} from "react-router-dom";

const Saved = () => {
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/form")
      .then((res) => {
        if (res.data && res.data.data) {
          setSavedData(res.data.data);
          console.log(res.data.data);
        }
        setLoading(false);
      })

      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePlaceClick = (id) => {
    console.log("Navigating to place with id:", id);
    const placeDetailsURL = `/places/${id}`;
    navigate(placeDetailsURL);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-3 px-4 py-8">
          <h1 className="font-bold  text-xl">Browse your saved places!</h1>
          {/* //TODO: Add a sort and search functionality to query the db for places maybe handle it on another page and import here to try to keep clean*/}
          {savedData.length > 0 ? (
            savedData.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-paleBlue p-4 h-32 cursor-pointer hover:bg-darkBlue"
                onClick={() => handlePlaceClick(item.id)} // Pass the 'id' to the click handler
              >
                <div className="grid grid-cols-2 gap-3 ">
                  <img
                    src={item.image_path}
                    alt=""
                    className="h-24  object-cover rounded-xl"
                  />
                  <div className="">
                    <h1 className="font-semibold capitalize">
                      {item.location}
                    </h1>
                    {/* <p>{item.cuisine}</p> */}
                    {/* <Link
                      className="underline text-darkGreen"
                      to={item.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) =>
                        !handleLinkClick(item.link) && e.preventDefault()
                      }
                    >
                      {item.link}
                    </Link> */}
                    {/* //TODO: change this with the cuisine / genre */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>You have not added any ratings</h1>
              <Link to="/">
                <button>Go to the homepage to start posting!</button>
              </Link>
            </div>
          )}
        </div>
      )}
      <Nav />
    </div>
  );
};

export default Saved;
