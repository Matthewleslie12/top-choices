import {useEffect, useState} from "react";
import axios from "axios";
import Nav from "../../components/navbar/Nav";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";
import {Icon} from "@iconify/react";

const Saved = () => {
  const {userId} = useAuth();
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [image, setImage] = useState();

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8081/form?userId=${userId}`)
        .then((res) => {
          if (res.data && res.data.data) {
            const userPosts = res.data.data;
            console.log(res.data.data);
            setSavedData(userPosts);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userId]);

  const handlePlaceClick = (id) => {
    console.log("Navigating to place with id:", id);
    const placeDetailsURL = `/places/${id}`;
    navigate(placeDetailsURL);
  }; // TODO: clean up files, make a function folder for example

  const handleDelete = (placeId) => {
    axios
      .delete(`http://localhost:8081/places/${placeId}`)
      .then((res) => {
        setSavedData((prevData) =>
          prevData.filter((item) => item.id !== placeId)
        );
      })
      .catch((err) => {
        console.error(err);
      });
    deleteModal();
  };
  const deleteModal = (link) => {
    const confirmed = window.confirm(
      "This will permanently delete the place from your account, are you sure?"
    );
    if (!confirmed) {
      return false;
    }
    return true;
  };
  // TODO: Change window.confirm to an actual modal

  return (
    <div className="h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-3 px-4 pt-8 mb-32 ">
          <h1 className="font-bold  text-xl">Saved Places</h1>

          {/* //TODO: Add a sort and search functionality to query the db for places maybe handle it on another page and import here to try to keep clean*/}

          {savedData.length > 0 ? (
            savedData.map((item) => (
              <>
                <div className="cursor-pointer ">
                  <Icon
                    icon="ic:outline-delete"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    color="red"
                  />
                </div>
                <div
                  key={item.id}
                  className="rounded-2xl bg-darkBlue p-4 h-32 cursor-pointer hover:bg-darkerBlue "
                  onClick={() => handlePlaceClick(item.id)}
                >
                  <div className="grid grid-cols-2 gap-4 ">
                    {item.cuisineImageUrl ? (
                      <img
                        src={item.cuisineImageUrl}
                        alt=""
                        className="h-24 w-24 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="h-24 w-24 object-cover rounded-xl bg-darkPeach"></div>
                    )}

                    <div className="flex flex-col justify-between">
                      <h1 className="font-semibold capitalize text-lg">
                        {item.location}
                      </h1>
                      <p className="capitalize text-sm">{item.cuisine}</p>
                      <p className="">{item.rating}/5</p>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div>
              <h1>You have not added any ratings</h1>
              <Link to="/">
                <p className="underline">
                  Go to the homepage to start posting!
                </p>
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
