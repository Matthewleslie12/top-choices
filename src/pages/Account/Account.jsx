import {useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/authProvider";
import {useEffect, useState} from "react";
import Nav from "../../components/navbar/Nav";

const Account = () => {
  const {setToken, userInfo} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setToken();
    navigate("/", {replace: true});
  };

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo, setLoading]);
  return (
    <div className="h-screen ">
      {loading ? (
        <p>Loading...</p>
      ) : userInfo ? (
        <div className="flex-col flex px-4 pt-4">
          <h1 className=" py-4 font-bold text-xl">Profile</h1>

          <div className="space-y-4 mt-8 rounded-xl">
            <div className="flex-row flex justify-between capitalize items-center">
              <p>Name</p>

              <p className=""> {userInfo.name} </p>
            </div>

            <div className="flex-row flex justify-between">
              <p className="font-bold">Email</p>
              <p className=""> {userInfo.email} </p>
            </div>

            {/* //TODO: add a theme switcher and allow users to chnge their details */}
          </div>
          <button
            onClick={handleLogout}
            className="bg-rose-400 rounded-lg w-1/2 flex mx-auto text-white font-bold p-3 justify-center mt-12 hover:bg-rose-600"
          >
            Logout{" "}
          </button>
        </div>
      ) : (
        <p>User information not available.</p>
      )}
      <Nav />
    </div>
  );
};

export default Account;
