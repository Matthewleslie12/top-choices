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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : userInfo ? (
        <>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleLogout}>Logout </button>
        </>
      ) : (
        <p>User information not available.</p>
      )}
      <Nav />
    </>
  );
};

export default Account;
