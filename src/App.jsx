import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import SidebarState from "./context/sideBarState";
import { DatabaseProvider, FirebaseAppProvider } from "reactfire";
import { realtimeDb, firebaseConfig } from "./firebase";
import Spinner from "./components/spinner";

const Signup = lazy(() => import("./components/Auth/signup"));
const Login = lazy(() => import("./components/Auth/login"));
const Sidebar = lazy(() => import("./components/Auth/sidebar"));
const Home = lazy(() => import("./components/User/home"));
const Cart = lazy(() => import("./components/User/cart"));
const AddFoodItems = lazy(() => import("./components/Admin/addFoodItems"));
const ForgetPassword = lazy(() => import("./components/Auth/forgetPassword"));
const Dashboard = lazy(() => import("./components/Admin/dashboard"));
const Orders = lazy(() => import("./components/Admin/orders"));

function App() {
	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<DatabaseProvider sdk={realtimeDb}>
				<SidebarState>
					<Suspense fallback={<Spinner />}>
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
									path="/forget-password"
									element={<ForgetPassword />}
								/>
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
								<Route path="/orders" element={<Orders />} />
							</Routes>
						</BrowserRouter>
					</Suspense>
				</SidebarState>
			</DatabaseProvider>
		</FirebaseAppProvider>
	);
}

export default App;
