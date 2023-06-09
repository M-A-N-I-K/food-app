import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBarContext from "../../context/sideBarContext";

const dashboard = () => {
	const navigate = useNavigate();
	const [totalOrders, setTotalOrders] = useState(0);

	const [userIds, setUserIds] = useState([]);
	const adminDashboardContext = useContext(SideBarContext);

	useEffect(() => {
		setTotalOrders(Object.keys(adminDashboardContext.orders).length);
		// console.log(adminDashboardContext.orderId);
		// adminDashboardContext.orderId.map((id) => {
		// 	console.log(id.slice[5]);
		// });
	}, []);

	return (
		<div className="w-[100vw] h-[80vh] flex flex-col justify-center mt-10">
			<div className="w-[80vw] h-[70vh] place-self-center overflow-y-auto shadow-md sm:rounded-lg">
				<div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
					<div>
						<button
							id="dropdownActionButton"
							data-dropdown-toggle="dropdownAction"
							className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
							type="button"
						>
							<span className="sr-only">Action button</span>
							Action
							<svg
								className="w-3 h-3 ml-2"
								aria-hidden="true"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						<div
							id="dropdownAction"
							className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
						>
							<ul
								className="py-1 text-sm text-gray-700 dark:text-gray-200"
								aria-labelledby="dropdownActionButton"
							>
								<li>
									<a
										href="#"
										className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Reward
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Promote
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Activate account
									</a>
								</li>
							</ul>
							<div className="py-1">
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Delete User
								</a>
							</div>
						</div>
					</div>
					<label htmlFor="table-search" className="sr-only">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
						<input
							type="text"
							id="table-search-users"
							className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search for users"
						/>
					</div>
				</div>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="pl-24 pr-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Cart Items
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{Object.values(adminDashboardContext.orders).map(
							(order, key) => {
								{
									return (
										<tr
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
											key={key}
										>
											<th
												scope="row"
												className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
											>
												<img
													className="w-[70px] h-[40px] rounded-full"
													src="https://img2link.com/images/2023/05/02/6dfbe451b71356bb8d6e3d357798d2cd.png"
													alt="Jese image"
												/>
												<div className="pl-3">
													<div className="text-base font-semibold">
														Neil Sims
													</div>
													<div className="font-normal text-gray-500">
														neil.sims@flowbite.com
													</div>
												</div>
											</th>
											<td className="px-6 py-4">13</td>
											<td className="px-6 py-4">
												<div className="flex items-center">
													<div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
													Pending
												</div>
											</td>
											<td className="px-6 py-4">
												<Link
													to="/orders"
													className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
												>
													Resolve Order
												</Link>
											</td>
										</tr>
									);
								}
							}
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default dashboard;
