import React from "react";
import { UserContext } from "../context.jsx";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { useEffect } from "react";
import { isBlankNullUndefined } from "../util/checkStrings.js";
import { confirmAlert } from "react-confirm-alert";

export function Marathon() {
	let ctx = React.useContext(UserContext);
	//States for manager and the user
	const [manager, setManager] = React.useState("");
	const [discord, setDiscord] = React.useState("");
	//FILL TEAM
	const [fillTeamISV1, setFillTeamISV1] = React.useState();
	const [fillTeamISV2, setFillTeamISV2] = React.useState();
	const [fillTeamBP, setFillTeamBP] = React.useState();
	//encore TEAM
	const [encoreTeamISV1, setEncoreTeamISV1] = React.useState();
	const [encoreTeamISV2, setEncoreTeamISV2] = React.useState();
	const [encoreTeamBP, setEncoreTeamBP] = React.useState();
	const [events, setEvents] = React.useState([]);
	const [eventState, setEventState] = React.useState("");

	useEffect(
		() =>
			async function grabTeams() {
				const url = `http://localhost:8080/return/event/names/with/type`;
				const res = await fetch(url, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(),
				});
				console.log(res);
				const data = await res.json();
				console.log(data);
				const merryArray = [];
				for (let i = 0; i < data.length; i++) {
					if (data[i].type === "M") {
						merryArray.push(data[i]);
					} else {
						continue;
					}
				}
				setEvents(merryArray);
				return data;
			},
		[]
	);

	return (
		<>
			<div className="page-background"></div>
			<div className="dialogue-box-marathon">
				<AccessoriesForDialogueBox />
				<section className="top-dialogue">
					<div className="top-label-wrapper">
						<div className="rectangular-label-wrapper full">
							<p className="label-text-white">Manager Name </p>
						</div>
						<div className="rectangular-label-wrapper full">
							<p className="label-text-white">Event </p>
						</div>
						<div className="rectangular-label-wrapper full">
							<p className="label-text-white">Your Discord Name </p>
						</div>
					</div>
					<div className="top-input-wrapper">
						<input
							className="manager-name-input"
							type="text"
							placeholder="Manager name..."
							onChange={(e) => setManager(e.currentTarget.value)}
							required
						></input>
						<div className="event-selection first-event-text">
							<select
								onChange={(e) => handleChange(e)}
								className="event-selection"
							>
								<option
									className="first-event-text"
									default
									key="first-event-select"
								>
									Please select an option...
								</option>
								{[...events].map((e, i) => (
									<option key={`${i}-event`}>{events[i].event}</option>
								))}
							</select>
						</div>
						<input
							className="discord-name-input"
							type="text"
							placeholder="Discord name..."
							onChange={(e) => setDiscord(e.currentTarget.value)}
							required
						></input>
					</div>
				</section>
				<HeartBorder />
				<div className="fill-team team-input-wrapper">
					<form className="team-input-container">
						<div className="rounded-text-label">
							<p className="label-text-white">Fill Team: </p>
						</div>
						<input
							className="fill-isv1 stat-input"
							type="number"
							required
							onChange={(e) => setFillTeamISV1(e.currentTarget.value)}
							placeholder="ISV1"
						></input>
						<input
							className="fill-isv2 stat-input"
							type="number"
							required
							onChange={(e) => setFillTeamISV2(e.currentTarget.value)}
							placeholder="ISV2"
						></input>
						<input
							className="fill-bp stat-input"
							type="number"
							required
							onChange={(e) => setFillTeamBP(e.currentTarget.value * 1000)}
							placeholder="BP"
						></input>
						<div className="k-div">K</div>
					</form>
				</div>
				<div className="encore-team team-input-wrapper">
					<form className="team-input-container">
						<div className="rounded-text-label">
							<p className="label-text-white light-padding">Encore Team: </p>
							<p className="label-text-white small-subheading">Optional</p>
						</div>
						<input
							className="encore-isv1 stat-input"
							type="number"
							required
							onChange={(e) => setEncoreTeamISV1(e.currentTarget.value)}
							placeholder="ISV1"
						></input>
						<input
							className="encore-isv2 stat-input"
							type="number"
							required
							onChange={(e) => setEncoreTeamISV2(e.currentTarget.value)}
							placeholder="ISV2"
						></input>
						<input
							className="encore-bp stat-input"
							type="number"
							required
							onChange={(e) => setEncoreTeamBP(e.currentTarget.value * 1000)}
							placeholder="BP"
						></input>
						<div className="k-div">K</div>
					</form>
				</div>
				<div className="submit-wrapper">
					<div className="btn-shadow">
						<button className="submit-btn" type="submit" onClick={startDash}>
							Start Dash!
						</button>
					</div>
				</div>
			</div>
		</>
	);

	/**
	 * Writes the cheerful team and other assiociated data to the database
	 * Calls to a secondary function to make the marathon, then checks if any of the fields are blank. If none of the fields are blank,
	 *  it checks to ensure BP is in an acceptable range - checking to see if someone accidentally put too low a BP or added the zeroes for
	 *  the hundred thousands. If all checks pass, it then calls to an endpoint in the index and passes the marathon to the backend.
	 * @returns A success or failure message
	 */
	function startDash() {
		console.log(`Start Dash!`);
		let marathonObject = {};
		let marathonBody = makeMarathon();

		if (
			isBlankNullUndefined(marathonBody.fillTeam.discord) ||
			isBlankNullUndefined(marathonBody.fillTeam.manager) ||
			isBlankNullUndefined(eventState) ||
			isBlankNullUndefined(marathonBody.fillTeam.teams.fillTeam.isv1) ||
			isBlankNullUndefined(marathonBody.fillTeam.teams.fillTeam.isv2) ||
			isBlankNullUndefined(marathonBody.fillTeam.teams.fillTeam.bp) ||
			marathonBody.encoreTeam
				? isBlankNullUndefined(marathonBody.encoreTeam?.teams.encoreTeam.isv1)
				: false || marathonBody.encoreTeam
				? isBlankNullUndefined(marathonBody.encoreTeam?.teams.encoreTeam.isv2)
				: false || marathonBody.encoreTeam
				? isBlankNullUndefined(marathonBody.encoreTeam?.teams.encoreTeam.bp)
				: false
		) {
			alert("Please enter a value into each field");
		} else if (
			marathonBody.fillTeam.teams.bp > 999999 ||
			marathonBody.fillTeam.teams.bp < 70000 ||
			marathonBody.encoreTeam?.teams.bp > 999999 ||
			marathonBody.encoreTeam?.teams.bp < 70000
		) {
			alert(
				"Please enter a three digit number for your BP, we add on the zeroes for you <3"
			);
		} else {
			marathonObject = {
				marathonBody,
			};
		}

		const url = `http://localhost:8080/start/dash/marathon/`;
		(async () => {
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(marathonObject),
			});
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
				confirmAlert({
					message:
						"~SUCCESS!~ You've added yourself to this run! If you need to change your stats please reach out to your manager and they can do it for you.",
					buttons: [
						{
							label: "Okay",
						},
					],
				});
			}
		})();

		/**
		 * Creates the marathon
		 * Initializes the object and it's teams. Then lifts data from the state (the user input data) and copies it into the correct object.
		 * After making all the temas, the function writes the team to the marathon team object and includes the manager and user in
		 * the object as well. This bundle is consumed by the back end to save the stats of this user to the database.
		 * @returns marathon - the user object with their name, associated manager and their teams
		 */
		function makeMarathon() {
			if (encoreTeamBP === undefined) {
				let body = {};
				let fillTeam = {};

				fillTeam = {
					isv1: fillTeamISV1,
					isv2: fillTeamISV2,
					bp: fillTeamBP,
				};

				body = {
					fillTeam: { teams: { fillTeam }, manager, discord, eventState },
				};
				return body;
			} else {
				let body = {};
				let fillTeam = {};
				let encoreTeam = {};

				fillTeam = {
					isv1: fillTeamISV1,
					isv2: fillTeamISV2,
					bp: fillTeamBP,
				};

				encoreTeam = {
					isv1: encoreTeamISV1,
					isv2: encoreTeamISV2,
					bp: encoreTeamBP,
				};

				body = {
					fillTeam: { teams: { fillTeam }, manager, discord, eventState },
					encoreTeam: {
						teams: { encoreTeam },
						manager,
						discord: `${discord} ENCORE`,
						eventState,
					},
				};
				return body;
			}
		}
	}

	function handleChange(e) {
		let value = e.target.value;
		setEventState(value);
	}
}
