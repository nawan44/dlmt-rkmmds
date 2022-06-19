import "./App.css";
import Router from "./Router";
import AuthState from "./context/auth/AuthState";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <AuthState>
        <Router />
      </AuthState>
    </SnackbarProvider>
  );
}

export default App;
