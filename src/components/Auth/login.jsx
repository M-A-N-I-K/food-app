import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import SideBarContext from "../../context/sideBarContext";

const login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const userStatus = useContext(SideBarContext);

	const logInWithEmailAndPassword = async () => {
		try {
			await signInWithEmailAndPassword(Auth, email, password);
			userStatus.setisUserLoggedIn(true);
			navigate("/");
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	};

	return (
		<div className="w-80vw h-80vh flex justify-center mt-20">
			<div className="w-[80vw] md:w-[40vw] h-[60vh] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<form className="space-y-6" action="#">
					<h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
						Sign in to your account
					</h5>
					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="name@company.com"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							required
						/>
					</div>
					<div className="flex items-start">
						<Link
							to="/forget-password"
							className="text-md text-center text-blue-700 hover:underline dark:text-blue-500"
						>
							Forgot Password?
						</Link>
					</div>
					<button
						onClick={logInWithEmailAndPassword}
						type="button"
						className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mb-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Sign In
					</button>

					<div className="text-lg text-center font-medium text-gray-500 dark:text-gray-300">
						Not registered?{" "}
						<Link
							to="/signup"
							className="text-blue-700 hover:underline dark:text-blue-500"
						>
							Create account
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default login;
