import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../firebase";

const resetPassword = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate("/");

	const sendPasswordReset = async () => {
		try {
			await sendPasswordResetEmail(Auth, email);
			alert("Password reset link sent!");
			navigate("/signin");
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	};
	return (
		<div className="w-80vw h-80vh flex justify-center mt-20">
			<div className="w-[80vw] md:w-[40vw] h-[50vh] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<h1 className="text-4xl font-medium">Reset password</h1>
				<p className="text-slate-500">
					Fill up the form to reset the password
				</p>

				<form action="" className="my-10">
					<div className="flex flex-col space-y-5">
						<label for="email">
							<p className="font-medium text-slate-700 pb-2">
								Email address
							</p>
							<input
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								name="email"
								type="email"
								className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
								placeholder="Enter email address"
							/>
						</label>

						<button
							type="button"
							onClick={sendPasswordReset}
							className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
								/>
							</svg>

							<span>Reset password</span>
						</button>
						<p className="text-center">
							Not registered yet?{" "}
							<a
								href="#"
								className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
							>
								<span>Register now </span>
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</span>
							</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default resetPassword;
