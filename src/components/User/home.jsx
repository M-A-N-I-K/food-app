import React, { useEffect, useContext } from "react";
import SideBarContext from "../../context/sideBarContext";

const auth = () => {
	const foodItemsList = useContext(SideBarContext);

	useEffect(() => {
		foodItemsList.getFoodItems();
	}, []);

	const addItem = (item) => {
		foodItemsList.addToCart(item);
	};

	return (
		<div className="grid grid-cols-1 place-items-center mr-0 md:mr-20 mb-10 lg:place-items-end lg:grid-cols-2">
			{foodItemsList.foodItem.map((item) => (
				<div
					key={item.id}
					className="h-[50vh] w-[90vw] lg:w-[50vw] flex justify-center mt-20"
				>
					<div className="w-full max-w-2xl lg:max-w-md xl:max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<div className="flex justify-center">
							<img
								className="p-8 object-contain h-48 w-96 rounded-t-lg"
								src={item.imgUrl}
								alt="product image"
							/>
						</div>
						<div className="px-5 pb-5">
							<a href="#">
								<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
									{item.name}
								</h5>
							</a>
							<div className="flex items-center mt-2.5 mb-5">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-yellow-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>First star</title>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-yellow-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Second star</title>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-yellow-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Third star</title>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-yellow-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Fourth star</title>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-yellow-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Fifth star</title>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
								<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
									5.0
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-3xl font-bold text-gray-900 dark:text-white">
									Rs. {item.price}
								</span>
								{!foodItemsList.userData.isAdmin && (
									<button
										onClick={() => addItem(item)}
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Add to cart
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default auth;
