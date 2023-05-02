import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, Auth } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const addFoodItems = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState(null);
	const [imgUrl, setImgUrl] = useState("");
	const foodItemsCollectionRef = collection(db, "food-items");

	const uploadImage = async () => {
		if (image == null) {
			return;
		}
		const imgFileName = `foodItems/${image.name + v4()}`;

		const imageRef = ref(storage, imgFileName);
		const uploadTask = uploadBytesResumable(imageRef, image);

		try {
			await uploadTask;
			const downloadUrl = await getDownloadURL(imageRef);
			setImgUrl(downloadUrl);
			alert("Image Uploaded");
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmitFoodItem = async () => {
		try {
			await addDoc(foodItemsCollectionRef, {
				description: description,
				name: name,
				price: price,
				imgUrl: imgUrl,
				userId: Auth?.currentUser?.uid,
			});
			setName("");
			setDescription("");
			setPrice(0);
			setImage(null);
			setImgUrl("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="w-80vw h-80vh flex justify-center mt-20">
			<div className="w-[80vw] md:w-[40vw] h-[75vh] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<form className="space-y-6" action="#">
					<h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
						Add Food Items
					</h5>
					<div>
						<label
							htmlFor="Name"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Name of Food Item
						</label>
						<input
							type="text"
							name="name"
							id="name"
							onChange={(e) => setName(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Eg. Pasta"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="Description"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Description
						</label>
						<input
							type="text"
							name="description"
							id="description"
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Write a description about food item you are adding"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="Price"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Price (In Rs)
						</label>
						<input
							type="number"
							name="price"
							id="price"
							onChange={(e) => setPrice(e.target.value)}
							placeholder="100"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							required
						/>
					</div>
					<div className="pb-10">
						<label
							htmlFor="Image"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Image
						</label>
						<div className="flex justify-between">
							<input
								type="file"
								name="image"
								id="image"
								onChange={(e) => {
									setImage(e.target.files[0]);
								}}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[45vw] sm:w-[15vw] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
							<button
								type="button"
								onClick={uploadImage}
								className="w-[25vw] sm:w-[15vw] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Upload Image
							</button>
						</div>
					</div>
					<Link to="/">
						<button
							onClick={onSubmitFoodItem}
							type="submit"
							className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Add Food Item
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default addFoodItems;
