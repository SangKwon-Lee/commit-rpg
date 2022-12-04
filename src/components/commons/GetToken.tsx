import qs from "qs";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
const GetToken = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getJWT = async () => {
      const { access_token } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      try {
        const { data: jwt } = await axios.get(
          `http://localhost:1337/api/auth/github/callback${location.search}`
        );
        const { data } = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        });
        await axios.post("http://localhost:1337/api/github-users", {
          data,
        });
        console.log(data);
        localStorage.setItem("jwt", jwt.jwt);
        localStorage.setItem("access_token", String(access_token));
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    };
    getJWT();
  }, [navigate, params.providerName, location.search]);

  return null;
};
export default GetToken;
