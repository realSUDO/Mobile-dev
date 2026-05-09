import { useState } from "react";

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	function onToggleTheme() {
		setDarkMode(!darkMode);
		console.log(darkMode);
	}

	return (
		<div
			style={{
				height: "100vh",
				backgroundColor: darkMode ? "#303030" : "#f0f0f0",
				color: darkMode ? "white" : "black",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "1rem",
				transition: "all 0.3s ease-in-out",
			}}
		>
			<button onClick={onToggleTheme}>Toggle theme</button>
		</div>
	);
};

export default App;
