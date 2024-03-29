import { Suspense, lazy } from "react";
import { createMemoryHistory } from "history";
import { ISwitchItem } from "react-history-switch";
import { LoadingScreen } from "./components/LoadingScreen";
export const history = createMemoryHistory();

const AdminPage = lazy(() => import("./pages/AdminPage"));
const HomePage = lazy(() => import("./pages/MainPage"));
export const routes: ISwitchItem[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    element: () => (
      <Suspense fallback={<LoadingScreen />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: () => (
      <Suspense fallback={<LoadingScreen />}>
        <AdminPage />
      </Suspense>
    ),
  },
];

export interface routeMethods extends Window {
  openUserPanel: () => void;
  openAdminPanel: () => void;
}

export interface docMethod extends Document {
  openUserPanel: () => void;
  openAdminPanel: () => void;
}
(window as unknown as routeMethods).openUserPanel = () => history.push("/");
(window as unknown as routeMethods).openAdminPanel = () =>
  history.push("/admin");
(document as unknown as docMethod).openAdminPanel = () =>
  history.push("/admin");

export default routes;
