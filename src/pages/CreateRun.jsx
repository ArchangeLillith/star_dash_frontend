import React from "react";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { useContext } from "react";
import { UserContext, GlobalContext } from "../context";
import { AdminNotice } from "../components/AdminNotice.jsx";
import { confirmAlert } from "react-confirm-alert";

export function CreateRun() {
	const { user, setUser } = useContext(UserContext);
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [eventState, setEventState] = React.useState("");
	const [successState, setSuccessState] = React.useState(false);

	const array = React.useRef([]);

	return (
		<>
			{user.loggedIn ? (
				<>
					{successState ? (
						<>
							<p className="global-header">Success! Event created~</p>
						</>
					) : (
						<>
							<>
								<div className="page-background"></div>
								<div className="dialogue-box-first-event">
									<div className="create-run-acessories">
										<AccessoriesForDialogueBox />
									</div>
									<div className="event-wrapper">
										<div>
											<p className="global-header new-event-header">
												Create your run!
											</p>
											<p className="medium-text">
												For the time being, only one of the same event can be
												registered for. This means you can't create and event
												for an event and join someone else's event. This will
												change, but for the time being thank you for your
												patience!{" "}
											</p>
										</div>
										<section className="top-dialogue">
											<div className="top-label-wrapper">
												<div className="rectangular-label-wrapper event-label-back">
													<p className="label-text-white new-event-label">
														Please select an event:
													</p>
												</div>
												<div className="rectangular-label-wrapper event-label-back">
													<p className="label-text-white new-event-label">
														Please enter your runner data:
													</p>
												</div>
											</div>
											<div className="top-input-wrapper top-event-input">
												<div className="event-selection first-event-text">
													<select onChange={(e) => handleChange(e)}>
														<option
															className="first-event-text"
															default
															key="first-event-select"
														>
															Please select an option...
														</option>
														{[...globalContext.allEvents].map((e, i) => (
															<option key={`${i}-event`}>
																{globalContext.allEvents[i].event}
															</option>
														))}
													</select>
												</div>
												<div className="runner-stat-group">
													<input
														type="number"
														className="runner-isv1 stat-input"
														id="runner-isv1"
														key="runner-isv1"
														placeholder="ISV1"
													></input>
													<input
														type="number"
														className="runner-isv2 stat-input"
														id="runner-isv2"
														key="runner-isv2"
														placeholder="ISV2"
													></input>
													<input
														type="number"
														className="runner-bp stat-input"
														id="runner-bp"
														key="runner-bp"
														placeholder="BP"
													></input>
													<div className="k-div-runner">K</div>
												</div>
											</div>
										</section>
										<div className="event-wrapper">
											<p className="global-subheader event-subheader">
												Runner name:
											</p>
											<div>
												<p className="first-event-text">
													Name is optional, it'll default to "Runner" if no
													entry is given for privacy purposes
												</p>
											</div>
											<input
												type="text"
												className="runner-name stat-input"
												id="runner-name"
												placeholder="Name"
											></input>
										</div>
										<div className="event-wrapper">
											<div className="event-wrapper">
												<div className="global-subheader  event-subheader">
													Please choose a run password:
												</div>
												<div className="first-event-text">
													This is a pharase you will give to other managers in
													this run so they can edit the schedule, this is
													<i>SECRET!!</i>
												</div>
												<div className="first-event-text">
													This will allow ALL access to all data added to this
													run - fillers, their teams, runner data and the
													schedule. <br />A sentance that you can copy/paste to
													other managers is reccomended so no one mispells
													anything.
												</div>
											</div>
											<input
												type="text"
												className="run-pass stat-input"
												id="run-pass"
												placeholder="Run password"
											></input>
											<br />
											<input
												type="text"
												className="run-pass stat-input"
												id="run-pass-confirmation"
												placeholder="Confirm run password"
											></input>
										</div>
										<HeartBorder />
										<div className="submit-wrapper runner-submit">
											<div className="btn-shadow runner-shadow">
												<button className="submit-btn " onClick={submitNewRun}>
													Submit
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						</>
					)}
				</>
			) : (
				<AdminNotice />
			)}
		</>
	);
	function handleChange(e) {
		let value = e.target.value;
		setEventState(value);
	}

	function submitNewRun() {
		// take in runner input, event name and manager
		let manager = user.user;
		let eventHours = 0;
		let runner = {
			isv1: null,
			isv2: null,
			bp: null,
			name: "runner",
		};

		let firstEventObject = {};
		let eventJson = { eventState };
		let url = `http://localhost:8080/return/event/names/and/hours`;
		let urlWrite = `http://localhost:8080/write/event`;
		let urlCheck = `http://localhost:8080/verify/event/duplicate`;

		//selection check to ensure it's an acceptable value
		if (eventState === "Please select an option..." || eventState === "") {
			alert("Please choose an option");
			return;
		}

		//Ensures runner isn't empty: return true means it's not good, return false means its ok
		if (!runnerValueCheck()) {
			alert("Please check your runner data");
			return;
		}

		const passInput = document.getElementById("run-pass").value;
		const passwordConfirmation = document.getElementById(
			"run-pass-confirmation"
		).value;

		if (passInput !== passwordConfirmation) {
			alert("Your passwords don't match! Please try typing them again");
			return;
		}
		console.log(user.user);
		// call db
		//ensure runer isn't lead runner of same event
		const duplicateQuery = { manager, event: eventState };
		(async () => {
			const resCheck = await fetch(urlCheck, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(duplicateQuery),
			});
			const responseData = await resCheck.json();
			if (responseData.error?.data) {
				alert(responseData.error.data);
				return;
			}

			//No duplicate event found, proceeds:
			//Find event hours and make scheduleArray
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(eventJson),
			});
			// call to db, same async block

			//set the original, blank array
			const data = await res.json();
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
				console.log("HTML:", document.getElementById("runner-isv1"));
				for (let i = 0; i < data.length; i++) {
					if (data[i].event === eventState) {
						eventHours = data[i].hours;
					}
				}
				for (let i = 0; i < eventHours; i++) {
					array.current.push(new Array(4).fill(""));
				}
				//set runner
				if (
					document.getElementById("runner-name")?.value &&
					document.getElementById("runner-name")?.value !== ""
				) {
					runner = {
						isv1: parseInt(document.getElementById("runner-isv1").value),
						isv2: parseInt(document.getElementById("runner-isv2").value),
						bp: parseInt(document.getElementById("runner-bp").value * 1000),
						name: document.getElementById("runner-name").value,
					};
				} else {
					runner = {
						isv1: parseInt(document.getElementById("runner-isv1").value),
						isv2: parseInt(document.getElementById("runner-isv2").value),
						bp: parseInt(document.getElementById("runner-bp").value * 1000),
						name: "Runner",
					};
				}

				firstEventObject = {
					event: eventState,
					runner: runner,
					schedule: array.current,
					managers: [user.user],
					associatedUsers: [],
					leadManager: user.user,
					runPassword: document.getElementById("run-pass").value,
					activeTeamDropdown: Array(200).fill(false),
					notesPerHour: Array(200).fill(""),
					teamsPerHour: Array(200).fill(""),
				};

				const resW = await fetch(urlWrite, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Credentials": true,
					},
					body: JSON.stringify(firstEventObject),
				});
				console.log(resW);
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
					let newEvents = user.registeredEvents;
					newEvents.push(eventState);
					//set the user state
					setUser({
						...user,
						event: eventState,
						runner: runner,
						scheduleArray: array.current,
						leadManager: user.user,
						registeredEvents: newEvents,
					});
				}
				setSuccessState(true);
			}
		})();
		writeAssociatedEvent();
	}

	//This assumes it's been checked and can be added without conflict
	function writeAssociatedEvent() {
		let currentManager = user.user;
		let tempEvent = eventState;
		let eventObject = { event: tempEvent, manager: currentManager };
		const url = `http://localhost:8080/write/event/association`;
		(async () => {
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(eventObject),
			});
			if (res.error?.data) {
				let errorMessage = res.error?.data;
				confirmAlert({
					message: errorMessage,
					buttons: [
						{
							label: "Okay",
						},
					],
				});
			} else {
				console.log(res);
			}
		})();
	}

	function runnerValueCheck() {
		//checks if value exists, then checks if value is acceptable, then returns true if both passes check
		if (
			isNaN(parseInt(document.getElementById("runner-isv1").value)) === true ||
			isNaN(parseInt(document.getElementById("runner-isv1").value)) === "" ||
			isNaN(parseInt(document.getElementById("runner-isv2").value)) === true ||
			isNaN(parseInt(document.getElementById("runner-isv2").value)) === "" ||
			isNaN(parseInt(document.getElementById("runner-bp").value)) === "" ||
			isNaN(parseInt(document.getElementById("runner-bp").value)) === true
		) {
			return false;
		} else if (
			parseInt(document.getElementById("runner-bp").value * 1000) > 999999 ||
			parseInt(document.getElementById("runner-bp").value * 1000) < 50000
		) {
			alert(
				"Please enter the BP as three digits, we'll add the zeroes for you <3"
			);
			return false;
		}
		//every check has passed
		return true;
	}
}
