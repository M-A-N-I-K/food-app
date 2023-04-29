import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Signup = lazy(() => import("./components/signup"));
const Login = lazy(() => import("./components/login"));
const Sidebar = lazy(() => import("./components/sidebar"));
const Home = lazy(() => import("./components/home"));
const AddFoodItems = lazy(() => import("./components/addFoodItems"));
const UpdateFoodItems = lazy(() => import("./components/updateFoodItems"));

function App() {
	return (
		<BrowserRouter>
			<Sidebar />
			<Suspense fallback={<div className="text-center">Loading...</div>}>
				<Routes>
					<Route exact path="/" element={<Home />} />
				</Routes>
			</Suspense>
			<Suspense fallback={<div className="text-center">Loading...</div>}>
				<Routes>
					<Route path="/signin" element={<Login />} />
				</Routes>
			</Suspense>
			<Suspense fallback={<div className="text-center">Loading...</div>}>
				<Routes>
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</Suspense>
			<Suspense fallback={<div className="text-center">Loading...</div>}>
				<Routes>
					<Route path="/addFoodItems" element={<AddFoodItems />} />
				</Routes>
			</Suspense>
			<Suspense fallback={<div className="text-center">Loading...</div>}>
				<Routes>
					<Route path="/updateFoodItems" element={<UpdateFoodItems />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
