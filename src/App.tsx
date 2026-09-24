import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRefreshSession } from "./hooks/useRefreshSession";
import PageLoader from "./components/PageLoader";
import { router } from "./routes/Router";

const App = () => {
  const { isRefreshing } = useRefreshSession();

  if (isRefreshing) {
    return <PageLoader />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="!bg-[#0E1624] !text-white !rounded-xl"
      />
    </>
  );
};

export default App;