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
	const itemsVal = JSON.parse(localStorage.getItem("totalItems"));
	const priceVal = JSON.parse(localStorage.getItem("totalPrice"));
	const [isUserLoggedIn, setisUserLoggedIn] = useState(value);
	const [foodItem, setFoodItem] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [userData, setUserData] = useState([]);
	const [isUpdated, setIsUpdated] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalItems, setTotalItems] = useState(itemsVal);
	const [totalPrice, setTotalPrice] = useState(priceVal);
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
				setTotalItems(totalItems + 1);
				setTotalPrice(totalPrice + product.price);
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
				[...new Set(newItems)];
				setCartItems(...cartItems, newItems);
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

	const placeOrder = (cart) => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const pushReference = ref(
					realtimeDb,
					`food-app-static/orders${user.uid}`
				);
				set(pushReference, cart);
				alert("Order Placed Successfully!");
			} else {
				console.log("User is not signed in");
			}
		});
	};

	useEffect(() => {}, [cartItems]);
	useEffect(() => {
		localStorage.setItem("totalPrice", totalPrice);
		localStorage.setItem("totalItems", totalItems);
	}, [totalPrice]);
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
				setCartItems,
				updateInCart,
				placeOrder,
				totalItems,
				totalPrice,
				setTotalItems,
				setTotalPrice,
			}}
		>
			{props.children}
		</SidebarContext.Provider>
	);
};

export default sideBarState;
