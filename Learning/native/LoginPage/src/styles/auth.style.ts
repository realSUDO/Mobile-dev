import { StyleSheet } from "react-native";
export const styles= StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F7F7F7",
		paddingHorizontal: 24,
		paddingTop: 40,
	},

	header: {
		alignItems: "center",
		marginTop: 20,
	},

	logo: {
		width: 70,
		height: 70,
		marginBottom: 20,
	},

	title: {
		fontSize: 40,
		fontWeight: "700",
		color: "#2D2D2D",
		marginBottom: 10,
	},

	subtitle: {
		fontSize: 16,
		color: "#7D7D7D",
		textAlign: "center",
	},

	login: {
		marginTop: 45,
	},

	label: {
		fontSize: 16,
		fontWeight: "600",
		color: "#2D2D2D",
		marginBottom: 12,
	},

	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFF",
		borderWidth: 2,
		borderColor: "#97D700",
		borderRadius: 18,
		paddingHorizontal: 18,
		height: 62,
	},

	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFF",
		borderRadius: 18,
		paddingHorizontal: 18,
		height: 62,
	},

	inputIcon: {
		width: 22,
		height: 22,
		tintColor: "#555",
		marginRight: 12,
	},

	eyeIcon: {
		width: 22,
		height: 22,
		tintColor: "#B0B0B0",
	},

	input: {
		flex: 1,
		fontSize: 16,
		color: "#2D2D2D",
	},

	button: {
		marginTop: 35,
		backgroundColor: "#97D700",
		height: 62,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#FFF",
		fontSize: 18,
		fontWeight: "700",
	},


	footer: {
		marginTop: 50,
		alignItems: "center",
	},

	socialContainer: {
		flexDirection: "row",
		gap: 18,
		marginBottom: 35,
	},

	socialButton: {
		width: 65,
		height: 65,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF",
	},

	socialIcon: {
		width: 28,
		height: 28,
		resizeMode: "contain",
	},

	accountText: {
		fontSize: 15,
		color: "#444",
		marginBottom: 12,
	},

	link: {
		color: "#97D700",
		fontWeight: "700",
	},

	forgot: {
		fontSize: 15,
		color: "#97D700",
		fontWeight: "700",
	},
});
