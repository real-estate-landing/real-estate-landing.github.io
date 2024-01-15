import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import { LoadingScreen } from "../../components/LoadingScreen";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ContactModal from "../../base_components/ContactModal";
const LazyMainPage = lazy(() => import("./main/Index"));
const LazyPolicyPage = lazy(() => import("./policy/Index"));
const LazyTermsPage = lazy(() => import("./terms/Index"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        <LazyMainPage />
        <Footer />
        <ContactModal />
      </Suspense>
    ),
  },
  {
    path: "/policy",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        <LazyPolicyPage />
        <Footer />
        <ContactModal />
      </Suspense>
    ),
  },
  {
    path: "/terms",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        <LazyTermsPage />
        <Footer />
        <ContactModal />
      </Suspense>
    ),
  },
];

export default routes;
