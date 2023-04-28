import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const signUp = async () => {
		if (password !== confirmPassword) {
			return setError("Password do not match");
		}
		try {
			setError("");
			setLoading(true);
			await createUserWithEmailAndPassword(Auth, email, password);
			navigate("/signin");
		} catch (err) {
			setError("Failed to create an account!");
		}
		setLoading(false);
	};

	console.log(email);
	console.log(password);
	return (
		<div className="w-80vw h-80vh flex justify-center mt-20">
			<div className="w-[80vw] md:w-[40vw] h-[70vh] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<form className="space-y-6" action="#">
					<h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
						Sign up
					</h5>
					{error && (
						<div
							id="alert-2"
							className="flex p-4 mb-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
							role="alert"
						>
							<svg
								aria-hidden="true"
								className="flex-shrink-0 w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="sr-only">Info</span>
							<div className="ml-3 text-sm font-medium">{error}</div>
						</div>
					)}
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
					<div>
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirm-password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							required
						/>
					</div>
					<button
						disabled={loading}
						onClick={signUp}
						className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Sign up
					</button>
					<div className="text-lg font-medium text-center text-gray-500 dark:text-gray-300">
						Already have an account?{" "}
						<Link
							to="/signin"
							className="text-blue-700 hover:underline dark:text-blue-500"
						>
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default signin;
