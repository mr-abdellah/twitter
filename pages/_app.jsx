import "../styles/globals.css";
import AuthProvider from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { CheckIcon } from "@heroicons/react/24/outline";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          progressStyle={{
            backgroundColor: "#00ADED",
          }}
          icon={() => <CheckIcon className="text-twitter" />}
        />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
