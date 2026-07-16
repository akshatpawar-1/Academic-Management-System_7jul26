import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/constants";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Marks from "./pages/Marks";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Admins from "./pages/Admins";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {

    return (
        <BrowserRouter>

            <NavBar />

            <Routes>

                <Route path={ROUTES.HOME} element={<Home />} />

                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    }
                />

                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.STUDENTS}
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.MARKS}
                    element={
                        <ProtectedRoute>
                            <Marks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.REPORTS}
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

		<Route
    		    path={ROUTES.ADMINS}
		    element={
   		    	<ProtectedRoute>
            		<Admins />
        		</ProtectedRoute>
    		    }
		/>

                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>
    );

}
export default App;