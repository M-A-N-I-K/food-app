import { useState, useEffect } from "react";
import SidebarContext from "./sideBarContext";
import { createBrowserHistory } from "history";
import { Auth, db, realtimeDb } from "../firebase";
import {
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
	onValue,
	ref,
	orderByChild,
	set,
	push,
	update,
	child,
} from "firebase/database";

const sideBarState = (props) => {
	const value = localStorage.getItem("isUserLoggedIn");
	const [isUserLoggedIn, setisUserLoggedIn] = useState(value);
	const [foodItem, setFoodItem] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [userData, setUserData] = useState([]);
	const [isUpdated, setIsUpdated] = useState(false);
	const [cartItems, setCartItems] = useState([]);
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

	const addToCart = async (product) => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const item = {
					name: product.name,
					description: product.description,
					price: product.price,
					imgUrl: product.imgUrl,
					qty: 1,
					itemId: product.userId,
				};
				const pushReference = ref(
					realtimeDb,
					`food-app-static/cart${user.uid}`
				);
				push(pushReference, item);
				alert("Item added to cart");
			} else {
				console.log("User is not signed in");
			}
		});
	};

	const displayCart = async () => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const reference = ref(
					realtimeDb,
					`food-app-static/cart${user.uid}`
				);
				const newItems = [];
				onValue(reference, (snapshot) => {
					snapshot.forEach((childSnapshot) => {
						const newItem = {
							name: childSnapshot.val().name,
							description: childSnapshot.val().description,
							price: childSnapshot.val().price,
							imgUrl: childSnapshot.val().imgUrl,
							qty: childSnapshot.val().qty,
							itemId: childSnapshot.val().itemId,
						};
						newItems.push(newItem);
					});
				});
				setCartItems(newItems);
			} else {
				console.log("User is not signed in");
			}
		});
	};

	const updateInCart = (itemId, newQty) => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const reference = ref(
					realtimeDb,
					`food-app-static/cart${user.uid}`
				);
			} else {
				console.log("User is not signed in");
			}
		});
	};
	useEffect(() => {}, [cartItems]);
	useEffect(() => {
		localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
		history.push(`?isUserLoggedIn=${isUserLoggedIn}`);
		getUserData();
		displayCart();
	}, [isUserLoggedIn]);

	const removeFromCart = async (product) => {};

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
				isUpdated,
				setIsUpdated,
				addToCart,
				cartItems,
				updateInCart,
				setCartItems,
			}}
		>
			{props.children}
		</SidebarContext.Provider>
	);
};

export default sideBarState;
