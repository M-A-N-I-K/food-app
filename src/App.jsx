import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import SidebarState from "./context/sideBarState";

const Signup = lazy(() => import("./components/Auth/signup"));
const Login = lazy(() => import("./components/Auth/login"));
const Sidebar = lazy(() => import("./components/Auth/sidebar"));
const Home = lazy(() => import("./components/User/home"));
const Cart = lazy(() => import("./components/User/cart"));
const AddFoodItems = lazy(() => import("./components/Admin/addFoodItems"));
const ForgetPassword = lazy(() => import("./components/Auth/forgetPassword"));
const Dashboard = lazy(() => import("./components/Admin/dashboard"));

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
						<Route path="/forget-password" element={<ForgetPassword />} />
						<Route
							path="/dashboard"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route
							path="/cart"
							element={
								<PrivateRoute>
									<Cart />
								</PrivateRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</Suspense>
		</SidebarState>
	);
}

export default App;
