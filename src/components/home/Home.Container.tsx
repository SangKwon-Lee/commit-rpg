import axios from "axios";
import qs from "qs";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const HomeContainer = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  const { access_token } = qs.parse(pathname.search, {
    ignoreQueryPrefix: true,
  });

  const getToken = useCallback(async () => {
    try {
      const result = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
      console.log(access_token);
      console.log(result);
      localStorage.setItem("access_token", String(access_token));
      navigate("/");
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (access_token) {
      getToken();
    }
  }, [access_token, getToken]);

  return (
    <>
      <div>홈</div>
      <a
        href={
          "http://localhost:1337/api/connect/github"
          // "https://github.com/login/oauth/authorize?client_id=8ba7614267b82e92cc58"
        }
      >
        로그인
      </a>
    </>
  );
};
export default HomeContainer;
