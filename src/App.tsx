import { FormProvider, useForm } from "react-hook-form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AuthRoute } from "./components/AuthRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Analytics } from "./pages/Analytics";
import { DashboardContent } from "./pages/Dashboard/index";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { LocalizationProvider } from "@mui/lab";
import { Scopes } from "./pages/Scopes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const methods = useForm();

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormProvider {...methods} >
          <Router>
            <Switch>
              <AuthRoute exact path="/" component={SignIn} label="Sign In" />
              <AuthRoute exact path="/signup" component={SignUp} label="Sign Up" />
              <ProtectedRoute exact path="/tasks" component={DashboardContent} label="Tasks" />
              <ProtectedRoute exact path="/scopes" component={Scopes} label="Tasks" />
              <ProtectedRoute exact path="/reports" component={DashboardContent} label="Reports" />
              <ProtectedRoute exact path="/analytics" component={Analytics} label="Analytics" />
            </Switch>
          </Router>
        </FormProvider>
      </LocalizationProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
