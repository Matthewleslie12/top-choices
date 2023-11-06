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

  return (
    <>
      <div className="flex flex-col overflow-auto h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : userInfo ? (
          <div className="flex flex-col pt-4 bg-dullGreen px-2 h-screen">
            <div className="bg-white  rounded-t-xl h-full">
              <h1 className="font-semibold text-lg mx-4 pt-4">
                Where did you go?
              </h1>
              <Form />
            </div>
          </div>
        ) : null}
      </div>
      <Nav />
    </>
  );
};

export default Home;
