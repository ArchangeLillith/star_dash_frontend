import React, { useContext } from "react";
import { UserContext } from "../context.jsx";
import TeamMatcher from "../util/TeamMatcher.js";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { AdminNotice } from "../components/AdminNotice.jsx";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { useEffect } from "react";
import { GlobalContext } from "../context.jsx";
import { marathonOrCheerful } from "../util/marathonOrCheerful";

export function Teams() {
	const { user, setUser } = useContext(UserContext);
	let manager = user.user;
	const [successfulTeamMatcher, setSuccessfulTeamMatcher] = React.useState([]);
	const [min, setMin] = React.useState(175000);
	const [max, setMax] = React.useState(185000);
	const [hour, setHour] = React.useState(1);
	const [fillers, setFillers] = React.useState([]);
	const [substitutes, setSubstitutes] = React.useState([]);
	const [confirmNewTeam, setConfirmNewTeam] = React.useState(false);
	const [bpSortDirection, setBpSortDirection] = React.useState(false);
	const [isvSortDirection, setIsvSortDirection] = React.useState(false);
	const [noFillers, setNoFillers] = React.useState(false);
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [cheerfulOrMarathon, setCheerfulOrMarathon] = React.useState("");

	const bottomRef = React.useRef();

	const onClickDown = () => {
		bottomRef.current.scrollIntoView({ behavior: "smooth" });
	};
	const onClickUp = () => {
		window.scrollTo({
			top: 0,
			left: 100,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const type = marathonOrCheerful(globalContext, user.event);
		setCheerfulOrMarathon(type);
	}, []);

	return (
		<>
			{user.loggedIn &&
				user.associatedUsers.length > 0 &&
				cheerfulOrMarathon === "C" && (
					<>
						<button
							className="btn-scroll-up display-none-on-mobile"
							onClick={onClickUp}
						>
							&uarr;
						</button>
						<button
							className="btn-scroll-down display-none-on-mobile"
							onClick={onClickDown}
						>
							&darr;
						</button>
					</>
				)}

			{user.loggedIn ? (
				<>
					{cheerfulOrMarathon === "M" ? (
						<div className="display-none-on-mobile">
							<>
								<div className="page-background"></div>
								<div className="dialogue-box-teams">
									<div className="schedule-acessories">
										<AccessoriesForDialogueBox />
									</div>
									<div className="team-title-wrapper">
										<div className="miku-wrapper">
											<img
												src="../img/404.png"
												className="miku"
												alt="welcome miku"
											/>
										</div>
										<h1 className="global-header">
											You don't need TeamMatcher for Marathon runs!
										</h1>
									</div>
								</div>
							</>
						</div>
					) : (
						<>
							{user.teamsPerHour && user.teamsPerHour[hour] && (
								<div className="display-none-on-mobile">
									<div className="matched-teams-container current-team">
										<p className="team-number-title current-team">
											Current Team:
										</p>
										<div className="team-one current-team">
											<div className="team-sub-group current-team">
												<p>{user.teamsPerHour[hour].healer}</p>
												<p>Healer team</p>
												<hr className="current-team-break" />
											</div>
											<div className="team-sub-group current-team">
												<p>{user.teamsPerHour[hour].fillerOne}</p>
												<p>{user.teamsPerHour[hour].fillerOneTeamName}</p>
												<hr className="current-team-break" />
											</div>
											<div className="team-sub-group current-team">
												<p>{user.teamsPerHour[hour].fillerTwo}</p>
												<p>{user.teamsPerHour[hour].fillerTwoTeamName}</p>
												<hr className="current-team-break" />
											</div>
											<div className="team-sub-group current-team">
												<p>{user.teamsPerHour[hour].fillerThree}</p>
												<p>{user.teamsPerHour[hour].fillerThreeTeamName}</p>
												<hr className="current-team-break" />
											</div>
											<div className="team-sub-group current-team">
												<p>Average BP: {user.teamsPerHour[hour].averageBp}</p>
												Average ISV: {user.teamsPerHour[hour].averageIsv}
											</div>
										</div>
									</div>
									<div className="number-of-teams">
										{successfulTeamMatcher.length} Teams Found!
									</div>
								</div>
							)}
							<div className="mobile-notice">
								This page does not work on mobile! Please swap to a computer to
								be able to use the team matcher and select a team from there.{" "}
							</div>
							<div className="display-none-on-mobile">
								{user.associatedUsers.length === 0 ? (
									<>
										<div className="page-background"></div>
										<div className="dialogue-box-teams">
											<div className="schedule-acessories">
												<AccessoriesForDialogueBox />
											</div>
											<div className="team-title-wrapper">
												<div className="miku-wrapper">
													<img
														src="../img/404.png"
														className="miku"
														alt="welcome miku"
													/>
												</div>
												<h1 className="global-header">
													You don't have any registered fillers
												</h1>
											</div>
										</div>
									</>
								) : (
									<div className="display-none-on-mobile">
										<div className="page-background"></div>
										<div className="center-and-column-teams">
											<div className="dynamic-schedule-container-teams">
												<div className="successful-return-wrapper">
													<p className="global-header teams-header">
														~Teams for {user.event}~
													</p>
													<div className="schedule-heart-border">
														<HeartBorder />
													</div>
													{user.teamsPerHour[hour] && (
														<p className="global-subheader-flipped ">
															&larr; Currently Selected Team
														</p>
													)}

													<div className="flex-column-container">
														<div className="flex-container">
															<select
																onChange={(e) => handleChange(e)}
																className="small-selection-box"
															>
																<option value="100-150">
																	100-150 Average BP
																</option>
																<option value="150-165">
																	150-165 Average BP
																</option>
																<option value="165-175">
																	165-175 Average BP
																</option>
																<option
																	value="175-185"
																	default
																	selected="selected"
																>
																	175-185 Average BP
																</option>
																<option value="185-195">
																	185-195 Average BP
																</option>
																<option value="195-210">
																	195-210 Average BP
																</option>
																<option value="210-300">
																	210-300 Average BP
																</option>
															</select>
															<select
																id={`hour-select`}
																className={`small-selection-box`}
																key={`hour-selection`}
																onChange={(e) => handleHourChange(e)}
															>
																<option key="default" value="default">
																	Select Hour...
																</option>
																{user.scheduleArray?.map((e, i) => (
																	<option
																		id="hour-selction"
																		value={`${i}`}
																		key={`hour-${i}`}
																	>
																		Hour {`${i + 1}`}
																	</option>
																))}
															</select>
														</div>
														<div className="current-fillers">
															{!user.teamsPerHour[hour] && (
																<div className="filler-container">
																	{fillers.length >= 4 && (
																		<div>Fillers for this hour: </div>
																	)}
																	<div className="single-current-filler">
																		{fillers[0]}
																	</div>
																	<div className="single-current-filler">
																		{fillers[1]}
																	</div>
																	<div className="single-current-filler">
																		{fillers[2]}
																	</div>
																	<div className="single-current-filler">
																		{fillers[3]}
																	</div>
																</div>
															)}
														</div>
														{fillers.length >= 4 && (
															<div className="bottom-selection-teams">
																<div className="title-wrapper">
																	<div className="rectangular-label-wrapper teams">
																		<p className="label-text-white teams">
																			Notes for this hour:
																		</p>
																	</div>
																	<div className="dummy-div"></div>
																	<div className="rectangular-label-wrapper teams">
																		<p className="label-text-white teams">
																			Select Subs...
																		</p>
																	</div>
																</div>
																<div className="notes-subs-wrapper">
																	<div className="note-per-hour">
																		{user.notesPerHour[hour]}
																	</div>
																	<div className="dummy-div"></div>
																	<div className="sub-container">
																		{substitutes.length < 2 && (
																			<select
																				className={`filler-input sub`}
																				key={`hour-filler-1`}
																				value={[0]}
																				onChange={handleSubChange}
																			>
																				<option key="default">
																					Select User...
																				</option>
																				{[...user.associatedUsers].map(
																					(e, i) => (
																						<option
																							key={`${i}-filler`}
																							value={user.associatedUsers[i]}
																						>
																							{user.associatedUsers[i]}
																						</option>
																					)
																				)}
																			</select>
																		)}
																		{substitutes.length >= 1 && (
																			<div className="active-sub-container">
																				<p className="small-text">
																					Substitutes in calculations:
																				</p>
																				{[...substitutes].map((e, i) => (
																					<div className="single-active-sub">
																						<p className="small-text">
																							{substitutes[i]}
																						</p>
																						<button
																							className="x-btn"
																							id={`${substitutes[i]}`}
																							onClick={(e) =>
																								handleSubDelete(e)
																							}
																						>
																							X
																						</button>
																					</div>
																				))}{" "}
																				<p className="small-text">
																					It takes some time to calculate with
																					subs, please be patient!
																				</p>
																			</div>
																		)}
																	</div>
																</div>
															</div>
														)}
													</div>
													<div className="find-teams-wrapper">
														{fillers.length >= 4 &&
															successfulTeamMatcher.length === 0 && (
																<div className="btn-shadow userdata-btn">
																	<button
																		className="submit-btn"
																		onClick={handleTeamMatcher}
																	>
																		Find Teams
																	</button>
																</div>
															)}
														{fillers.length >= 4 &&
															successfulTeamMatcher.length >= 1 && (
																<>
																	<div className="btn-shadow userdata-btn">
																		<button
																			className="submit-btn"
																			onClick={handleTeamMatcher}
																		>
																			Refresh Teams
																		</button>
																	</div>
																	<div className="sort-by-wrapper">
																		<p className="no-margin">Sort by:</p>
																		<button
																			className="x-btn-35"
																			onClick={sortByIsv}
																		>
																			ISV
																		</button>
																		<button
																			className="x-btn-35"
																			onClick={sortByBp}
																		>
																			BP
																		</button>
																	</div>
																</>
															)}
														<br />
													</div>
													{noFillers && (
														<h1>
															There were no avaliable teams with this
															combination
														</h1>
													)}

													{[...successfulTeamMatcher].map((e, i) => (
														<div
															className={`successful-team${i} hour-label-mod`}
															key={`successfulteam${i}`}
														>
															<div className="team-one no-background">
																<p className="team-number-title">
																	Team {`${i + 1}`}:
																</p>
																<div className="team-sub-group">
																	<p>{successfulTeamMatcher[i].healer}</p>
																	<p>Healer team</p>
																</div>
																<div className="team-sub-group">
																	<p>{successfulTeamMatcher[i].fillerOne}</p>
																	<p>
																		{successfulTeamMatcher[i].fillerOneTeamName}
																	</p>
																</div>
																<div className="team-sub-group">
																	<p>{successfulTeamMatcher[i].fillerTwo}</p>
																	<p>
																		{successfulTeamMatcher[i].fillerTwoTeamName}
																	</p>
																</div>
																<div className="team-sub-group">
																	<p>{successfulTeamMatcher[i].fillerThree}</p>
																	<p>
																		{
																			successfulTeamMatcher[i]
																				.fillerThreeTeamName
																		}
																	</p>
																</div>
																<div className="team-sub-group">
																	<p>
																		Average BP:{" "}
																		{successfulTeamMatcher[i].averageBp}
																	</p>
																	Average ISV:{" "}
																	{successfulTeamMatcher[i].averageIsv}
																</div>
																<div className={`${i}`}>
																	{!confirmNewTeam ? (
																		<button
																			className="x-btn-35"
																			id={`${i}`}
																			onClick={(e) => confirmTeamChange(e)}
																		>
																			&#10003;
																		</button>
																	) : (
																		<>
																			<p>
																				Are you sure you want to overwrite the
																				currently selected team?
																			</p>
																			<button
																				id={`${i}`}
																				className="x-btn-45"
																				onClick={handleSelectTeam}
																			>
																				Yes!
																			</button>
																			<button
																				className="x-btn-45"
																				onClick={declineNewTeam}
																			>
																				No
																			</button>
																		</>
																	)}
																</div>
															</div>
														</div>
													))}
												</div>
												<br />
												<br />
												<br />
												<br />
											</div>
										</div>
									</div>
								)}
								<p ref={bottomRef}></p>
							</div>
						</>
					)}
				</>
			) : (
				<AdminNotice />
			)}
		</>
	);

	function handleChange(e) {
		const range = e.target.value;
		switch (range) {
			case "100-150":
				setMin(100000);
				setMax(150000);
				break;
			case "150-165":
				setMin(150000);
				setMax(165000);
				break;
			case "165-175":
				setMin(165000);
				setMax(175000);
				break;
			case "175-185":
				setMin(175000);
				setMax(185000);
				break;
			case "185-195":
				setMin(185000);
				setMax(195000);
				break;
			case "195-210":
				setMin(195000);
				setMax(210000);
				break;
			case "210-300":
				setMin(210000);
				setMax(300000);
				break;
			default:
				setMin(175000);
				setMax(185000);
		}
	}

	/**
	 * Gets all the usernames and their respective teams associated with the manager
	 * Calls to the endpoint and queries the whole associates users list based on the manager name. (a)Waits for a return and pushes each
	 * returned username and team into an array to then be set to a state variable.
	 * @returns A list of names associated with the current manager and their associated teams
	 */
	async function grabTeams() {
		let event = user.event;
		const fillersAndSubs = fillers.concat(substitutes);
		console.log("fillers and subs: ", fillersAndSubs);
		let quereyObject = { manager, event, fillers: fillersAndSubs };
		console.log(quereyObject);
		const url = `http://localhost:8080/return/teams/per/hour`;
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
			alert(data.error?.data);
		} else {
			let tempUsers = [];
			for (let i = 0; i < fillersAndSubs.length; i++) {
				tempUsers.push(data[i][0].userData);
			}
			console.log("tempusers:", tempUsers);
			return tempUsers;
		}
	}

	function confirmTeamChange(e) {
		setConfirmNewTeam(true);
	}

	/**
	 * Handles the calls to the team matcher util
	 * Calls grab teams, then calls the team matcher util with the returned values. Then sets two states, one visual check and the other
	 * a list of the teams that came back matching the parameters set out by the util function.
	 */
	function handleTeamMatcher() {
		setNoFillers(false);
		(async () => {
			const grabbedTeams = await grabTeams();
			const runnerTeam = user.runner;
			const teamsToPassIn = combine(grabbedTeams, 4);
			const teamsAfterLoop = [];
			for (let i = 0; i < teamsToPassIn.length; i++) {
				const teamMatcher = new TeamMatcher(
					runnerTeam,
					teamsToPassIn[i],
					min,
					max
				);
				const successfulTeamMatcher = teamMatcher.execute();
				console.log(`Teams that matched the filter:`);
				console.log(successfulTeamMatcher);
				teamsAfterLoop.push(...successfulTeamMatcher);
			}
			setSuccessfulTeamMatcher(teamsAfterLoop);
			if (teamsAfterLoop.length === 0) {
				setNoFillers(true);
			}
		})();
	}

	function declineNewTeam() {
		setConfirmNewTeam(false);
	}

	function sortByBp() {
		let sortedByBp = [];
		const toSort = successfulTeamMatcher.slice();
		if (bpSortDirection) {
			sortedByBp = toSort.sort((a, b) => b.averageBp - a.averageBp);
			setSuccessfulTeamMatcher(sortedByBp);
			setBpSortDirection(!bpSortDirection);
		} else {
			sortedByBp = toSort.sort((a, b) => a.averageBp - b.averageBp);
			setSuccessfulTeamMatcher(sortedByBp);
			setBpSortDirection(!bpSortDirection);
		}
	}

	function sortByIsv() {
		let sortedByIsv = [];
		const toSort = successfulTeamMatcher.slice();
		if (isvSortDirection) {
			sortedByIsv = toSort.sort((a, b) => b.averageIsv - a.averageIsv);
			setSuccessfulTeamMatcher(sortedByIsv);
			setIsvSortDirection(!isvSortDirection);
		} else {
			sortedByIsv = toSort.sort((a, b) => a.averageIsv - b.averageIsv);
			setSuccessfulTeamMatcher(sortedByIsv);
			setIsvSortDirection(!isvSortDirection);
		}
	}

	function handleHourChange(e) {
		const hour = e.target.value;
		if (hour === "default") {
			return;
		}
		setHour(hour);
		const newFillers = [];
		for (let i = 0; i < user.scheduleArray[hour].length; i++) {
			if (
				user.scheduleArray[hour][i] === "" ||
				user.scheduleArray[hour][i] === "Select User..."
			) {
				setFillers([
					"This hour isn't finished yet, please add fillers to this hour to see teams!",
				]);
				setSuccessfulTeamMatcher([]);

				return;
			}
			const singleFiller = user.scheduleArray[hour][i];
			newFillers.push(singleFiller);
			setFillers(newFillers);
		}
	}

	function combine(a, min) {
		var fn = function (n, src, got, all) {
			if (n === 0) {
				if (got.length > 0) {
					all[all.length] = got;
				}
				return;
			}
			for (var j = 0; j < src.length; j++) {
				fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
			}
			return;
		};
		var all = [];
		for (var i = min; i < a.length; i++) {
			fn(i, a, [], all);
		}
		all.push(a);
		console.log("all", all);
		const filteredCombos = all.filter((oneEntry) => oneEntry.length === 4);
		console.log(filteredCombos);
		return filteredCombos;
	}

	function handleSelectTeam(e) {
		const team = e.target.id;
		const newTeamsPerHour = user.teamsPerHour.slice();
		newTeamsPerHour[hour] = successfulTeamMatcher[team];
		setUser({
			...user,
			teamsPerHour: newTeamsPerHour,
		});
		setConfirmNewTeam(false);
	}

	function handleSubDelete(e) {
		const deleteTarget = e.target.id;
		const newSubs = substitutes.filter((sub) => sub !== deleteTarget);
		setSubstitutes(newSubs);
	}
	function handleSubChange(e) {
		const sub = e.target.value;
		const newSubs = substitutes.slice();
		newSubs.push(sub);
		setSubstitutes(newSubs);
	}
}
