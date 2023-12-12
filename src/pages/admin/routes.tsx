import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import { LoadingScreen } from "../../components/LoadingScreen";
const LazyBasePage = lazy(() => import("./base/Base"));
const LazySubscribersPage = lazy(() => import("./subscribers/Subscribers"));
const LazyGroupCallPage = lazy(() => import("./groupCall/GroupCall"));
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyBasePage
          children={<LazyGroupCallPage pageStatus="all" />}
        ></LazyBasePage>
      </Suspense>
    ),
  },
  {
    path: "/freeTrialUsers",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyBasePage children={<LazyGroupCallPage pageStatus="isOnTrial" />} />
      </Suspense>
    ),
  },
  {
    path: "/purchasedUsers",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyBasePage
          children={<LazyGroupCallPage pageStatus="isPurchased" />}
        />
      </Suspense>
    ),
  },
  {
    path: "/wantToTrySoonUsers",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyBasePage
          children={<LazyGroupCallPage pageStatus="isWannaTry" />}
        ></LazyBasePage>
      </Suspense>
    ),
  },
  // subscribers
  {
    path: "/subscribers",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LazyBasePage children={<LazySubscribersPage />}></LazyBasePage>
      </Suspense>
    ),
  },
];

export default routes;
