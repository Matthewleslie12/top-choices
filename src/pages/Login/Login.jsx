import Animation from "../../components/animation/Animation";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import Text from "../../components/text/Text";
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";

function Login() {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const {setToken, setUserInfo, userId, setUserId} = useAuth();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          const {name, email, userId} = res.data;
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          setUserInfo({name, email, userId});
          setUserId(userId);
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
          <h3 className="text-slate font-semibold pb-2 lg:text-xl">Email</h3>
          <input
            type="email"
            className="border-paleGreen border-2 rounded-lg items-center pl-4 text-darkGreen h-12 lg:h-16"
            placeholder="jondoe@gmail.com"
            onChange={(e) => setValues({...values, email: e.target.value})}
          />
          <h3 className="mt-4 text-slate font-semibold pb-2 lg:text-xl">
            Password
          </h3>
          <input
            type="password"
            className="border-paleGreen border-2 rounded-lg pl-4 text-darkGreen h-12  lg:h-16"
            onChange={(e) => setValues({...values, password: e.target.value})}
          />
          <p className="text-darkGreen text-sm underline decoration-slate pt-3 flex justify-end md:pt-4 lg:text-lg">
            Forgot Password?
          </p>

          <section className="flex flex-row md:mt-8 ">
            <Button className="bg-mintGreen text-white hover:bg-darkGreen hover:border ">
              Login
            </Button>
            <Link to="/register " className="w-full pl-2">
              <Button className="bg-transparent text-mintGreen border border-mintGreen hover:bg-darkGreen hover:border-none hover:text-white">
                Sign Up
              </Button>
            </Link>
          </section>
          <p className="text-red-600 mb-4">{error && error}</p>
        </form>

        <div className="flex flex-col px-4 lg:pt-4 md:flex-row  md:px-6">
          <p className="mx-auto text-dullGreen text-sm  md:mx-0 lg:text-md">
            Or, login with
          </p>

          <button
            className="pt-3 md:pt-0 md:pl-2"
            onClick={() => {
              //   signIn("google");
            }}
          >
            <p className=" text-darkGreen font-semibold text-sm lg:text-md">
              Google
            </p>
          </button>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 ">
        <Animation />
      </div>
    </div>
  );
}

export default Login;
