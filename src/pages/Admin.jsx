import React from "react";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox.jsx";
import { HeartBorder } from "../components/HeartBorder.jsx";
import { useContext } from "react";

import { UserContext, GlobalContext } from "../context";
import { confirmAlert } from "react-confirm-alert";

export function Admin() {
	const { user, setUser } = useContext(UserContext);
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [usernameInput, setUsernameInput] = React.useState("");
	const [passInput, setPassInput] = React.useState("");

	return (
		<>
			<div className="page-background user-help"></div>
			{!user.loggedIn ? (
				<>
					<div className="dialogue-box-admin">
						<div className="admin-accessories">
							<AccessoriesForDialogueBox />
						</div>
						<div className="admin-wrapper">
							<>
								<div className="global-header">
									<p className="global-header">Welcome Back!</p>
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
									</div>
								</form>
								<HeartBorder />
								<div className="submit-wrapper">
									<div className="btn-shadow">
										<button
											type="button"
											className="submit-btn"
											onClick={login}
										>
											Login
										</button>
									</div>
								</div>
							</>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="dialogue-box-admin-help">
						<div className="admin-accessories">
							<AccessoriesForDialogueBox />
						</div>
						<div className="admin-wrapper">
							<div>
								<div>
									<p className="global-header scale-up">How To!</p>
									<div className="admin-help-body">
										<p className="welcome-message small-font">
											Welcome to StarDash! Thank you for using our website, we
											worked really hard on it and are so honored you've chosen
											to trust us with your run. Below are some common questions
											we've gotten over the launch of this project and some way
											to potentially troubleshoot if you've gotten stuck. You're
											always welcome and encouraged to ask questions over at our
											discord, we're activley working on new features for the
											website and would love your input &#128156;
											~ArchangeLillith and the rest of the StarDash team
										</p>

										<div className="answer-container">
											<p className="help-question">How do I use this site?</p>
											<p className="help-answer">
												Quick and simple tutorial! <br />
												Step 1: Create your event!
												<br />
												Step 2: Get your fillers to register for that event
												using the name your chose when you created your StarDash
												account <br />
												Step 3: Head to the <a href="#/Schedule">
													"Schedule"
												</a>{" "}
												tab and start adding your fillers to the hours they want{" "}
												<br />
												<br />
												For CC: <br />
												Step 4: Once the hour is complete, you get an option to
												run the TeamMatcher that spits out the teams based on
												your selected BP bracket <br />
												Step 5: Select one of the five teams there if you like
												it, or head over to the <a href="#/Teams">
													"Teams"
												</a>{" "}
												tab and see all the combinations that are possible with
												those fillers <br />
												Step 5.5 (Optional): Use the carrot on the right side of
												the hour block in the schedule page to add notes! These
												show up in the "Teams" tab, so it's a great place to
												note if you have fillers
												<br /> Step 6: Fill out the rest of the schedule as
												described above, and then have a great run!!
												<br />
												<br />
												For Marathon: <br />
												Step 4: Once you have an hour filled, you can then
												accept a room order (the standard 54123 or 15423 if
												there's an encore team involved) or accept the team,
												choosing the order you have the fillers in.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">Terms!</p>
											<div className="help-answer">
												<ul>
													<li>TeamMatcher</li>
													<ul>
														<li>
															The algorithm that spits out CC teams based on
															selected BP
														</li>
													</ul>
													<li>Filler</li>
													<ul>
														<li>
															Your lovely fillers, be it CC or Marathon the term
															is used interchagnabley
														</li>
													</ul>
													<li>Manager</li>
													<ul>
														<li>
															A person associated with at least one event that
															has an account for StarDash. They can edit
															everything, see everything and delete things
															related to the run other than the one thing only
															the lead manager can do.
														</li>{" "}
													</ul>{" "}
													<li>Lead Manager</li>
													<ul>
														<li>
															The manager that originaly created the event and
															the password. They are the only ones who can
															delete other managers from the run.
														</li>
													</ul>
													<li>Runner</li>
													<ul>
														<li>The person who's tiering!</li>
													</ul>
													<li>Run Password</li>
													<ul>
														<li>
															A phrase that locks a run so not anyone can join.
															Anyone with the password can add themselves!
															Please share this with only your trusted members
															of the team, as managers in a run can edit the
															schedule, the runner data, the fillers, as well as
															delete fillers.
														</li>
													</ul>
												</ul>
											</div>
										</div>
										<div className="answer-container">
											<p className="help-question">Page Explinations</p>
											<div className="help-answer">
												<ul>
													<li>
														<a href="#/Schedule" className="light-link">
															Schedule Page
														</a>
													</li>
													<ul>
														<li>
															The bread and butter of this website! Here you can
															choose from any of the registered fillers to add
															them to an hour in the schedule. In CC, this also
															allows you to choose a team to go into that slot!
															For Marathon, you can accept a lineup and magic
															happens to align all of the fillers into the
															correct room order based on their ISV. Please
															note, "Ki" and "Ki ENCORE" are not the same! The
															encore team is added as a seperate filler for
															easier recognition.
														</li>
														<li>
															There's a small carrot on the right side of each
															hour box on the page, and that's the note button!
															Notes are saved like evreything else when you hit
															"Save", so you and other managers can communicate
															about an hour specifically and not clog up the
															Discord server. This is good for letting other
															managers know if perhaps someone in the hour is a
															bit flaky, but the more intended use is subs! The
															notes show up in the{" "}
															<a href="#/Teams" className="light-link">
																"Teams"
															</a>{" "}
															page so you can add them into the pool and see if
															there's a better CC team with them instead of one
															of the other fillers.
														</li>
													</ul>
													<li>
														<a href="#/Teams" className="light-link">
															Teams Page
														</a>
													</li>
													<ul>
														<li>
															The house for the Team matcher! Only useful for CC
															events. This function takes all of the fillers
															teams (fill, heal, SB1 SB2) and spits out the
															combinations that match the BP requirement you
															have selected. The TeamMatcher is used in the
															schedule page as well, but there it only returns 5
															teams, not the 200+ it could return.
														</li>
													</ul>
													<li>
														<a href="#/UserData" className="light-link">
															Fillers
														</a>
													</li>
													<ul>
														<li>
															The place to see your lovely fillers stats! If
															you're seeing some funny numbers in the
															TeamMatcher if you're CC, or the room order isn't
															making sense, you can look here and see exactly
															what teams your fillers have submitted.
														</li>
														<li>
															This page is also where you EDIT your fillers! We
															know numbers change through a run, and chose to
															have the managers take care of that to decrease
															the chance for sabatoge from other runs.
														</li>
														<li>
															Runner stats also live here! You can edit them as
															well as change their name here if you'd like. This
															is the only name you can change, it's almost
															impossible to allow people to change filler names
															without breaking the entire website...{" "}
														</li>
													</ul>
													<li>
														<a href="#/Managers" className="light-link">
															Managers
														</a>
													</li>
													<ul>
														<li>
															If you're not the lead manager, you won't see
															anything but an error. This is the page that
															allows only the lead manager to delete other
															managers from their run.
														</li>
													</ul>
													<li>
														<a href="#/Admin" className="light-link">
															Help
														</a>
													</li>
													<ul>
														<li>
															This page! A long list of troubleshooting and FAQs
															we've gotten to hopefully make your experience
															better
														</li>
													</ul>
													<li>
														<a href="#/JoinRun" className="light-link">
															Join a Run
														</a>
													</li>
													<ul>
														<li>
															This is how you add yourself to another managers
															run. The only limitation so far is you cannot be a
															lead manager of the same event more than once, but
															you CAN join other runs of the same event (and as
															many as you'd like) if they've got different lead
															managers. This is a great workaround for a double
															runner scenario, something yet to be implimented.
															I'll talk later down the page about how to do that
															in detail.
														</li>
													</ul>
													<li>
														<a href="#/CreateRun" className="light-link">
															Create New Run
														</a>
													</li>
													<ul>
														<li>
															The place to make a new instance of the event! You
															choose the event, enter your runner data and
															optionally name your runner. You also choose the
															run password here, which you share with other
															managers so they can join to view and edit your
															run.{" "}
														</li>
													</ul>
													<li>
														<a href="#/Admin" className="light-link">
															Change Event
														</a>
													</li>
													<ul>
														<li>
															This is how you'd swap from event to event if
															you're in multiple. The list is populated with
															only runs you have added yourself to, so no
															worries about getting lost in some blank run.{" "}
														</li>
													</ul>
												</ul>
											</div>
										</div>
										<div className="answer-container">
											<p className="help-question">
												Can I manage two people for the same event?
											</p>
											<p className="help-answer">
												Short answer, kind of. If you're the lead manager for
												one run, you <i>cannot</i> be a lead manager for another
												run for the same event. However, you are free to join
												other runs as a sub manager (for the same event)
												provided you have the time! This being said, you CAN be
												the lead manager for a <i>different</i>
												event.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												Why does my friend's website look different? There are
												more buttons on theirs!
											</p>
											<p className="help-answer">
												The website is dynamic, meaning as you as you need more
												buttons, they appear! If your manager name is only
												associated with one event, you won't have the button to
												change the run you're working on. There's also an
												initial check if you have multiple events you're
												registered asking which event you'd like to work on.
												That doesn't make much sense if you only have one event!
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												If one of the managers on my team is being a jerk, what
												can I do?
											</p>
											<p className="help-answer">
												With the context of the community being a bit catty
												sometimes, we made the decision to allow only the lead
												manager to delete managers from their run. This will
												delete their name from the run and they won't be able to
												see anything pertaining to the run anymore. This action
												comes with a required run password reset, as the person
												deleted could potentially access the run by just
												rejoining. If you've deleted someone, we ideally want
												them to stay that way! Deleting someone means that they
												no longer have access to your run, be it viewing OR
												editing. If you made a mistake they can always rejoin by
												using the new run password.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												When an event ends, how long can I access the schedule?
											</p>
											<p className="help-answer">
												Since we don't want the database to be slower than
												necessary with data that's not activley used, we wipe
												each events data after the event proceeding it ends. In
												other words, when your event ends, you have the full
												duration of the next event to access your data before
												it's gone for good. We're hoping to impliment a schedule
												download so you can recieve all the fillers through your
												event in plain text, check the Discord to see our
												progress on that and vote for new features!
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												When I delete a manager or user, what happens?
											</p>
											<p className="help-answer">
												Their data ceases to exist in the databse, meaning the
												manager no longer has access to the run and the user is
												not used in any calculation for the teams. The manager
												can't rejoin, as in the process of deleting the manager
												from the run, the password is reset. The only way they
												could get back in is to get the new run password from
												the lead manager. The user, however, can add their data
												back in. This doesn't mean you have to use it, in fact
												it may be easier to leave the filler in if they're spam
												adding themselves after deletion because they can't add
												themselves more than once. You can ignore their name in
												the dropdown for scheduling, as the sheduled names there
												are the only ones used in the team building!
											</p>{" "}
										</div>
										<div className="answer-container">
											<p className="help-question">
												Someone is adding like 20 dud fillers that aren't
												supposed to be in my run!
											</p>
											<p className="help-answer">
												Figured this would happen eventually. Please contact
												myself (ArcahngeLillith) or the other managers in the
												Discord and we'll help you out there, no need to delete
												the users yourself it's it's over 20. We're working on
												implimenting a way to limit how much one person can add
												to the database to combat this type of negative
												behavior.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												How do I add a user if they can't get to it/won't do it
												themselves?
											</p>
											<p className="help-answer">
												Just like a filler would! Log out and enter their stats
												in whichever event you're running with your manager name
												and it'll associate that user with you. I reccomend you
												try this before throwing your fillers at it so you can
												help walk them through it, though it should be
												straightforward.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												My filler mispelled their name, help!
											</p>
											<p className="help-answer">
												Unfortunetly, because of the way the website is written,
												we can't allow you to change the name of your fillers.
												The best we can offer is to ask them to re-register
												under the correct name, then you can delete the old
												entry. However, if they're filling for multiple teams,
												they'll have to re-register for all of them separately
												and may not want to put in the extra work. You can
												consider suggesting they temporarily change their
												Discord name to the mispelling so you can ping them
												easier, but that's up to you. Some people aren't very
												open to that.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												The schedule is different than when I last saved! What
												happend?
											</p>
											<p className="help-answer">
												Other managers in your run edited it! If you have no
												other managers associated with your run, PLEASE reach
												out to me (ArchangeLillith), that's a huge issue. You're
												welcome to report that through our bug report process (I
												do check those) but I'd prefer you reach out to me as
												that's really,
												<i>really</i> not supposed to happen.
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												One of my runners said their numbers changed, but it
												already changed in the system?
											</p>
											<p className="help-answer">
												Other managers edited it! The team that a filler enters
												for an event for one
											</p>
										</div>
										<div className="answer-container">
											<p className="help-question">
												How do I go about making a double runner event?
											</p>
											<p className="help-answer">
												No worries, it's a bit complicated but there is a
												workaround since I expected this would happen. Two of
												the managers in the run need to make seperate accounts
												for the same event, each with one of the runners as a
												runner. Now we have two accounts, one runner per each
												account. Have the managers add themselves to each run,
												and add the runner who's NOT in the run as a filler.
												This gives flexibility to have one runner step away for
												a bit when the other runner doesn't want to! You can now
												populate the schedule with the other runner as a filler
												whenever they want to run.
												<br />
												<br />
												Some notes about CC: For CC, it does require some input
												to all of the teams that are usually required of the
												fillers. Just drop in zeros for the teams that the
												runner doesn't have, I know it's rare but there are
												runners who have heal teams. It'll show in the Filler
												tab that the teams exist, but because they're 0, they
												won't show up in any of the teams after they're run
												through TeamMatcher since one 0 would bring an average
												too low.
											</p>
										</div>
									</div>
								</div>
								<HeartBorder />
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);

	/**
	 * Attempts to log in the user
	 * The function checks the username and password that are input by the user against
	 * the data in the database and sets the user as logged in, allowing for more functionality if so
	 */
	function login() {
		if (passInput !== "" && usernameInput !== "") {
			const url = `http://localhost:8080/account/login/`;
			let loginObject = { manager: usernameInput, password: passInput };
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
				const fetchedEvents = await response.json();
				console.log(`FetchedEvents:`, fetchedEvents);
				if (fetchedEvents.error?.data) {
					setUser({ ...user, loggedIn: false });
					alert(fetchedEvents.error.data);
					return;
				}
				if (fetchedEvents.eventList?.length === 1) {
					const eventObj = {
						manager: usernameInput,
						event: fetchedEvents.eventList[0].event,
						leadManager: fetchedEvents.eventList[0].leadManager,
					};
					const url = `http://localhost:8080/return/context/`;
					const responseCtx = await fetch(url, {
						method: "POST",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Credentials": true,
						},
						body: JSON.stringify(eventObj),
					});
					const dataCtx = await responseCtx.json();
					if (dataCtx.error?.data) {
						let errorMessage = fetchedEvents.error?.data;
						confirmAlert({
							message: errorMessage,
							buttons: [
								{
									label: "Okay",
								},
							],
						});
					} else {
						console.log(`dataCtx:`, dataCtx);
						const sortedAssociatedUsers = dataCtx[0].associatedUsers.sort();
						console.log(`Notes per hour:`, dataCtx[0].notesPerHour);
						setUser({
							...user,
							user: usernameInput,
							loggedIn: true,
							event: dataCtx[0].event,
							registeredEvents: fetchedEvents.eventList,
							scheduleArray: dataCtx[0].schedule,
							runner: dataCtx[0].runner,
							leadManager: dataCtx[0].leadManager,
							associatedUsers: sortedAssociatedUsers,
							activeTeamDropdown: dataCtx[0].activeTeamDropdown,
							notesPerHour: dataCtx[0].notesPerHour,
							teamsPerHour: dataCtx[0].teamsPerHour,
						});
					}
				} else if (!fetchedEvents.eventList) {
					setUser({
						...user,
						user: usernameInput,
						loggedIn: true,
						event: null,
						registeredEvents: [],
					});
				} else {
					setUser({
						...user,
						user: usernameInput,
						loggedIn: true,
						event: null,
						registeredEvents: fetchedEvents.eventList,
					});
				}
			})();
		} else {
			alert("Please enter an email and password");
		}
		getEventNames();
	}

	function getEventNames() {
		const url = `http://localhost:8080/return/event/names/with/type`;
		(async () => {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(user),
			});
			const data = await response.json();
			if (data.error?.data) {
				alert(data.error.data);
			}
			console.log(data);
			console.log(`Events:`, data);
			setGlobalContext({ allEvents: data });
		})();
	}
}
