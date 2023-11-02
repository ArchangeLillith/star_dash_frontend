import React, { useContext } from "react";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox";
import { UserContext } from "../context.jsx";
import { AdminNotice } from "../components/AdminNotice";
import { findAllManagers } from "../util/findManagers";
import { confirmAlert } from "react-confirm-alert";
import { HeartBorder } from "../components/HeartBorder";

export function Managers() {
	const { user, setUser } = useContext(UserContext);
	console.log(user);
	const [managerData, setManagerData] = React.useState([]);
	const [findCheck, setFindCheck] = React.useState(true);
	const [resetPassword, setResetPassword] = React.useState(false);
	const [deleteTarget, setDeleteTarget] = React.useState("");

	return (
		<>
			{user.loggedIn ? (
				<>
					{user.leadManager === user.user ? (
						<>
							{findCheck ? (
								<>
									<div className="page-background">
										<div className="dialogue-box-data">
											<div className="schedule-accessories">
												<AccessoriesForDialogueBox />
											</div>
											<div className="btn-shadow userdata-btn">
												<button className="submit-btn" onClick={handleFind}>
													Find Your Managers!
												</button>
											</div>
										</div>
									</div>
								</>
							) : (
								<>
									{/* CASE Find check triggered, no managers, therefore we show a sad Miku */}
									{managerData.length === 0 ? (
										<>
											<p className="global-header">
												There are no other managers
											</p>
											<img src="../img/404.png" alt="404 miku" />
										</>
									) : (
										<>
											{resetPassword ? (
												<>
													<div className="page-background"></div>
													<div className="dialogue-box-first-event">
														<AccessoriesForDialogueBox />
														<div className="event-wrapper">
															<div>
																<p className="global-header new-event-header">
																	Almost there!
																</p>
															</div>
															<div className="event-wrapper">
																<div className="event-wrapper">
																	<p>Deleting {deleteTarget}</p>
																	<div className="global-subheader  event-subheader">
																		Please choose a new run password:
																	</div>
																	<div className="first-event-text">
																		This is required to complete the deletion of
																		the manager. If this isn't changed, the
																		manager who you're trying to delete could
																		rejoin with the old password!
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
																	id="run-pass"
																	placeholder="Confirm run password"
																></input>
															</div>
															<HeartBorder />
															<div className="submit-wrapper runner-submit">
																<div className="btn-shadow runner-shadow">
																	<button
																		className="submit-btn"
																		onClick={removeManager}
																	>
																		Submit
																	</button>
																</div>
															</div>
														</div>
													</div>
												</>
											) : (
												<>
													<div className="table-wrapper" key="table-wrapper">
														<div
															className="table-edges"
															key="table-edges"
														></div>
														<table
															className="all-manager-data"
															key="all-manager-data"
														>
															<thead>
																<tr>
																	<th
																		className="th-user-name"
																		key="th-user-name"
																	>
																		Manager
																	</th>
																	<th className="th-remove" key="th-remove">
																		Remove?
																	</th>
																</tr>
															</thead>
															<tbody className="tbody-edit-state">
																{[...managerData].map((e, i) => (
																	<tr
																		className={`tr-user-${managerData[i]}`}
																		key={`tr-user-${managerData[i]}`}
																	>
																		<td
																			className={`td-username-${managerData[i]}`}
																			key={`td-username-${managerData[i]}`}
																		>
																			{managerData[i]}
																		</td>
																		{user.leadManager !== managerData[i] && (
																			<td className="button-table-cell">
																				<div className="btn-shadow remove-btn">
																					<button
																						className={`submit-btn display-none-on-mobile`}
																						onClick={(e) => confirmDelete(e)}
																					>
																						Remove!
																					</button>
																					<button
																						className={`x-btn mobile-notice`}
																						onClick={(e) => confirmDelete(e)}
																					>
																						X
																					</button>
																				</div>
																			</td>
																		)}
																	</tr>
																))}
																<tr id="button-row">
																	<td>
																		<div className="button-div">
																			<button
																				className="submit-btn"
																				onClick={handleFind}
																			>
																				Refresh
																			</button>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</>
											)}
										</>
									)}
								</>
							)}
						</>
					) : (
						<>
							<div className="page-background"></div>
							<div className="page-back-admin-notice">
								<div className="admin-notice-container">
									<p className="global-header">
										You've stumbled into a webpage you don't have access to!
									</p>
									<p>
										You're not the lead manager on this run, you don't have
										access to this page! Ask your lead manager if you're
										experiencing issues with another manager.
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

	async function handleFind() {
		let fetchedManagerData = await findAllManagers(user);
		let managerData = [];
		for (let i = 0; i < fetchedManagerData.length; i++) {
			let newManager = fetchedManagerData[i];
			managerData.push(newManager);
		}
		setManagerData(managerData);
		setFindCheck(false);
	}

	function confirmDelete(e) {
		setDeleteTarget(e.target.id);
		const confirmMessage = `You are going to remove this manager, are you sure you want to do this? This manager will not be able to edit your run anymore if you do this!`;
		confirmAlert({
			message: confirmMessage,
			buttons: [
				{
					label: `Yes, delete the manager!`,
					onClick: () => setResetPassword(true),
				},
				{
					label: `No, keep this manager`,
				},
			],
		});
		console.log(deleteTarget);
	}

	async function removeManager() {
		let queryObject = {
			event: user.event,
			manager: user.leadManager,
			removeTarget: deleteTarget,
		};
		console.log(queryObject);
		const url = `http://localhost:8080/remove/one/manager`;
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
		handleFind();
		setResetPassword(false);
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
	}
}
