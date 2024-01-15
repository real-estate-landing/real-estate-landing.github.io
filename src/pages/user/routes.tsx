import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import { LoadingScreen } from "../../components/LoadingScreen";
const LazyMainPage = lazy(() => import("./main/Index"));
const LazyPolicyPage = lazy(() => import("./policy/Index"));
const LazyTermsPage = lazy(() => import("./terms/Index"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyMainPage />
      </Suspense>
    ),
  },
  {
    path: "/policy",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyPolicyPage />
      </Suspense>
    ),
  },
  {
    path: "/terms",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyTermsPage />
      </Suspense>
    ),
  },
];

export default routes;
