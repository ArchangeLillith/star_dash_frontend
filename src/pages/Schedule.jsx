import { RoomOrderer } from "../util/RoomOrderer.js";
import React, { useContext } from "react";
import { UserContext } from "../context.jsx";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { AdminNotice } from "../components/AdminNotice.jsx";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import TeamMatcher from "../util/TeamMatcher.js";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { GlobalContext } from "../context.jsx";
import { useEffect } from "react";
import { marathonOrCheerful } from "../util/marathonOrCheerful";
import { parse } from "url";

export function Schedule() {
	const { user, setUser } = useContext(UserContext);
	let manager = user.user;
	const [eventState, setEventState] = React.useState("");
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [ShowMissingFillers, setShowMissingFillers] = React.useState(false);
	const [successfulTeamMatcher, setSuccessfulTeamMatcher] = React.useState([]);
	const [emptyTeams, setEmptyTeams] = React.useState([]);
	const [teamMatcherPerHour, setTeamMatcherPerHour] = React.useState([]);
	const [showNotes, setShowNotes] = React.useState(Array(200).fill(false));
	const [confirmNewTeam, setConfirmNewTeam] = React.useState(false);
	const [cheerfulOrMarathon, setCheerfulOrMarathon] = React.useState("");
	const [min, setMin] = React.useState(175000);
	const [max, setMax] = React.useState(185000);
	console.log("User from Schedule:", user);
	const bottomRef = React.useRef();

	/**
	 * Handlers for scroll functionality
	 * Both are onclicks of the scroll buttons, one scrolls to an empty div before the missing fillers list, the other to
	 * the top of the page.
	 */
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
			{user.loggedIn ? (
				<>
					{user.event ? (
						<>
							{user.associatedUsers.length === 0 ? (
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
													You don't have any registered fillers
												</h1>
											</div>
										</div>
									</>
								</div>
							) : (
								<div className="schedule-page">
									<button
										className="btn-scroll-up display-none-on-mobile"
										onClick={onClickUp}
									>
										Top &uarr;
									</button>
									<button
										className="btn-scroll-down display-none-on-mobile"
										onClick={onClickDown}
									>
										Needed Fillers List &darr;
									</button>

									<div className="schedule-background">
										<div className="dynamic-schedule-container">
											<div className="center-and-column">
												<div className="schedule-acessories">
													<AccessoriesForDialogueBox />
												</div>
												<p className="global-header">~Schedule~</p>
												<button
													className="schedule-submit btn"
													onClick={confirmSave}
												>
													Save
												</button>
												<button
													className="schedule-load btn"
													onClick={confirmLoad}
												>
													Load
												</button>
												<div className="schedule-heart-border">
													<HeartBorder />
												</div>
												<div className="schedule-top">
													{cheerfulOrMarathon === "C" && (
														<select
															onChange={(e) => handleRangeChange(e)}
															className="schedule-range"
														>
															<option value="100-150">
																100k-150k Average BP
															</option>
															<option value="150-165">
																150k-165k Average BP
															</option>
															<option value="165-175">
																165k-175k Average BP
															</option>
															<option
																value="175-185"
																default
																selected="selected"
															>
																175k-185k Average BP
															</option>
															<option value="185-195">
																185k-195k Average BP
															</option>
															<option value="195-210">
																195k-210k Average BP
															</option>
															<option value="210-300">
																210k-300k Average BP
															</option>
														</select>
													)}
												</div>
												<p className="notes-tag">Notes!</p>
												{user.scheduleArray?.map((e, i) => (
													<div
														key={`hour-${i}-wrapper`}
														className={`hour-container-${i}`}
													>
														{cheerfulOrMarathon === "M" && (
															<>
																{user.teamsPerHour[i]?.length !== 0 &&
																user.teamsPerHour[i] !== undefined ? (
																	<>
																		<form
																			id={`hour-${i + 1}-of-schedule`}
																			className="hour-team-wrapper"
																			key={`hour-${i + 1}-of-schedule`}
																		>
																			<div
																				className="hour-label-wrapper"
																				key={`hour-label-for-${i}`}
																			>
																				<p
																					className="hour-label"
																					key={`hour-label-for-${i}`}
																				>
																					Hour {i + 1}:
																				</p>
																			</div>
																			<div className="matched-teams-container">
																				<div className="team-one">
																					<p className="team-number-title">
																						Chosen Team:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i][0].name}
																						</p>
																						<p>Average ISV</p>
																						<p>
																							{user.teamsPerHour[i][0].avgIsv}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i][1].name}
																						</p>
																						<p>Average ISV</p>
																						<p>
																							{user.teamsPerHour[i][1].avgIsv}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i][2].name}
																						</p>
																						<p>Average ISV</p>
																						<p>
																							{user.teamsPerHour[i][2].avgIsv}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i][3].name}
																						</p>
																						<p>Average ISV</p>
																						<p>
																							{user.teamsPerHour[i][3].avgIsv}
																						</p>
																					</div>
																					{user.teamsPerHour[i].length > 4 && (
																						<div className="team-sub-group">
																							<p>
																								{user.teamsPerHour[i][4].name}
																							</p>
																							<p>Average ISV</p>
																							<p>
																								{user.teamsPerHour[i][4].avgIsv}
																							</p>
																						</div>
																					)}
																					<div className="change-team-container">
																						<div className="btn-shadow change-team">
																							<button
																								id={`${i}`}
																								className="x-btn"
																								onClick={(e) =>
																									eraseTeamPerHour(e)
																								}
																							>
																								X
																							</button>
																						</div>
																					</div>
																					<div className="edit-btns-container">
																						<div className="wing-box teams">
																							<button
																								className={`${i}`}
																								id={`${i}`}
																								type="button"
																								onClick={(e) => handleNotes(e)}
																							></button>
																						</div>
																					</div>
																				</div>
																				{showNotes[i] === true ? (
																					<textarea
																						className={`notes-per-hour-${i} note-input-container`}
																						value={user.notesPerHour[i]}
																						onChange={handleNoteChange}
																						id={`${i}`}
																					></textarea>
																				) : (
																					<></>
																				)}
																			</div>
																		</form>
																	</>
																) : (
																	<>
																		<form
																			id={`hour-${i + 1}-of-schedule`}
																			className="hour-form-wrapper"
																			key={`hour-${i + 1}-of-schedule`}
																		>
																			<div
																				className="hour-label-wrapper"
																				key={`hour-label-for-${i}`}
																			>
																				<p
																					className="hour-label"
																					key={`hour-label-for-${i}`}
																				>
																					Hour {i + 1}:
																				</p>
																			</div>
																			<div className="no-wrap wrap-on-media">
																				<select
																					className={`filler-input-${[i]}`}
																					id={`${i}`}
																					key={`hour-${i}-filler-1`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[0]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<select
																					className={`filler-input-${[i]}`}
																					key={`hour-${i}-filler-2`}
																					id={`${i}`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[1]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<select
																					key={`hour-${i}-filler-3`}
																					className={`filler-input-${[i]}`}
																					id={`${i}`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[2]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<select
																					key={`hour-${i}-filler-4`}
																					className={`filler-input-${[i]}`}
																					id={`${i}`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[3]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<div
																					key={`notes-wrapper-${i}`}
																					className={`notes-wrapper-${i}`}
																				>
																					<div className="wing-box">
																						<button
																							className={`${i}`}
																							id={`${i}`}
																							type="button"
																							onClick={(e) => handleNotes(e)}
																						></button>
																					</div>
																				</div>
																			</div>
																			{showNotes[i] === true ? (
																				<div className="flex-container">
																					<textarea
																						className={`notes-per-hour-${i} note-textarea`}
																						value={user.notesPerHour[i]}
																						onChange={handleNoteChange}
																						id={`${i}`}
																					></textarea>
																				</div>
																			) : (
																				<></>
																			)}
																		</form>
																	</>
																)}
															</>
														)}
														{cheerfulOrMarathon === "C" ? (
															<>
																{user.teamsPerHour[i] ? (
																	<>
																		<form
																			id={`hour-${i + 1}-of-schedule`}
																			className="hour-team-wrapper"
																			key={`hour-${i + 1}-of-schedule`}
																		>
																			<div
																				className="hour-label-wrapper"
																				key={`hour-label-for-${i}`}
																			>
																				<p
																					className="hour-label"
																					key={`hour-label-for-${i}`}
																				>
																					Hour {i + 1}:
																				</p>
																			</div>
																			<div className="matched-teams-container">
																				<div className="team-one">
																					<p className="team-number-title">
																						Chosen Team:
																					</p>
																					<div className="team-sub-group">
																						<p>{user.teamsPerHour[i].healer}</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i].fillerOne}
																						</p>
																						<p>
																							{
																								user.teamsPerHour[i]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i].fillerTwo}
																						</p>
																						<p>
																							{
																								user.teamsPerHour[i]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{user.teamsPerHour[i].fillerThree}
																						</p>
																						<p>
																							{
																								user.teamsPerHour[i]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{user.teamsPerHour[i].averageBp}
																						</p>
																						Average ISV:{" "}
																						{user.teamsPerHour[i].averageIsv}
																					</div>

																					<div className="change-team-container">
																						<div className="btn-shadow change-team">
																							<button
																								id={`${i}`}
																								className="x-btn"
																								onClick={(e) =>
																									eraseTeamPerHour(e)
																								}
																							>
																								X
																							</button>
																						</div>
																					</div>
																					<div className="edit-btns-container">
																						<div className="wing-box teams">
																							<button
																								className={`${i}`}
																								id={`${i}`}
																								type="button"
																								onClick={(e) => handleNotes(e)}
																							></button>
																						</div>
																					</div>
																				</div>
																				{showNotes[i] === true ? (
																					<textarea
																						className={`notes-per-hour-${i} note-input-container`}
																						value={user.notesPerHour[i]}
																						onChange={handleNoteChange}
																						id={`${i}`}
																					></textarea>
																				) : (
																					<></>
																				)}
																			</div>
																		</form>
																	</>
																) : (
																	<>
																		<form
																			id={`hour-${i + 1}-of-schedule`}
																			className="hour-form-wrapper"
																			key={`hour-${i + 1}-of-schedule`}
																		>
																			<div
																				className="hour-label-wrapper"
																				key={`hour-label-for-${i}`}
																			>
																				<p
																					className="hour-label"
																					key={`hour-label-for-${i}`}
																				>
																					Hour {i + 1}:
																				</p>
																			</div>
																			<div className="no-wrap wrap-on-media">
																				<select
																					className={`filler-input-${[i]}`}
																					id={`${i}`}
																					key={`hour-${i}-filler-1`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[0]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<select
																					className={`filler-input-${[i]}`}
																					key={`hour-${i}-filler-2`}
																					id={`${i}`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[1]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<select
																					key={`hour-${i}-filler-3`}
																					className={`filler-input-${[i]}`}
																					id={`${i}`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[2]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<select
																					key={`hour-${i}-filler-4`}
																					className={`filler-input-${[i]}`}
																					id={`${i}`}
																					onChange={(e) => scrapeToCtx(e)}
																					value={e[3]}
																				>
																					<option key="default">
																						Select User...
																					</option>
																					{[...user.associatedUsers].map(
																						(e, i) => (
																							<option key={`${i}-filler`}>
																								{user.associatedUsers[i]}
																							</option>
																						)
																					)}
																				</select>
																				<div
																					key={`notes-wrapper-${i}`}
																					className={`notes-wrapper-${i}`}
																				>
																					<div className="wing-box">
																						<button
																							className={`${i}`}
																							id={`${i}`}
																							type="button"
																							onClick={(e) => handleNotes(e)}
																						></button>
																					</div>
																				</div>
																			</div>
																			{showNotes[i] === true ? (
																				<div className="flex-container">
																					<textarea
																						className={`notes-per-hour-${i} note-textarea`}
																						value={user.notesPerHour[i]}
																						onChange={handleNoteChange}
																						id={`${i}`}
																					></textarea>
																				</div>
																			) : (
																				<></>
																			)}
																		</form>
																	</>
																)}
															</>
														) : (
															<></>
														)}

														<div className="find-teams-button-wrapper">
															{user.activeTeamDropdown[i] === true &&
															!user.teamsPerHour[i] &&
															cheerfulOrMarathon === "C" ? (
																<>
																	<div className="btn-shadow find-teams">
																		<button
																			className="submit-btn find-teams"
																			id={`${i}`}
																			key={`find-teams-button-hour-C-${i}`}
																			onClick={(e) =>
																				handleTeamMatcher(e.target.id)
																			}
																		>
																			Find Teams!
																		</button>
																	</div>
																	{teamMatcherPerHour[i]?.length !== 0 &&
																	teamMatcherPerHour[i] !== undefined ? (
																		<>
																			<p className="global-subheader-flipped">
																				Top 5 teams that matched the filter:
																			</p>
																			<p>
																				Refresh this list if you've changed the
																				fillers!
																			</p>

																			<div className="matched-teams-container">
																				<div className="team-one">
																					<p className="team-number-title">
																						Team One:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{teamMatcherPerHour[i][0].healer}
																						</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerOne
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerTwo
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerThree
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{
																								teamMatcherPerHour[i][0]
																									.averageBp
																							}
																						</p>
																						Average ISV:{" "}
																						{
																							teamMatcherPerHour[i][0]
																								.averageIsv
																						}
																					</div>
																					<div
																						id={0}
																						className="select-btn-container"
																					>
																						<button
																							id={`${i}`}
																							className="x-btn"
																							onClick={(e) =>
																								handleSelectTeam(e)
																							}
																						>
																							&#10003;
																						</button>
																					</div>
																				</div>
																				<div className="team-two">
																					<p className="team-number-title">
																						Team Two:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{teamMatcherPerHour[i][1].healer}
																						</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][1]
																									.fillerOne
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][1]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][1]
																									.fillerTwo
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][1]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][1]
																									.fillerThree
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][1]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{
																								teamMatcherPerHour[i][0]
																									.averageBp
																							}
																						</p>
																						Average ISV:{" "}
																						{
																							teamMatcherPerHour[i][0]
																								.averageIsv
																						}
																					</div>
																					<div
																						id={1}
																						className="select-btn-container"
																					>
																						<button
																							className="x-btn"
																							id={`${i}`}
																							onClick={(e) =>
																								handleSelectTeam(e)
																							}
																						>
																							&#10003;
																						</button>
																					</div>
																				</div>
																				<div className="team-three">
																					<p className="team-number-title">
																						Team Three:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{teamMatcherPerHour[i][2].healer}
																						</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][2]
																									.fillerOne
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][2]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][2]
																									.fillerTwo
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][2]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][2]
																									.fillerThree
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][2]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{
																								teamMatcherPerHour[i][0]
																									.averageBp
																							}
																						</p>
																						Average ISV:{" "}
																						{
																							teamMatcherPerHour[i][0]
																								.averageIsv
																						}
																					</div>
																					<div
																						id={2}
																						className="select-btn-container"
																					>
																						<button
																							id={`${i}`}
																							className="x-btn"
																							onClick={(e) =>
																								handleSelectTeam(e)
																							}
																						>
																							&#10003;
																						</button>
																					</div>
																				</div>
																				<div className="team-four">
																					<p className="team-number-title">
																						Team Four:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{teamMatcherPerHour[i][3].healer}
																						</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][3]
																									.fillerOne
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][3]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][3]
																									.fillerTwo
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][3]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][3]
																									.fillerThree
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][3]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{
																								teamMatcherPerHour[i][0]
																									.averageBp
																							}
																						</p>
																						Average ISV:{" "}
																						{
																							teamMatcherPerHour[i][0]
																								.averageIsv
																						}
																					</div>
																					<div
																						id={3}
																						className="select-btn-container"
																					>
																						<button
																							id={`${i}`}
																							className="x-btn"
																							onClick={(e) =>
																								handleSelectTeam(e)
																							}
																						>
																							&#10003;
																						</button>
																					</div>
																				</div>
																				<div className="team-five">
																					<p className="team-number-title">
																						Team Five:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{teamMatcherPerHour[i][4].healer}
																						</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][4]
																									.fillerOne
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][4]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][4]
																									.fillerTwo
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][4]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][4]
																									.fillerThree
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][4]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{
																								teamMatcherPerHour[i][0]
																									.averageBp
																							}
																						</p>
																						Average ISV:{" "}
																						{
																							teamMatcherPerHour[i][0]
																								.averageIsv
																						}
																					</div>
																					<div
																						id={4}
																						className="select-btn-container"
																					>
																						<button
																							className="x-btn"
																							id={`${i}`}
																							onClick={(e) =>
																								handleSelectTeam(e)
																							}
																						>
																							&#10003;
																						</button>
																					</div>
																				</div>
																			</div>
																			<div>
																				<p>
																					If you don't like any of these, head
																					over to the "Teams" tab on the navbar.
																					You can see all 265 combinations there
																					as well as add in substitues and sort
																					by ISV and BP!
																				</p>
																			</div>
																		</>
																	) : (
																		<></>
																	)}
																</>
															) : (
																<></>
															)}
															{teamMatcherPerHour[i]?.length === 0 &&
																cheerfulOrMarathon === "C" && (
																	<>
																		<div className="no-fillers-message">
																			<p>
																				There are no teams that match your
																				filters! You can re-do your filters for
																				the team matcher to see if there are
																				teams in a different bracket that would
																				work for you. If you think there should
																				be some teams that match your selected
																				fillers, there is a chance your fillers
																				entered their data incorrectly. You can
																				view and edit those in the "Data" tab in
																				the navbar.
																			</p>
																		</div>
																	</>
																)}
														</div>
														<div className="find-teams-button-wrapper">
															{user.activeTeamDropdown[i] === true &&
															!user.teamsPerHour[i] &&
															cheerfulOrMarathon === "M" ? (
																<>
																	<div className="btn-shadow find-teams">
																		<button
																			className="submit-btn find-teams"
																			id={`${i}`}
																			key={`find-teams-button-hour-M-${i}`}
																			onClick={(e) =>
																				arrangeTeamIntoRoomOrder(e.target.id)
																			}
																		>
																			Calculate Room Order!
																		</button>
																		<button
																			className="submit-btn find-teams"
																			id={`${i}`}
																			key={`find-teams-button-without-orderer-${i}`}
																			onClick={(e) =>
																				acceptWithoutRoomOrder(e.target.id)
																			}
																		>
																			Accept without room order!
																		</button>
																	</div>
																	{teamMatcherPerHour[i]?.length !== 0 &&
																	teamMatcherPerHour[i] !== undefined &&
																	cheerfulOrMarathon === "C" ? (
																		<>
																			<p className="global-subheader-flipped">
																				Top 5 teams that matched the filter:
																			</p>
																			<p>
																				Refresh this list if you've changed the
																				fillers!
																			</p>

																			<div className="matched-teams-container">
																				<div className="team-one">
																					<p className="team-number-title">
																						Team One:
																					</p>
																					<div className="team-sub-group">
																						<p>
																							{teamMatcherPerHour[i][0].healer}
																						</p>
																						<p>Heal team</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerOne
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerOneTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerTwo
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerTwoTeamName
																							}
																						</p>{" "}
																					</div>
																					<div className="team-sub-group">
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerThree
																							}
																						</p>
																						<p>
																							{
																								teamMatcherPerHour[i][0]
																									.fillerThreeTeamName
																							}
																						</p>
																					</div>
																					<div className="team-sub-group">
																						<p>
																							Average BP:{" "}
																							{
																								teamMatcherPerHour[i][0]
																									.averageBp
																							}
																						</p>
																						Average ISV:{" "}
																						{
																							teamMatcherPerHour[i][0]
																								.averageIsv
																						}
																					</div>
																					<div
																						id={0}
																						className="select-btn-container"
																					>
																						<button
																							id={`${i}`}
																							className="x-btn"
																							onClick={(e) =>
																								handleSelectTeam(e)
																							}
																						>
																							&#10003;
																						</button>
																					</div>
																				</div>
																			</div>
																		</>
																	) : (
																		<></>
																	)}
																</>
															) : (
																<></>
															)}
														</div>
														<p ref={bottomRef}></p>
													</div>
												))}

												{ShowMissingFillers ? (
													<div className="needed-hour-wrapper">
														<p className="global-header-flipped fillers-header">
															Needed fillers:
														</p>
														<p className="needed-filler-subheading">
															(You can copy/paste the list!)
														</p>
														{[...emptyTeams].map((e, i) => (
															<div
																key={`${i}emptylist`}
																className="needed-filler-entry"
															>
																<b>Hour {emptyTeams[i].hour}</b> +
																{emptyTeams[i].emptySlots.length}filler
																<br />
															</div>
														))}
														<button
															className="submit-btn "
															onClick={generateMissingFillers}
														>
															Generate NEW Missing List
														</button>
													</div>
												) : (
													<button
														className="submit-btn"
														onClick={generateMissingFillers}
													>
														Generate Missing List
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
						</>
					) : (
						<>
							{console.log(
								`User has more than one registered event, have them choose`
							)}
							{/* CASE user has 1+ context and needs to pick */}
							<div className="page-background">
								<AccessoriesForDialogueBox />
								<div className="dialogue-box-schedule">
									<div className="schedule-accessories">
										<AccessoriesForDialogueBox />
									</div>
									<div className="event-selection-wrapper">
										<div className="event-dropdown-wrapper">
											<p className="event-txt">
												Which event are you wanting to work on?
											</p>
										</div>
										<div className="event-input-wrapper">
											<p className="">(Event, lead manager)</p>
											<select
												onChange={(e) => setEventState(e.target.key)}
												className="choose-event"
												id="event-select-choice"
											>
												<option default>Please select an option...</option>
												{[...user.registeredEvents].map((e, i) => (
													<option
														key={
															user.registeredEvents[i].event +
															user.registeredEvents[i].leadManager
														}
														id=""
														className={user.registeredEvents[i].leadManager}
													>
														{user.registeredEvents[i].event},{" "}
														{user.registeredEvents[i].leadManager}
													</option>
												))}
											</select>
										</div>
										<div className="btn-shadow-event">
											<button className="submit-btn" onClick={chooseEvent}>
												Submit
											</button>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<AdminNotice />
			)}
		</>
	);

	function arrangeTeamIntoRoomOrder(hour) {
		(async () => {
			let encoreTeamInCalc = false;
			const grabbedTeams = await grabTeams(hour);
			for (let i = 0; i < grabbedTeams.length; i++) {
				if (grabbedTeams[i].teams.encoreTeam) {
					encoreTeamInCalc = true;
				}
			}
			const roomOrderer = new RoomOrderer(
				user.runner,
				grabbedTeams,
				encoreTeamInCalc
			);
			const successfulRoomOrderer = roomOrderer.execute();
			const newTeamsPerHour = user.teamsPerHour.slice();
			newTeamsPerHour[hour] = successfulRoomOrderer;
			setUser({
				...user,
				teamsPerHour: newTeamsPerHour,
			});
		})();
	}

	function acceptWithoutRoomOrder(hour) {
		(async () => {
			const grabbedTeams = await grabTeams(hour);
			const newGrabbedTeams = [];
			for (let i = 0; i < grabbedTeams.length; i++) {
				const teamName = grabbedTeams[i].teams.encoreTeam
					? "encoreTeam"
					: "fillTeam";

				const newFillerObj = {
					name: grabbedTeams[i].discordName,
					avgIsv:
						(parseInt(grabbedTeams[i].teams[teamName].isv1) +
							parseInt(grabbedTeams[i].teams[teamName].isv2)) /
						2,
				};
				newGrabbedTeams.push(newFillerObj);
			}
			console.log(`GRABBED teams:`, grabbedTeams);
			const newTeamsPerHour = user.teamsPerHour.slice();
			newTeamsPerHour[hour] = newGrabbedTeams;
			setUser({
				...user,
				teamsPerHour: newTeamsPerHour,
			});
		})();
	}

	/**
	 * Populates context based on select elements
	 * @param event - The ID of the button, cooresponding to the hour
	 * Takes the HTML elements for the hour that is associated with the button clicked and pulls the values out. Then, creates a new array
	 * of those four elements and rewrites the current schedule array at hour "e" with that new array.
	 * @return An array of strings
	 */
	function scrapeToCtx(event) {
		console.log("Hour you're editing: " + event.target.id + "(but plus one)");
		let hour = parseInt(event.target.id);
		const hourInputElements = document.getElementsByClassName(
			`filler-input-${[hour]}`
		);
		const hourInputValues = [];
		for (let i = 0; i < hourInputElements.length; i++) {
			hourInputValues.push(hourInputElements[i].value);
		}

		// Copy the schedule array
		const newScheduleArray = JSON.parse(JSON.stringify(user.scheduleArray));
		// Modify the one hour we care about
		newScheduleArray[hour] = hourInputValues;
		// Set the schedule array to the newly modified one
		setUser({
			...user,
			scheduleArray: newScheduleArray,
		});

		if (
			newScheduleArray[hour][0] !== "Select User..." &&
			newScheduleArray[hour][1] !== "Select User..." &&
			newScheduleArray[hour][2] !== "Select User..." &&
			newScheduleArray[hour][3] !== "Select User..." &&
			newScheduleArray[hour][0] !== "" &&
			newScheduleArray[hour][1] !== "" &&
			newScheduleArray[hour][2] !== "" &&
			newScheduleArray[hour][3] !== ""
		) {
			const newActiveArray = user.activeTeamDropdown.slice(); //copy the array
			newActiveArray[hour] = true; //execute the manipulations
			setUser({
				...user,
				activeTeamDropdown: newActiveArray,
				scheduleArray: newScheduleArray,
			});
		} else {
			const newActiveArray = user.activeTeamDropdown.slice(); //copy the array
			newActiveArray[hour] = false; //execute the manipulations
			setUser({
				...user,
				activeTeamDropdown: newActiveArray,
				scheduleArray: newScheduleArray,
			});
		}
	}

	function handleNotes(e) {
		console.log(`CLICK COUNTER`);
		//handles showing not writing the user inpput
		const hour = e.target.id;
		const newNotesArray = showNotes.slice();
		newNotesArray[hour] = !showNotes[hour];
		setShowNotes(newNotesArray);
	}

	function handleNoteChange(e) {
		console.log(e);
		const hour = e.target.id;
		//this one handles remembering user input
		const newNotesArray = user.notesPerHour.slice();
		newNotesArray[hour] = e.target.value;
		setUser({
			...user,
			notesPerHour: newNotesArray,
		});
	}

	/**
	 *	Sets the global context based on event
	 * Pulls the event from local state and queries the database for the context. After receiving, sets that data
	 * equal to the global context in the app.
	 * @return The whole run object from the databse
	 */
	function chooseEvent() {
		const eventAndManager = document
			.getElementById("event-select-choice")
			.value.split(/\s*,\s*/);
		if (
			eventAndManager[0] === "Please select an option..." ||
			eventAndManager[0] === ""
		) {
			alert("Please choose an option");
			return;
		}

		let eventObject = {
			event: eventAndManager[0],
			leadManager: eventAndManager[1],
			manager: user.user,
		};
		const type = marathonOrCheerful(globalContext, eventAndManager[0]);
		setCheerfulOrMarathon(type);
		const url = `http://localhost:8080/return/context`;
		(async () => {
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(eventObject),
			});
			const data = await res.json();
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
				const sortedAssociatedUsers = data[0].associatedUsers.sort();
				setUser({
					...user,
					event: eventAndManager[0],
					runner: data[0].runner,
					scheduleArray: data[0].schedule,
					associatedUsers: sortedAssociatedUsers,
					leadManager: data[0].leadManager,
					activeTeamDropdown: data[0].activeTeamDropdown,
					notesPerHour: data[0].notesPerHour,
					teamsPerHour: data[0].teamsPerHour,
				});
			}
		})();
	}

	/**
	 * Asks is the user really wants to save, and if so, calls saveSchedule. Otherwise nothing happens
	 */
	function confirmSave() {
		console.log(user);
		confirmAlert({
			message:
				"Are you sure you'd like to save? This will rewrite your currently saved schedule!",
			buttons: [
				{
					label: "Yes",
					onClick: () => saveSchedule(),
				},
				{
					label: "No",
				},
			],
		});
	}

	/**
	 * Calls to the backend to save the current scheduleArray into the database
	 */
	function saveSchedule() {
		const url = `http://localhost:8080/save/schedule`;
		(async () => {
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify({
					manager: user.leadManager,
					schedule: user.scheduleArray,
					event: user.event,
					activeTeamDropdown: user.activeTeamDropdown,
					notesPerHour: user.notesPerHour,
					teamsPerHour: user.teamsPerHour,
				}),
			});
			const data = await res.json();
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
			}
		})();
	}

	/**
	 * Asks is the user really wants to load, and if so, calls loadSchedule. Otherwise nothing happens
	 */
	function confirmLoad() {
		confirmAlert({
			message:
				"Are you sure you'd like to load? This will erase the current schedule!",
			buttons: [
				{
					label: "Yes",
					onClick: () => loadSchedule(),
				},
				{
					label: "No",
				},
			],
		});
	}

	/**
	 * Calls to the backend to load the schedule from the database into the global state schedule
	 */
	function loadSchedule() {
		let queryObject = { manager: user.leadManager, event: user.event };
		console.log(queryObject);
		const url = `http://localhost:8080/recall/schedule`;
		(async () => {
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(queryObject),
			});
			const data = await res.json();
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
				setUser({ ...user, scheduleArray: data });
			}
		})();
	}

	/**
	 * Calls the team matcher
	 * @param hour - The ID of the button pressed cooresponding to the hour
	 * Calls to get the teams of the four fillers of the hour passed, then runs
	 * the team matcher over them and the runner that's in the global state.
	 * *Set the end to drop down like the team matcher button with the teams!
	 */
	function handleTeamMatcher(hour) {
		(async () => {
			const grabbedTeams = await grabTeams(hour);
			const teamMatcher = new TeamMatcher(user.runner, grabbedTeams, min, max);
			const successfulTeamMatcher = teamMatcher.execute();
			console.log(`Teams that matched the filter:`, successfulTeamMatcher);
			setSuccessfulTeamMatcher(successfulTeamMatcher);
			console.log(successfulTeamMatcher);
			const newSchedPerHr = teamMatcherPerHour.slice(); //copy the array
			newSchedPerHr[hour] = successfulTeamMatcher; //execute the manipulations
			setTeamMatcherPerHour(newSchedPerHr);
		})();
	}

	/**
	 * Returns the filler teams
	 * @param hour - The ID of the button pressed cooresponding to the hour
	 * Calls to the database and retrieves the teams for the fillers of the hour
	 */
	async function grabTeams(hour) {
		const fillers = [
			user.scheduleArray[hour][0],
			user.scheduleArray[hour][1],
			user.scheduleArray[hour][2],
			user.scheduleArray[hour][3],
		];
		let hourQuereyObject = { fillers: fillers, event: user.event };
		const url = `http://localhost:8080/return/teams/per/hour`;
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(hourQuereyObject),
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
			let tempUsers = [];
			for (let i = 0; i < 4; i++) {
				tempUsers.push(data[i][0].userData);
			}
			return tempUsers;
		}
	}

	/**
	 * Displays missing fillers
	 *	Calls to get the fillers then shows them on screen
	 */
	function generateMissingFillers() {
		missingFillers();
		setShowMissingFillers(true);
	}

	/**
	 * Finds the missing fillers
	 * Loops through the schedule array checking for a value of "Select One..." and
	 * pushes into a sub array if it finds that value. Then pushes the length of that array to another one,
	 * which cooresponds with a lost of hours and the length pushed in was how many values were found.
	 * Then sets the local state to the array to refresh the componenet and show the list of missing fillers.
	 */
	function missingFillers() {
		const emptyTeamsPlaceholder = [];
		setEmptyTeams([]);
		for (let i = 0; i < user.scheduleArray.length; i++) {
			let emptySlots = [];

			for (let j = 0; j < user.scheduleArray[i].length; j++) {
				if (
					user.scheduleArray[i][j] === "Select User..." ||
					user.scheduleArray[i][j] === ""
				) {
					emptySlots.push(j);
				}
			}

			emptyTeamsPlaceholder.push({
				hour: i + 1,
				emptySlots,
			});
		}
		setEmptyTeams(emptyTeamsPlaceholder);
	}

	function eraseTeamPerHour(e) {
		const hour = e.target.id;
		const newTeamsPerHour = user.teamsPerHour.slice();
		console.log(`NEW`, newTeamsPerHour);
		newTeamsPerHour[hour] = "";
		setUser({
			...user,
			teamsPerHour: newTeamsPerHour,
		});
	}

	function handleSelectTeam(e) {
		const hour = e.target.id;
		const team = e.target.parentElement.id;
		const newTeamsPerHour = user.teamsPerHour.slice();
		console.log(`NEW`, newTeamsPerHour);
		newTeamsPerHour[hour] = teamMatcherPerHour[hour][team];
		setUser({
			...user,
			teamsPerHour: newTeamsPerHour,
		});
		setConfirmNewTeam(false);
	}

	function handleRangeChange(e) {
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
}
