import { useState, useEffect } from "react";
import SidebarContext from "./sideBarContext";
import { createBrowserHistory } from "history";

const sideBarState = (props) => {
	const value = localStorage.getItem("isUserLoggedIn");
	const [isUserLoggedIn, setisUserLoggedIn] = useState(value);
	const history = createBrowserHistory();

	useEffect(() => {
		localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
		history.push(`?isUserLoggedIn=${isUserLoggedIn}`);
	}, [isUserLoggedIn]);

	return (
		<SidebarContext.Provider value={{ isUserLoggedIn, setisUserLoggedIn }}>
			{props.children}
		</SidebarContext.Provider>
	);
};

export default sideBarState;
