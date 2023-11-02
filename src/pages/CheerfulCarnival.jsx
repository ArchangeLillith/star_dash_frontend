import React from "react";
import { UserContext } from "../context.jsx";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { confirmAlert } from "react-confirm-alert";
import { useEffect } from "react";
import { isBlankNullUndefined } from "../util/checkStrings.js";

export function CheerfulCarnival() {
	let ctx = React.useContext(UserContext);
	const [eventState, setEventState] = React.useState("");
	const [events, setEvents] = React.useState([]);
	//States for manager and the user
	const [manager, setManager] = React.useState("");
	const [discord, setDiscord] = React.useState("");
	//FILL TEAM
	const [fillTeamISV1, setFillTeamISV1] = React.useState();
	const [fillTeamISV2, setFillTeamISV2] = React.useState();
	const [fillTeamBP, setFillTeamBP] = React.useState();
	//HEAL TEAM
	const [healTeamISV1, sethealTeamISV1] = React.useState();
	const [healTeamISV2, sethealTeamISV2] = React.useState();
	const [healTeamBP, sethealTeamBP] = React.useState();
	//SB1 TEAM
	const [SB1TeamISV1, setSB1TeamISV1] = React.useState();
	const [SB1TeamISV2, setSB1TeamISV2] = React.useState();
	const [SB1TeamBP, setSB1TeamBP] = React.useState();
	//SB2 TEAM
	const [SB2TeamISV1, setSB2TeamISV1] = React.useState(0);
	const [SB2TeamISV2, setSB2TeamISV2] = React.useState(0);
	const [SB2TeamBP, setSB2TeamBP] = React.useState(0);

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
				const data = await res.json();
				console.log(data);
				const cheerfulArray = [];
				for (let i = 0; i < data.length; i++) {
					if (data[i].type === "C") {
						cheerfulArray.push(data[i]);
					} else {
						continue;
					}
				}
				setEvents(cheerfulArray);
				return data;
			},
		[]
	);

	return (
		<>
			<div className="page-background"></div>
			<div className="dialogue-box-cc">
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
							<p className="label-text-white">Your Discord Name</p>
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
				<div className="heal-team team-input-wrapper">
					<form className="team-input-container">
						<div className="rounded-text-label">
							<p className="label-text-white">Heal Team: </p>
						</div>
						<input
							className="heal-isv1 stat-input"
							type="number"
							required
							onChange={(e) => sethealTeamISV1(e.currentTarget.value)}
							placeholder="ISV1"
						></input>
						<input
							className="heal-isv2 stat-input"
							type="number"
							required
							onChange={(e) => sethealTeamISV2(e.currentTarget.value)}
							placeholder="ISV2"
						></input>
						<input
							className="heal-bp stat-input"
							type="number"
							required
							onChange={(e) => sethealTeamBP(e.currentTarget.value * 1000)}
							placeholder="BP"
						></input>
						<div className="k-div">K</div>
					</form>
				</div>
				<div className="SB1-team team-input-wrapper">
					<form className="team-input-container">
						<div className="rounded-text-label">
							<p className="label-text-white">SB1 Team: </p>
						</div>
						<input
							className="SB1-isv1 stat-input"
							type="number"
							required
							onChange={(e) => setSB1TeamISV1(e.currentTarget.value)}
							placeholder="ISV1"
						></input>
						<input
							className="SB1-isv2 stat-input"
							type="number"
							required
							onChange={(e) => setSB1TeamISV2(e.currentTarget.value)}
							placeholder="ISV2"
						></input>
						<input
							className="SB1-bp stat-input"
							type="number"
							required
							onChange={(e) => setSB1TeamBP(e.currentTarget.value * 1000)}
							placeholder="BP"
						></input>
						<div className="k-div">K</div>
					</form>
				</div>
				<div className="SB2-team team-input-wrapper">
					<form className="team-input-container">
						<div className="rounded-text-label">
							<p className="label-text-white light-padding">SB2 Team: </p>
							<p className="label-text-white small-subheading">Optional</p>
						</div>
						<input
							className="SB2-isv1 stat-input"
							type="number"
							onChange={(e) => setSB2TeamISV1(e.currentTarget.value)}
							placeholder="ISV1"
						></input>
						<input
							className="SB2-isv2 stat-input"
							type="number"
							onChange={(e) => setSB2TeamISV2(e.currentTarget.value)}
							placeholder="ISV2"
						></input>
						<input
							className="SB2-bp stat-input"
							type="number"
							onChange={(e) => setSB2TeamBP(e.currentTarget.value * 1000)}
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

	function handleChange(e) {
		let value = e.target.value;
		setEventState(value);
	}
	/**
	 * Writes the cheerful team and other assiociated data to the database
	 * Calls to a secondary function to make the cheerfulObject, then checks if any of the fields are blank. If none of the fields are blank,
	 *  it checks to ensure BP is in an acceptable range - checking to see if someone accidentally put too low a BP or added the zeroes for
	 *  the hundred thousands. If all checks pass, it then calls to an endpoint in the index and passes the cheerfulObject to the backend.
	 * @returns A success or failure message
	 */
	function startDash() {
		let cheerfulBody = makeCheerfulObject();
		if (
			isBlankNullUndefined(cheerfulBody.discord) ||
			isBlankNullUndefined(cheerfulBody.manager) ||
			isBlankNullUndefined(cheerfulBody.teams.SB1Team.isv1) ||
			isBlankNullUndefined(cheerfulBody.teams.SB1Team.bp) ||
			isBlankNullUndefined(cheerfulBody.teams.SB1Team.isv2) ||
			isBlankNullUndefined(cheerfulBody.teams.fillTeam.isv1) ||
			isBlankNullUndefined(cheerfulBody.teams.fillTeam.isv2) ||
			isBlankNullUndefined(cheerfulBody.teams.fillTeam.bp) ||
			isBlankNullUndefined(cheerfulBody.teams.healTeam.isv1) ||
			isBlankNullUndefined(cheerfulBody.teams.healTeam.isv2) ||
			isBlankNullUndefined(cheerfulBody.teams.healTeam.bp)
		) {
			alert("Please enter a value into each field");
			return;
		}
		if (
			cheerfulBody.teams.SB1Team.bp > 999999 ||
			cheerfulBody.teams.SB1Team.bp < 50000 ||
			cheerfulBody.teams.fillTeam.bp > 999999 ||
			cheerfulBody.teams.fillTeam.bp < 50000 ||
			cheerfulBody.teams.healTeam.bp > 999999 ||
			cheerfulBody.teams.healTeam.bp < 50000
		) {
			if (
				cheerfulBody.teams.SB1Team.bp !== 0 &&
				cheerfulBody.teams.fillTeam.bp !== 0 &&
				cheerfulBody.teams.healTeam.bp !== 0
			) {
				alert(
					"Please enter at least a two digit number for your BP, we add on the zeroes for you <3"
				);
				return;
			} else {
				const cheerfulObject = {
					event: eventState,
					cheerfulBody,
				};
				const url = `stardash.ca/start/dash/cheerful/`;
				(async () => {
					const res = await fetch(url, {
						method: "POST",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(cheerfulObject),
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
			}
		}
	}

	/**
	 * Creates the cheerfulObject
	 * Initializes the object and it's teams. Then lifts data from the state (the user input data) and copies it into the correct object.
	 * After making all the temas, the function writes the team to the cheerfulObject team object and includes the manager and user in
	 * the object as well. This bundle is consumed by the back end to save the stats of this user to the database.
	 * @returns cheerfulObject - the user object with their name, associated manager and their teams
	 */
	function makeCheerfulObject() {
		let cheerfulObject;
		let fillTeam = {};
		let healTeam = {};
		let SB1Team = {};
		let SB2Team = {};
		fillTeam = {
			isv1: fillTeamISV1,
			isv2: fillTeamISV2,
			bp: fillTeamBP,
		};

		healTeam = {
			isv1: healTeamISV1,
			isv2: healTeamISV2,
			bp: healTeamBP,
		};

		SB1Team = {
			isv1: SB1TeamISV1,
			isv2: SB1TeamISV2,
			bp: SB1TeamBP,
		};

		SB2Team = {
			isv1: SB2TeamISV1,
			isv2: SB2TeamISV2,
			bp: SB2TeamBP,
		};

		cheerfulObject = {
			discord,
			manager,
			teams: {
				fillTeam,
				healTeam,
				SB1Team,
				SB2Team,
			},
		};
		return cheerfulObject;
	}
}
