import {useEffect, useState} from "react";
import {useAuth} from "../../provider/authProvider";
import Nav from "../../components/navbar/Nav";
import Form from "../../components/form/Form";

const Home = () => {
  const token = localStorage.getItem("token");
  const {userInfo, userId} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo || token) {
      setLoading(false);
    }
  }, [userInfo, token]);
  console.log("user id: ", userId);
  return (
    <>
      <div className="h-screen flex flex-col ">
        {loading ? (
          <p>Loading...</p>
        ) : userInfo ? (
          <div className="flex flex-col pt-4">
            <h1 className="font-semibold text-lg mx-4">
              Enter the details of the place you visited!
            </h1>
            <Form />
          </div>
        ) : null}
      </div>

      <Nav />
    </>
  );
};

export default Home;
