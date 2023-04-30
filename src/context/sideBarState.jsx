import { useState, useEffect } from "react";
import SidebarContext from "./sideBarContext";
import { createBrowserHistory } from "history";
import { Auth, db } from "../firebase";
import {
	collection,
	getDocs,
	getDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const sideBarState = (props) => {
	const value = localStorage.getItem("isUserLoggedIn");
	const [isUserLoggedIn, setisUserLoggedIn] = useState(value);
	const [foodItem, setFoodItem] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [userData, setUserData] = useState([]);
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

	const getUserData = async () => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const userId = user.uid;
				const userDocRef = collection(db, "users");
				const q = query(userDocRef, where("uid", "==", userId));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					const user = doc.data();
					setUserData(user);
				});
			} else {
				console.log("User is not signed in");
			}
		});
	};

	useEffect(() => {
		localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
		history.push(`?isUserLoggedIn=${isUserLoggedIn}`);
		getUserData();
	}, [isUserLoggedIn]);

	return (
		<SidebarContext.Provider
			value={{
				isUserLoggedIn,
				setisUserLoggedIn,
				foodItem,
				setFoodItem,
				getFoodItems,
				isAdmin,
				setIsAdmin,
				userData,
			}}
		>
			{props.children}
		</SidebarContext.Provider>
	);
};

export default sideBarState;
