import React from "react";
import { Suspense, lazy } from "react";

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<span></span>}>
      <Component {...props} />
    </Suspense>
  );

const Home = Loadable(
  lazy(() => import("../src/components/home/Home.Container"))
);
const GithubLogin = Loadable(
  lazy(() => import("../src/components/login/Login.Container"))
);

const GetJWT = Loadable(
  lazy(() => import("../src/components/commons/GetToken"))
);

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <GithubLogin />,
  },
  {
    path: "/success",
    element: <GetJWT />,
  },
  // {
  //   path: "*",
  //   children: [
  //     {
  //       path: "401",
  //       element: <NotFound />,
  //     },
  //     {
  //       path: "404",
  //       element: <NotFound />,
  //     },
  //     {
  //       path: "500",
  //       element: <NotFound />,
  //     },
  //     {
  //       path: "*",
  //       element: <NotFound />,
  //     },
  //   ],
  // },
];

export default routes;
