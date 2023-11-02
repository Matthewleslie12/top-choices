import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../provider/authProvider";
import ReactStars from "react-rating-stars-component";

const initialFormData = {
  location: "",
  rating: 0,
  link: "",
  notes: "",
  imagePath: "",
};

const Form = () => {
  const {userId} = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

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
    console.log(newRating);
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

  return (
    <form
      className="flex flex-col mx-4 pt-8 "
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <div className="mb-6 flex flex-col">
        <label htmlFor="location" className="px-1">
          Location
        </label>
        <input
          placeholder="Enter Location"
          type="text"
          id="location"
          className="border bg-gray-100 rounded-2xl shadow-lg px-2 outline-none focus:outline-dullGreen"
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="mb-6 flex flex-col">
        <label htmlFor="rating" className="px-1">
          Rating
        </label>
        <ReactStars
          count={5}
          // onChange={(e) => handleInputChange("rating", e.target.value)}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          isHalf={true}
        />
      </div>

      <div className="mb-6 flex flex-col">
        <label htmlFor="link" className="px-1">
          Link
        </label>
        <input
          placeholder="Enter Link"
          type="text"
          id="link"
          className="border bg-gray-100 rounded-2xl shadow-lg px-2 outline-none focus:outline-dullGreen"
          onChange={(e) => handleInputChange("link", e.target.value)}
        />
      </div>

      <div className="mb-6 flex flex-col">
        <label htmlFor="notes" className="px-1">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          cols="30"
          rows="5"
          className="resize-none border bg-gray-100 rounded-2xl shadow-xl px-2 outline-none focus:outline-dullGreen"
          onChange={(e) => handleInputChange("notes", e.target.value)}
        ></textarea>
      </div>

      <input
        type="file"
        id="imagePath"
        name="image"
        onChange={(e) => handleInputChange("imagePath", e.target.value)}
      />

      <button className="mx-2 p-4 rounded-xl bg-paleBlue hover:bg-darkBlue text-white font-bold text-lg mb-12">
        Submit
      </button>
      <p>{error}</p>
    </form>
  );
};
export default Form;
