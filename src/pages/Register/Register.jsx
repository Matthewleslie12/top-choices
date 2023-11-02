import Animation from "../../components/animation/Animation";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import Text from "../../components/text/Text";
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post("http://localhost:8081/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
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
    <>
      <div className="md:flex md:flex-row">
        <div className="md:w-1/2 lg:mt-8 lg:px-8">
          <Title />
          <div className="md:hidden">
            <Animation />
          </div>
          <Text />
          <form
            onSubmit={submitHandler}
            className="flex flex-col p-4 bg-white  md:px-6 "
          >
            <h3 className="text-slate font-semibold pb-2">Name</h3>
            <input
              type="text"
              className="border-paleGreen border-2 rounded-lg items-center pl-4 text-darkGreen h-12"
              placeholder="Jon"
              name="name"
              onChange={(e) => setValues({...values, name: e.target.value})}
            />
            <h3 className="mt-3 text-slate font-semibold pb-2">Email</h3>
            <input
              type="email"
              className=" border-paleGreen border-2 rounded-lg items-center pl-4 text-darkGreen h-12"
              placeholder="jondoe@gmail.com"
              name="email"
              onChange={(e) => setValues({...values, email: e.target.value})}
            />

            <h3 className="mt-3 text-slate font-semibold pb-2">Password</h3>
            <input
              type="password"
              name="password"
              className="border-paleGreen border-2 rounded-lg pl-4 text-darkGreen h-12"
              onChange={(e) => setValues({...values, password: e.target.value})}
            />

            <Button className="bg-mintGreen text-white">Sign Up</Button>
            {/* <p className="text-red-600 mb-4">{error && error}</p> */}
            <section className="flex justify-between pt-4">
              <h4>Already have an account?</h4>

              <Link
                to="/login"
                className="text-darkGreen underline decoration-slate"
              >
                Login
              </Link>
            </section>
          </form>
          {error && <p className="text-red-600 mb-4">{error}</p>}
        </div>
        <div className="hidden md:block md:w-1/2 ">
          <Animation />
        </div>
      </div>
    </>
  );
};

export default Register;
