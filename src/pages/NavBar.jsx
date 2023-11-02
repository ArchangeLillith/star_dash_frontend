import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../context";
import { confirmAlert } from "react-confirm-alert";
import Hamburger from "../components/Hamburger";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GlobalContext } from "../context";

export function NavBar() {
	const { user, setUser } = useContext(UserContext);
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [navLogo, setNavLogo] = React.useState({
		src: `../img/logo.png`,
	});
	const [selectionMode, setSelectionMode] = React.useState(false);
	const [hamburgerOpen, setHamburgerOpen] = React.useState();

	return (
		<>
			{user.loggedIn ? (
				<>
					<nav className="navbar navbar-expand-lg">
						<div className="navbar-brand">
							<div onClick={handleRefresh}>
								<img
									className="back-img"
									src={navLogo.src}
									alt="back arrow"
									id="nav-logo"
									onMouseEnter={() => {
										setNavLogo({
											src: `../img/logo-hover.png`,
										});
									}}
									onMouseOut={() => {
										setNavLogo({
											src: `../img/logo.png`,
										});
									}}
								/>
							</div>
						</div>
						<div className="navbar-wrapper">
							<ul className="navbar-nav mr-auto">
								{user.registeredEvents.length === 0 ? (
									<>
										<li className="nav-item">
											<a className="nav-link" href="#/CreateRun">
												Create new run!
											</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="#/JoinRun">
												Join a Run!
											</a>
										</li>
									</>
								) : (
									<>
										{user.registeredEvents?.length > 1 &&
										user.event === null ? (
											<>
												<li className="nav-item">
													<a className="nav-link sched-nav" href="#/Schedule">
														Choose an Event!
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link sched-nav" href="#/JoinRun">
														Join a Run!
													</a>
												</li>
											</>
										) : (
											<>
												<li className="nav-item  display-none-on-mobile">
													<a className="nav-link sched-nav" href="#/Schedule">
														Schedule
													</a>
												</li>

												<li className="nav-item   display-none-on-mobile">
													<a className="nav-link admin-nav" href="#/Teams">
														Teams
													</a>
												</li>

												<li className="nav-item  display-none-on-mobile">
													<a className="nav-link admin-nav" href="#/UserData">
														Fillers
													</a>
												</li>
												<li className="nav-item  display-none-on-mobile">
													<a className="nav-link admin-nav" href="#/Managers">
														Managers
													</a>
												</li>
												<li className="nav-item  display-none-on-mobile">
													<a className="nav-link admin-nav" href="#/Admin">
														How To
													</a>
												</li>
												<li className="nav-item  display-none-on-mobile">
													<a className="nav-link sched-nav" href="#/JoinRun">
														Join a Run!
													</a>
												</li>
												<div className="media-navbar ">
													<div className="hamburger" onClick={toggleHamburger}>
														<Hamburger isOpen={hamburgerOpen} />
													</div>
												</div>
												{hamburgerOpen && (
													<ul className="media-navbar">
														<li className="nav-item ">
															<a
																className="nav-link sched-nav"
																href="#/Schedule"
															>
																Schedule
															</a>
														</li>
														{/* {globalContext[user.event]?.type === "C" && (
															<li className="nav-item  ">
																<a
																	className="nav-link admin-nav"
																	href="#/Teams"
																>
																	Teams
																</a>
															</li>
														)} */}
														<li className="nav-item ">
															<a
																className="nav-link admin-nav"
																href="#/UserData"
															>
																Fillers
															</a>
														</li>
														<li className="nav-item ">
															<a
																className="nav-link admin-nav"
																href="#/Managers"
															>
																Managers
															</a>
														</li>
														<li className="nav-item ">
															<a className="nav-link admin-nav" href="#/Admin">
																How To
															</a>
														</li>
														<li className="nav-item">
															<a className="nav-link admin-nav" href="#/Teams">
																Teams
															</a>
														</li>
														<li className="nav-item">
															<a
																className="nav-link sched-nav"
																href="#/JoinRun"
															>
																Join a Run!
															</a>
														</li>
														<li>
															<a href="#/CreateRun" className="nav-button-link">
																Create new run!
															</a>
														</li>
														<li>
															<button
																onClick={(e) => confirmEventChange(e)}
																className="nav-button-link-change"
															>
																Change Event!
															</button>
														</li>
													</ul>
												)}
											</>
										)}
									</>
								)}

								{user.event && !selectionMode ? (
									<>
										<li className="nav-item">
											<p
												key="nav-event"
												className="nav-event nav-link display-none-on-mobile"
											>
												Event you're editing: <br />
												{user.event}
											</p>
											<p
												key="nav-lead-manager"
												className="nav-event nav-link display-none-on-mobile"
											>
												Lead Manager: {user.leadManager}
											</p>
										</li>
										<li className="nav-button-back">
											<a
												href="#/CreateRun"
												className="nav-button-link display-none-on-mobile"
											>
												Create new run!
											</a>
										</li>
									</>
								) : (
									<></>
								)}
								{user.registeredEvents?.length > 1 &&
								!selectionMode &&
								user.event ? (
									<>
										<li className="nav-button-back display-none-on-mobile">
											<button
												onClick={(e) => confirmEventChange(e)}
												className="nav-button-link-change display-none-on-mobile"
											>
												Change Event!
											</button>
										</li>
									</>
								) : (
									<></>
								)}

								{selectionMode ? (
									<>
										<li className="nav-item">
											<select
												className="change-event-selection"
												id="event-select-choice"
												onChange={(e) => handleChange(e)}
											>
												<option key="please choose" default>
													Please choose an event...
												</option>
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
										</li>
									</>
								) : (
									<></>
								)}
							</ul>
						</div>
					</nav>
				</>
			) : (
				<>
					<nav className="navbar navbar-expand-lg">
						<div className="navbar-brand">
							<a href="/">
								<img
									className="back-img"
									src={navLogo.src}
									alt="back arrow"
									id="nav-logo"
									onMouseEnter={() => {
										setNavLogo({
											src: `../img/logo-hover.png`,
										});
									}}
									onMouseOut={() => {
										setNavLogo({
											src: `../img/logo.png`,
										});
									}}
								/>
							</a>
						</div>
						<div className="navbar-wrapper">
							<ul className="navbar-nav mr-auto display-none-on-mobile">
								<li className="nav-item">
									<a className="nav-link CC-nav" href="#/CheerfulCarnival">
										Cheerful Carnival
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link Mara-nav" href="#/Marathon">
										Marathon
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link admin-nav" href="#/Admin">
										Admin
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link admin-nav" href="#/CreateAccount">
										Create Account
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link admin-nav" href="#/UserHelp">
										Help!
									</a>
								</li>
							</ul>
							<div className="media-navbar">
								<div className="hamburger" onClick={toggleHamburger}>
									<Hamburger isOpen={hamburgerOpen} />
								</div>
							</div>
							{hamburgerOpen && (
								<ul className="media-navbar">
									<li className="nav-item">
										<a className="nav-link CC-nav" href="#/CheerfulCarnival">
											Cheerful Carnival
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link Mara-nav" href="#/Marathon">
											Marathon
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link admin-nav" href="#/Admin">
											Admin
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link admin-nav" href="#/CreateAccount">
											Create Account
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link admin-nav" href="#/UserHelp">
											Help!
										</a>
									</li>
								</ul>
							)}
						</div>
					</nav>
				</>
			)}
		</>
	);

	function confirmEventChange() {
		confirmAlert({
			message:
				"Are you sure you'd like to change the event? This will reset your schedule if you're working on it! Please save before doing this if you don't want to loose your hard work",
			buttons: [
				{
					label: "Yes",
					onClick: () => eventChange(),
				},
				{
					label: "No",
				},
			],
		});
	}

	function toggleHamburger() {
		setHamburgerOpen(!hamburgerOpen);
	}

	function handleRefresh() {
		confirmAlert({
			message:
				"Go back to home page? This will reset anything you haven't saved and also log you out!",
			buttons: [
				{
					label: "Yes",
					onClick: () => window.location.reload(),
				},
				{
					label: "No",
				},
			],
		});
	}

	function eventChange(e) {
		setSelectionMode(true);
	}

	async function handleChange(e) {
		const eventAndManager = document
			.getElementById("event-select-choice")
			.value.split(/\s*,\s*/);
		let managerContext = await getContext(
			eventAndManager[0],
			eventAndManager[1]
		);
		const sortedAssociatedUsers = managerContext[0].associatedUsers.sort();
		console.log(`Active team dropdown:`, managerContext[0].activeTeamDropdown);
		setUser({
			...user,
			event: managerContext[0].event,
			scheduleArray: managerContext[0].schedule,
			runner: managerContext[0].runner,
			leadManager: managerContext[0].leadManager,
			associatedUsers: sortedAssociatedUsers,
			activeTeamDropdown: managerContext[0].activeTeamDropdown,
			notesPerHour: managerContext[0].notesPerHour,
			teamsPerHour: managerContext[0].teamsPerHour,
		});
		console.log(user);
		setSelectionMode(false);
	}

	async function getContext(event, leadManager) {
		let queryObject = { manager: user.user, event, leadManager: leadManager };
		console.log(queryObject);
		const url = `http://localhost:8080/return/context`;
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(queryObject),
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
			console.log(`Data returned from /get/context:`, data);
			return data;
		}
	}
}
