import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../provider/authProvider";
import ReactStars from "react-rating-stars-component";
import CreatableSelect from "react-select/creatable";

const initialFormData = {
  location: "",
  rating: 0,
  link: "",
  notes: "",
  imagePath: "",
  cuisine: "",
};
const customStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#C7C7CD",
      fontSize: "12px",
      fontWeight: "bold",
    };
  },
};

const Form = () => {
  const {userId} = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [cuisineType, setCuisineType] = useState();

  useEffect(() => {
    if (userId) {
      setLoading(false);
    }
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const ratingChanged = (newRating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };

  const normalizeLink = (link) => {
    if (link && !link.startsWith("http://") && !link.startsWith("https://")) {
      link = "http://" + link;
    }

    if (link && !link.endsWith(".com")) {
      link = link + ".com";
    }

    return link;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      userId: userId,
      link: normalizeLink(formData.link),
      cuisine: selectedCuisine?.value,
    };

    axios
      .post("http://localhost:8081/form", dataToSend)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Form Submission data:", dataToSend);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred");
        }
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/cuisines")
      .then((res) => {
        setCuisineType(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  const handleCuisineChange = (selectedOption) => {
    setSelectedCuisine(selectedOption);
    if (selectedOption) {
      setFormData((prevData) => ({
        ...prevData,
        imagePath: selectedOption.image || "",
      }));
    }
  };

  return (
    <div>
      <form
        className="flex flex-col mx-4 pt-4 gap-y-3  overflow-auto"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col mx-1">
          <label htmlFor="location" className="">
            Location
          </label>
          <input
            placeholder="Enter Location"
            type="text"
            id="location"
            className="border h-9 rounded-md shadow-lg px-2 outline-none focus:outline-dullGreen"
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>
        <div className=" flex flex-col mx-1">
          <label htmlFor="rating" className="">
            Rating
          </label>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            activeColor="#FDC858"
            color="lightGray"
            isHalf={true}
          />
        </div>
        <div className=" flex flex-col mx-1">
          <label htmlFor="link" className="">
            Link
          </label>
          <input
            placeholder="Enter Link"
            type="text"
            id="link"
            className="border rounded-md h-9 shadow-lg px-2 outline-none focus:outline-dullGreen"
            onChange={(e) => handleInputChange("link", e.target.value)}
          />
        </div>
        <div className=" flex flex-col mx-1">
          <label htmlFor="cuisine" className="">
            Cuisine
          </label>

          <CreatableSelect
            value={selectedCuisine}
            onChange={handleCuisineChange}
            options={cuisineType}
            isSearchable
            styles={customStyles}
            placeholder="Select a cuisine or start typing..."
          />
        </div>

        <div className="flex flex-col mx-1">
          <label htmlFor="notes" className="">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="5"
            className="resize-none border rounded-md shadow-xl px-2 outline-none focus:outline-dullGreen"
            onChange={(e) => handleInputChange("notes", e.target.value)}
          ></textarea>
        </div>
        <p className="text-red-500 capitalize text-xs font-bold mx-1 underline">
          {error}
        </p>

        <input
          type="file"
          id="imagePath"
          name="file"
          onChange={(e) => handleInputChange("imagePath", e.target.value)}
          className="hidden"
        />
        {/* //TODO allow users to upload an image, get the url from that and store in sql */}
        <label
          htmlFor="imagePath"
          className="w-fit text-sm py-2 px-4 rounded-md font-semibold hover:bg-darkerPeach text-white bg-darkPeach cursor-pointer mx-1"
        >
          Choose an image (Optional)
        </label>

        <button className="p-4 rounded-xl bg-darkBlue hover:bg-darkerBlue text-white font-bold text-lg mb-32 mx-1">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
