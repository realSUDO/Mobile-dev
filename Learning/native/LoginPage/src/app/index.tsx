import {
	Text,
	View,
	Image,
	TextInput,
	Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { styles } from "@/styles/auth.style";

export default function Index() {
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			{/* ---------------- header ---------------- */}
			<View style={styles.header}>
				<Image
					source={require("@/assets/strikethrough.png")}
					style={styles.logo}
					resizeMode="contain"
				/>

				<Text style={styles.title}>Sign In</Text>

				<Text style={styles.subtitle}>
					Let's experience the joy of sudo.ai
				</Text>
			</View>

			{/* ---------------- login ------------------------ */}
			<View style={styles.login}>
				{/* Email */}
				<Text style={styles.label}>Email Address</Text>

				<View style={styles.inputContainer}>
					<Image
						source={require("@/assets/mail.png")}
						style={styles.inputIcon}
					/>

					<TextInput
						placeholder="Enter your email"
						value={email}
						onChangeText={setEmail}
						placeholderTextColor="#9A9A9A"
						keyboardType="email-address"
						style={styles.input}
					/>
				</View>

				{/* ------------------ password  -----------------------*/}
				<Text style={[styles.label, { marginTop: 20 }]}>Password</Text>

				<View style={styles.passwordContainer}>
					<Image
						source={require("@/assets/lock.png")}
						style={styles.inputIcon}
					/>

					<TextInput
						placeholder="Enter your password"
						value={password}
						onChangeText={setPassword}
						placeholderTextColor="#9A9A9A"
						secureTextEntry={!showPassword}
						style={styles.input}
					/>

					<Pressable onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={
								showPassword
									? require("@/assets/eye.png")
									: require("@/assets/hide.png")
							}
							style={styles.eyeIcon}
						/>
					</Pressable>
				</View>

				{isSignUp && (
					<>
						<Text style={[styles.label, { marginTop: 20 }]}>
							Confirm Password
						</Text>

						<View style={styles.passwordContainer}>
							<Image
								source={require("@/assets/lock.png")}
								style={styles.inputIcon}
							/>

							<TextInput
								placeholder="Confirm your password"
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholderTextColor="#9A9A9A"
								secureTextEntry={!showPassword}
								style={styles.input}
							/>
						</View>
					</>
				)}

				{/*---------------- button ------------------ */}
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Text>
				</Pressable>
			</View>

			{/*--------- social --------------*/}
			<View style={styles.footer}>
				<View style={styles.socialContainer}>
					<Pressable style={styles.socialButton}>
						<Image
							source={require("@/assets/facebook.png")}
							style={styles.socialIcon}
						/>
					</Pressable>

					<Pressable style={styles.socialButton}>
						<Image
							source={require("@/assets/google.png")}
							style={styles.socialIcon}
						/>
					</Pressable>

					<Pressable style={styles.socialButton}>
						<Image
							source={require("@/assets/instagram.png")}
							style={styles.socialIcon}
						/>
					</Pressable>
				</View>

				<Text style={styles.accountText}>
					{isSignUp ? "Already have an account?" : "Don't have an account"}{" "}
					<Text style={styles.link} onPress={() => setIsSignUp(!isSignUp)}>
						{isSignUp ? "Sign In" : "Sign Up"}
					</Text>
				</Text>

				<Pressable>
					<Text style={styles.forgot}>Forgot your password?</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}


