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
	set,
	get,
	push,
	remove,
	child,
	update,
} from "firebase/database";

const sideBarState = (props) => {
	const value = localStorage.getItem("isUserLoggedIn");
	const loginVal = value ? JSON.parse(value) : false;
	const itemsVal = localStorage.getItem("totalItems");
	const initialItemsVal = itemsVal ? JSON.parse(itemsVal) : 0;
	const priceVal = localStorage.getItem("totalPrice");
	const initialPriceVal = priceVal ? JSON.parse(priceVal) : 0;
	const Items = localStorage.getItem("storedCartItems");
	const initialCartState = Items ? JSON.parse(Items) : [];
	const [isUserLoggedIn, setisUserLoggedIn] = useState(loginVal);
	const [foodItem, setFoodItem] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [userData, setUserData] = useState([]);
	const [isUpdated, setIsUpdated] = useState(false);
	const [cartItems, setCartItems] = useState(initialCartState);
	const [orders, setOrders] = useState({});
	const [totalItems, setTotalItems] = useState(initialItemsVal);
	const [totalPrice, setTotalPrice] = useState(initialPriceVal);
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

	const updateInCart = (itemId, newQty) => {
		onAuthStateChanged(Auth, async (user) => {
			if (user) {
				const reference = ref(
					realtimeDb,
					`food-app-static/cart${user.uid}`
				);
				onValue(reference, (snapshot) => {
					snapshot.forEach((childSnapshot) => {
						console.log(childSnapshot.val().qty);
						if (childSnapshot.val().itemId === itemId) {
							const itemRef = childSnapshot.ref;
							const updates = {};
							updates["qty"] = newQty;
							update(itemRef, updates);
						}
					});
				});
				const updatedItems = cartItems.map((item) => {
					if (item.itmId === itemId) {
						return { ...item, qty: newQty };
					} else {
						return item;
					}
				});
				setCartItems(updatedItems);
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
					itemId: product.itemId,
				};
				const pushReference = ref(
					realtimeDb,
					`food-app-static/cart${user.uid}`
				);
				push(pushReference, item);
				const cartData = JSON.parse(
					localStorage.getItem("storedCartItems")
				);
				cartData.push(item);
				localStorage.setItem("storedCartItems", JSON.stringify(cartData));
				const totalItems = JSON.parse(localStorage.getItem("totalItems"));
				const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
				localStorage.setItem(
					"totalPrice",
					JSON.stringify(totalPrice + product.price)
				);
				localStorage.setItem("totalItems", JSON.stringify(totalItems + 1));
				setCartItems(cartData);
				alert("Added to cart");
				setTotalItems(totalItems + 1);
				setTotalPrice(totalPrice + product.price);
				setCartItems(cartItems);
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
					`food-app-static/orders/${user.uid}`
				);
				set(pushReference, cart);

				await remove(reference).then(() => {
					alert("Order Placed Successfully!");
				});
				setIsOrderPlaced(true);
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
		localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
		localStorage.setItem("totalItems", JSON.stringify(totalItems));
		localStorage.setItem("storedCartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		JSON.stringify(localStorage.setItem("isUserLoggedIn", isUserLoggedIn));
		history.push(`?isUserLoggedIn=${isUserLoggedIn}`);
		getUserData();
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
