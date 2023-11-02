import React from "react";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { useContext } from "react";
import { UserContext } from "../context";
import { confirmAlert } from "react-confirm-alert";
var bcrypt = require("bcryptjs");

export function CreateAdminAccount() {
	const { user, setUser } = useContext(UserContext);
	const [usernameInput, setUsernameInput] = React.useState("");
	const [passInput, setPassInput] = React.useState("");
	const [userCreated, setUserCreated] = React.useState(false);

	return (
		<>
			<div className="page-background"></div>
			<div className="dialogue-box-admin">
				<div className="admin-accessories">
					<AccessoriesForDialogueBox />
				</div>
				<div className="admin-wrapper">
					{!userCreated ? (
						<>
							<div className="global-header">
								<p className="global-header">Create Account:</p>
							</div>
							<form className="admin-form">
								<div className="admin-input-family">
									<div className="rectangular-label-wrapper">
										<p className="label-text-white">Username</p>
									</div>
									<input
										type="input"
										className="discord-name-input"
										placeholder="Enter username"
										onChange={(e) => setUsernameInput(e.currentTarget.value)}
									/>
								</div>
								<div className="admin-input-family">
									<div className="rectangular-label-wrapper">
										<p className="label-text-white">Password</p>
									</div>
									<input
										type="password"
										className="discord-name-input"
										placeholder="Enter password"
										onChange={(e) => setPassInput(e.currentTarget.value)}
									/>
									<input
										type="password"
										className="discord-name-input"
										placeholder="Confirm password"
										id="password-confirmation"
									/>
								</div>
							</form>
							<HeartBorder />
							<div className="submit-wrapper">
								<div className="btn-shadow">
									<button
										type="button"
										className="submit-btn"
										onClick={createAccount}
									>
										Start Dash!
									</button>
								</div>
							</div>
						</>
					) : (
						<>
							<p className="global-header">
								User successfully made! Please go to the log in page to use your
								account
							</p>
						</>
					)}
				</div>
			</div>
		</>
	);

	/**
	 * Attempts to creat a new user
	 * The function checks the username and password that are input by the user against
	 * the data in the database and sets the user as logged in, allowing for more functionality if so
	 */
	function createAccount() {
		let passwordConfirmation = document.getElementById(
			"password-confirmation"
		).value;
		if (passInput !== "" && usernameInput !== "") {
			if (passInput !== passwordConfirmation) {
				alert("Your passwords don't match! Please try typing them again");
				return;
			}
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(passInput, salt, function (err, hash) {
					// Store hash in DB.
					const url = `http://localhost:8080/write/admin`;
					let loginObject = { manager: usernameInput, password: hash };
					console.log(loginObject);
					(async () => {
						const response = await fetch(url, {
							method: "POST",
							mode: "cors",
							headers: {
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin": "*",
								"Access-Control-Allow-Credentials": true,
							},
							body: JSON.stringify(loginObject),
						});
						const data = await response.json();
						console.log(data);
						if (data.error?.data) {
							let errorMessage = data.error?.data;
							confirmAlert({
								message: errorMessage,
								buttons: [
									{
										label: "Okay",
									},
								],
							});
						} else {
							setUserCreated(true);
						}
					})();
				});
			});
		} else {
			alert("Please enter an email and password");
		}
	}
}
