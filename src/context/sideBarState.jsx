import { useState, useEffect } from "react";
import SidebarContext from "./sideBarContext";
import { createBrowserHistory } from "history";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const sideBarState = (props) => {
	const value = localStorage.getItem("isUserLoggedIn");
	const [isUserLoggedIn, setisUserLoggedIn] = useState(value);
	const [foodItem, setFoodItem] = useState([]);
	const foodItemsCollectionRef = collection(db, "food-items");

	const history = createBrowserHistory();

	const getFoodItems = async () => {
		try {
			const data = await getDocs(foodItemsCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setFoodItem(filteredData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
		history.push(`?isUserLoggedIn=${isUserLoggedIn}`);
	}, [isUserLoggedIn]);

	return (
		<SidebarContext.Provider
			value={{
				isUserLoggedIn,
				setisUserLoggedIn,
				foodItem,
				setFoodItem,
				getFoodItems,
			}}
		>
			{props.children}
		</SidebarContext.Provider>
	);
};

export default sideBarState;
