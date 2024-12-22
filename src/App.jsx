import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ConfirmProvider } from "material-ui-confirm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <RouterProvider router={router} />
      </ConfirmProvider>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
