import React from "react";
import { UserContext } from "../context.jsx";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { GlobalContext } from "../context.jsx";
import { useContext } from "react";
import { useEffect } from "react";
import { isBlankIsNull } from "../util/checkStrings.js";
import { AdminNotice } from "../components/AdminNotice.jsx";
export function JoinRun() {
	let ctx = React.useContext(UserContext);
	const { user, setUser } = useContext(UserContext);
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [eventState, setEventState] = React.useState("");
	const [events, setEvents] = React.useState([]);
	//States for manager and the user
	const [manager, setManager] = React.useState("");
	const [discord, setDiscord] = React.useState("");
	const [runPassword, setRunPassword] = React.useState("");
	const [successfulAdd, setSuccessfulAdd] = React.useState(false);

	useEffect(
		() =>
			async function grabTeams() {
				const url = `http://localhost:8080/return/event/names/and/hours`;
				const res = await fetch(url, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(),
				});
				const data = await res.json();
				setEvents(data);
				return data;
			},
		[]
	);

	return (
		<>
			{user.loggedIn ? (
				<>
					{!successfulAdd ? (
						<>
							<div className="page-background"></div>
							<div className="dialogue-box-cc">
								<AccessoriesForDialogueBox />
								<section className="top-dialogue-join">
									<div className="global-header scale-up">
										Join an existing run!
									</div>
									<div className="top-label-wrapper">
										<div className="rectangular-label-wrapper full">
											<p className="label-text-white">Manager Name </p>
										</div>
										<div className="rectangular-label-wrapper full">
											<p className="label-text-white">Event </p>
										</div>
									</div>
									<div className="top-input-wrapper-join">
										<input
											className="manager-name-input-join"
											type="text"
											placeholder="Lead manager name..."
											onChange={(e) => setManager(e.currentTarget.value)}
											required
										></input>
										<div className="event-selection-join">
											<select
												onChange={(e) => handleChange(e)}
												className="event-selection"
											>
												<option
													className="first-event-text"
													default
													key="first-event-select"
												>
													Please select...
												</option>
												{[...events].map((e, i) => (
													<option key={`${i}-event`}>{events[i].event}</option>
												))}
											</select>
										</div>
									</div>
								</section>
								<div className="flex-column-container">
									<div className="global-header">
										Please enter the run passowrd:
									</div>
									<input
										type="text"
										placeholder="Run password..."
										onChange={(e) => setRunPassword(e.currentTarget.value)}
										required
										className="run-password-input discord-name-input"
										id="run-password-input"
									></input>
								</div>

								<div className="submit-wrapper">
									<div className="btn-shadow">
										<button
											className="submit-btn"
											type="submit"
											onClick={addManagerToRun}
										>
											Start Dash!
										</button>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="page-background"></div>
							<div className="page-back-admin-notice">
								<div className="admin-notice-container">
									<p className="global-header">You've been added to the run!</p>
									<p>
										You should see the run in the list of events when you click
										"Change Event"! Please be aware, you can join multiple of
										the same event, so look at the lead manager name to ensure
										you're editing the correct run.
									</p>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<>
					<AdminNotice />
				</>
			)}
		</>
	);

	function handleChange(e) {
		let value = e.target.value;
		setEventState(value);
	}

	async function addManagerToRun() {
		if (
			isBlankIsNull(manager) ||
			isBlankIsNull(runPassword) ||
			isBlankIsNull(eventState)
		) {
			alert("Please enter values into all three boxes");
			return;
		}

		let quereyObject = {
			leadManager: manager,
			event: eventState,
			newManager: user.user,
			runPassword,
		};

		console.log("Querey obj:", quereyObject);
		const url = `http://localhost:8080/write/manager/to/run`;
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(quereyObject),
		});
		const data = await res.json();
		if (data.error?.data) {
			alert(data.error.data);
			return;
		}
		console.log("CTX: ", data);
		const newRegisteredEvents = user.registeredEvents.slice();
		newRegisteredEvents.push(eventState);
		const sortedAssociatedUsers = data[0].associatedUsers.sort();
		setUser({
			...user,
			event: eventState,
			registeredEvents: newRegisteredEvents,
			scheduleArray: data[0].schedule,
			runner: data[0].runner,
			leadManager: data[0].leadManager,
			associatedUsers: sortedAssociatedUsers,
			activeTeamDropdown: data[0].activeTeamDropdown,
			notesPerHour: data[0].notesPerHour,
			teamsPerHour: data[0].teamsPerHour,
		});
		setSuccessfulAdd(true);
		return data;
	}
	// if (data.error?.data) {
	// 	alert(data.error?.data);
	// } else {
	//
	// }
}
