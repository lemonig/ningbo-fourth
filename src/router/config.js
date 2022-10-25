import * as React from "react";
const BodyLayout = React.lazy(() => import("../containers/BodyLayout"));

const LoginToHome = React.lazy(() => import("../pages/loginToHome"));
const Login = React.lazy(() => import("../pages/login"));
const Home = React.lazy(() => import("../pages/home"));
const Check = React.lazy(() => import("../pages/check"));
const Station = React.lazy(() => import("../pages/station"));
const Situation = React.lazy(() => import("../pages/situation"));

const Error = React.lazy(() => import("../pages/error")); //错误
const Error1 = React.lazy(() => import("../pages/error1")); //错误

const config = [
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Login />,
      </React.Suspense>
    ),
  },
  {
    path: "/load",
    element: (
      <React.Suspense fallback={<>...</>}>
        <LoginToHome />,
      </React.Suspense>
    ),
  },
  {
    path: "/error",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Error />,
      </React.Suspense>
    ),
  },
  {
    path: "/errorOther",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Error1 />,
      </React.Suspense>
    ),
  },

  {
    path: "/",
    element: (
      <React.Suspense fallback={<>...</>}>
        <BodyLayout />
      </React.Suspense>
    ),
    children: [
      {
        element: (
          <React.Suspense fallback={<>...</>}>
            <Home />,
          </React.Suspense>
        ),
        index: true,
      },
      {
        path: "check",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Check />,
          </React.Suspense>
        ),
      },
      {
        path: "station",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Station />,
          </React.Suspense>
        ),
      },
      {
        path: "situation",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Situation />,
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
];
export default config;
