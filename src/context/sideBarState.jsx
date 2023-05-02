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
import { onValue, ref, set, push, remove } from "firebase/database";

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
	const [orders, setOrders] = useState({});
	const [totalItems, setTotalItems] = useState(itemsVal);
	const [totalPrice, setTotalPrice] = useState(priceVal);
	const [userOrderData, setUserOrderData] = useState([]);
	const [orderId, setOrderId] = useState([]);
	const foodItemsCollectionRef = collection(db, "food-items");
	const history = createBrowserHistory();
	const [isOrderPlaced, setIsOrderPlaced] = useState(false);
	const [isNewItemAdded, setIsNewItemAdded] = useState(false);

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

	const sendUserData = async () => {
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
				localStorage.setItem(
					"totalPrice",
					JSON.stringify(totalPrice + product.price)
				);
				localStorage.setItem("totalItems", JSON.stringify(totalItems + 1));
				push(pushReference, item);
				alert("Item added to cart");
			} else {
				console.log("User is not signed in");
			}
		});
	};

	const removeCartItems = async (cart) => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const reference = ref(
					realtimeDb,
					`food-app-static/cart${user.uid}`
				);

				const pushReference = ref(
					realtimeDb,
					`food-app-static/orders/order${user.uid}`
				);
				set(pushReference, cart);
				setIsOrderPlaced(true);

				remove(reference).then(() => {
					alert("Order Placed Successfully!");
				});
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

	const displayOrder = async () => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const reference = ref(realtimeDb, `food-app-static/orders`);
				onValue(reference, (snapshot) => {
					setOrders(snapshot.val());
				});
				setOrderId(Object.keys(orders));
			} else {
				console.log("User is not signed in");
			}
		});
	};

	useEffect(() => {
		localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
		history.push(`?isUserLoggedIn=${isUserLoggedIn}`);
		getUserData();
		displayCart();
		displayOrder();
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
				totalItems,
				totalPrice,
				setTotalItems,
				setTotalPrice,
				orders,
				setOrderId,
				orderId,
				isOrderPlaced,
				setIsOrderPlaced,
				isNewItemAdded,
				setIsNewItemAdded,
				removeCartItems,
			}}
		>
			{props.children}
		</SidebarContext.Provider>
	);
};

export default sideBarState;
