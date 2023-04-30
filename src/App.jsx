import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import SidebarState from "./context/sideBarState";

const Signup = lazy(() => import("./components/signup"));
const Login = lazy(() => import("./components/login"));
const Sidebar = lazy(() => import("./components/sidebar"));
const Home = lazy(() => import("./components/home"));
const AddFoodItems = lazy(() => import("./components/addFoodItems"));
const UpdateFoodItems = lazy(() => import("./components/updateFoodItems"));
const ForgetPassword = lazy(() => import("./components/forgetPassword"));

function App() {
	return (
		<SidebarState>
			<Suspense fallback={<div className="text-center">Loading...</div>}>
				<BrowserRouter>
					<Sidebar />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/signin" element={<Login />} />

						<Route path="/signup" element={<Signup />} />
						<Route
							path="/addFoodItems"
							element={
								<PrivateRoute>
									<AddFoodItems />
								</PrivateRoute>
							}
						/>
						<Route
							path="/updateFoodItems"
							element={
								<PrivateRoute>
									<UpdateFoodItems />
								</PrivateRoute>
							}
						/>
						<Route path="/forget-password" element={<ForgetPassword />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</SidebarState>
	);
}

export default App;
