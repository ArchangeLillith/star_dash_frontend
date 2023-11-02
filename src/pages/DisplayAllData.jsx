import React, { useContext } from "react";
import { AccessoriesForDialogueBox } from "../components/AccessoriesForDialogueBox";
import { UserContext } from "../context.jsx";
import { AdminNotice } from "../components/AdminNotice";
import { findAllFillers } from "../util/findFillers";
import { confirmAlert } from "react-confirm-alert";
import { useEffect } from "react";
import { GlobalContext } from "../context.jsx";
import { marathonOrCheerful } from "../util/marathonOrCheerful";

export function DisplayAllData() {
	const { user, setUser } = useContext(UserContext);
	console.log("User from Data: ", user);
	let manager = user.leadManager;
	const [fillerData, setFillerData] = React.useState([]);
	const { globalContext, setGlobalContext } = useContext(GlobalContext);
	const [cheerfulOrMarathon, setCheerfulOrMarathon] = React.useState("");
	const [runnerData, setRunnerData] = React.useState({});
	const [findCheck, setFindCheck] = React.useState(true);
	const [editState, setEditState] = React.useState(false);
	const [editStateRunner, setEditStateRunner] = React.useState(false);

	useEffect(() => {
		const type = marathonOrCheerful(globalContext, user.event);
		setCheerfulOrMarathon(type);
	}, []);

	return (
		<>
			{user.loggedIn ? (
				<>
					{user.associatedUsers.length === 0 && (
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
					)}
					{findCheck && user.associatedUsers.length !== 0 ? (
						<>
							<div className="page-background">
								<div className="dialogue-box-data">
									<div className="schedule-accessories">
										<AccessoriesForDialogueBox />
									</div>
									<div className="btn-shadow userdata-btn">
										<button className="submit-btn" onClick={handleFind}>
											Find Your Fillers!
										</button>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<>
								{editStateRunner && user.associatedUsers.length !== 0 ? (
									<>
										<div className="edit-btn-wrapper">
											<div className="edit-btn-shadow">
												<button
													className="edit-user-btn"
													onClick={scrapeRunnerData}
												>
													Save!
												</button>
											</div>
										</div>
										<table
											className="runner-data-table"
											key="runner-data-table"
										>
											<thead>
												<tr>
													<th className="th-runner-name" key="th-runner-name">
														Runner Name
													</th>
													<th className="th-runner-stats" key="th-runner-stats">
														Stats
													</th>
												</tr>
											</thead>
											<tbody className="tbody-edit-state-runner">
												<tr
													className={`tr-runner-data-for-${runnerData.name}`}
													key={`tr-runner-data-for-${runnerData.name}`}
												>
													<td>
														<input
															defaultValue={`${runnerData.name}`}
															className={`${runnerData.name} runner-edit-data`}
															key={`${runnerData.name}`}
															content={`${runnerData.name}`}
														></input>
													</td>
													<td>
														<input
															className={`${runnerData.name}-isv1 runner-edit-data`}
															key={`${runnerData.name}-isv1`}
															content={`${runnerData.name}-isv1`}
															defaultValue={runnerData.isv1}
														></input>
														<input
															className={`${runnerData.name}-isv2 runner-edit-data`}
															key={`${runnerData.name}-isv2`}
															content={`${runnerData.name}-isv2`}
															defaultValue={runnerData.isv2}
														></input>
														<input
															className={`${runnerData.name}-bp runner-edit-data`}
															key={`${runnerData.name}-bp`}
															content={`${runnerData.name}-bp`}
															defaultValue={runnerData.bp / 1000}
														></input>
													</td>
												</tr>
											</tbody>
										</table>
									</>
								) : (
									<>
										{user.associatedUsers.length !== 0 && (
											<>
												<div className="edit-btn-wrapper">
													<div className="edit-btn-shadow">
														<button
															className="edit-user-btn"
															onClick={handleEditStateRunner}
														>
															Edit...
														</button>
													</div>
												</div>
												<table
													className="runner-data-table"
													key="runner-data-table"
												>
													<thead>
														<tr>
															<th
																className="th-runner-name"
																key="th-runner-name"
															>
																Runner Name
															</th>
															<th
																className="th-runner-stats"
																key="th-runner-stats"
															>
																Stats
															</th>
														</tr>
													</thead>
													<tbody className="tbody-stable-state">
														<tr
															className={`tr-runner-data-for-${runnerData.name}`}
															key={`tr-runner-data-for-${runnerData.name}`}
														>
															<td
																className={`${runnerData.name}-runner`}
																key={`${runnerData.name}-runner`}
																content={`${runnerData.name}-runner`}
															>
																{runnerData.name}
															</td>
															<td
																className={`${runnerData.name}-stats`}
																key={`${runnerData.name}-stats`}
																content={`${runnerData.name}-stats`}
															>
																{runnerData.isv1}/{runnerData.isv2}/
																{runnerData.bp / 1000}K
															</td>
														</tr>
													</tbody>
												</table>
											</>
										)}
									</>
								)}
								{editState && user.associatedUsers.length !== 0 ? (
									<>
										<div className="table-wrapper" key="table-wrapper">
											<div className="edit-btn-wrapper">
												<div className="edit-btn-shadow">
													<button
														className="edit-user-btn"
														onClick={scrapeFillerData}
													>
														Save!
													</button>
												</div>
											</div>

											<table className="all-user-data" key="all-user-data">
												<thead>
													<tr>
														<th className="th-user-name" key="th-user-name">
															User
														</th>
														<th className="th-SB1" key="th-SB1">
															SB1
														</th>
														<th className="th-SB2" key="th-SB2">
															SB2
														</th>
														<th className="th-fill" key="th-fill">
															Fill
														</th>
														<th className="th-heal" key="th-heal">
															Heal
														</th>
													</tr>
												</thead>
												<tbody className="tbody-edit-state">
													{cheerfulOrMarathon === "C" ? (
														<>
															{[...fillerData].map((e, i) => (
																<tr
																	className={`tr-user-heading-${[i]}`}
																	key={`tr-user-heading-${[i]}`}
																>
																	<td
																		className={`td-username-${fillerData[i].discordName}`}
																		key={`td-username-${fillerData[i].discordName}`}
																	>
																		{fillerData[i].discordName}
																	</td>
																	<td>
																		<input
																			className={`td-fill-${fillerData[i].discordName}-isv1 filler-edit-data`}
																			id={`td-fill-${fillerData[i].discordName}-isv1`}
																			key={`td-fill-${fillerData[i].discordName}-isv1`}
																			content={`td-fill-${fillerData[i].discordName}-isv1`}
																			defaultValue={
																				fillerData[i].teams.fillTeam.isv1
																			}
																		></input>
																		<input
																			className={`td-fill-${fillerData[i].discordName}-isv2 filler-edit-data`}
																			key={`td-fill-${fillerData[i].discordName}-isv2`}
																			id={`td-fill-${fillerData[i].discordName}-isv2`}
																			name={`td-fill-${fillerData[i].discordName}-isv2`}
																			content={`td-fill-${fillerData[i].discordName}-isv2`}
																			defaultValue={
																				fillerData[i].teams.fillTeam.isv2
																			}
																		></input>
																		<input
																			className={`td-fill-${fillerData[i].discordName}-bp filler-edit-data`}
																			key={`td-fill-${fillerData[i].discordName}-bp`}
																			id={`td-fill-${fillerData[i].discordName}-bp`}
																			name={`td-fill-${fillerData[i].discordName}-bp`}
																			content={`td-fill-${fillerData[i].discordName}-bp`}
																			defaultValue={
																				fillerData[i].teams.fillTeam.bp / 1000
																			}
																		></input>
																	</td>
																	<td>
																		<input
																			className={`td-SB1-${fillerData[i].discordName}-isv1 filler-edit-data`}
																			id={`td-SB1-${fillerData[i].discordName}-isv1`}
																			key={`td-SB1-${fillerData[i].discordName}-isv1`}
																			content={`td-SB1-${fillerData[i].discordName}-isv1`}
																			defaultValue={
																				fillerData[i].teams.SB1Team.isv1
																			}
																		></input>
																		<input
																			className={`td-SB1-${fillerData[i].discordName}-isv2 filler-edit-data`}
																			key={`td-SB1-${fillerData[i].discordName}-isv2`}
																			id={`td-SB1-${fillerData[i].discordName}-isv2`}
																			name={`td-SB1-${fillerData[i].discordName}-isv2`}
																			content={`td-SB1-${fillerData[i].discordName}-isv2`}
																			defaultValue={
																				fillerData[i].teams.SB1Team.isv2
																			}
																		></input>
																		<input
																			className={`td-SB1-${fillerData[i].discordName}-bp filler-edit-data`}
																			key={`td-SB1-${fillerData[i].discordName}-bp`}
																			id={`td-SB1-${fillerData[i].discordName}-bp`}
																			name={`td-SB1-${fillerData[i].discordName}-bp`}
																			content={`td-SB1-${fillerData[i].discordName}-bp`}
																			defaultValue={
																				fillerData[i].teams.SB1Team.bp / 1000
																			}
																		></input>
																	</td>
																	<td>
																		<input
																			className={`td-SB2-${fillerData[i].discordName}-isv1 filler-edit-data`}
																			id={`td-SB2-${fillerData[i].discordName}-isv1`}
																			key={`td-SB2-${fillerData[i].discordName}-isv1`}
																			content={`td-SB2-${fillerData[i].discordName}-isv1`}
																			defaultValue={
																				fillerData[i].teams.SB2Team.isv1
																			}
																		></input>
																		<input
																			className={`td-SB2-${fillerData[i].discordName}-isv2 filler-edit-data`}
																			key={`td-SB2-${fillerData[i].discordName}-isv2`}
																			id={`td-SB2-${fillerData[i].discordName}-isv2`}
																			name={`td-SB2-${fillerData[i].discordName}-isv2`}
																			content={`td-SB2-${fillerData[i].discordName}-isv2`}
																			defaultValue={
																				fillerData[i].teams.SB2Team.isv2
																			}
																		></input>
																		<input
																			className={`td-SB2-${fillerData[i].discordName}-bp filler-edit-data`}
																			key={`td-SB2-${fillerData[i].discordName}-bp`}
																			id={`td-SB2-${fillerData[i].discordName}-bp`}
																			name={`td-SB2-${fillerData[i].discordName}-bp`}
																			content={`td-SB2-${fillerData[i].discordName}-bp`}
																			defaultValue={
																				fillerData[i].teams.SB2Team.bp / 1000
																			}
																		></input>
																	</td>
																	<td>
																		<input
																			className={`td-heal-${fillerData[i].discordName}-isv1 filler-edit-data`}
																			key={`td-heal-${fillerData[i].discordName}-isv1`}
																			id={`td-heal-${fillerData[i].discordName}-isv1`}
																			content={`td-heal-${fillerData[i].discordName}-isv1`}
																			defaultValue={
																				fillerData[i].teams.healTeam.isv1
																			}
																		></input>
																		<input
																			className={`td-heal-${fillerData[i].discordName}-isv2 filler-edit-data`}
																			key={`td-heal-${fillerData[i].discordName}-isv2`}
																			id={`td-heal-${fillerData[i].discordName}-isv2`}
																			name={`td-heal-${fillerData[i].discordName}-isv2`}
																			content={`td-heal-${fillerData[i].discordName}-isv2`}
																			defaultValue={
																				fillerData[i].teams.healTeam.isv2
																			}
																		></input>
																		<input
																			className={`td-heal-${fillerData[i].discordName}-bp filler-edit-data`}
																			key={`td-heal-${fillerData[i].discordName}-bp`}
																			id={`td-heal-${fillerData[i].discordName}-bp`}
																			name={`td-heal-${fillerData[i].discordName}-bp`}
																			content={`td-heal-${fillerData[i].discordName}-bp`}
																			defaultValue={
																				fillerData[i].teams.healTeam.bp / 1000
																			}
																		></input>
																	</td>
																</tr>
															))}
														</>
													) : (
														<>
															{[...fillerData].map((e, i) => (
																<tr
																	className={`tr-user-heading-${[i]}`}
																	key={`tr-user-heading-${[i]}`}
																>
																	<td
																		className={`td-username-${fillerData[i].discordName}`}
																		key={`td-username-${fillerData[i].discordName}`}
																	>
																		{fillerData[i].discordName}
																	</td>
																	{fillerData[i].teams.fillTeam && (
																		<td>
																			<input
																				className={`td-fill-${fillerData[i].discordName}-isv1 filler-edit-data`}
																				id={`td-fill-${fillerData[i].discordName}-isv1`}
																				key={`td-fill-${fillerData[i].discordName}-isv1`}
																				content={`td-fill-${fillerData[i].discordName}-isv1`}
																				defaultValue={
																					fillerData[i].teams.fillTeam.isv1
																				}
																			></input>

																			<input
																				className={`td-fill-${fillerData[i].discordName}-isv2 filler-edit-data`}
																				key={`td-fill-${fillerData[i].discordName}-isv2`}
																				id={`td-fill-${fillerData[i].discordName}-isv2`}
																				name={`td-fill-${fillerData[i].discordName}-isv2`}
																				content={`td-fill-${fillerData[i].discordName}-isv2`}
																				defaultValue={
																					fillerData[i].teams.fillTeam.isv2
																				}
																			></input>
																			<input
																				className={`td-fill-${fillerData[i].discordName}-bp filler-edit-data`}
																				key={`td-fill-${fillerData[i].discordName}-bp`}
																				id={`td-fill-${fillerData[i].discordName}-bp`}
																				name={`td-fill-${fillerData[i].discordName}-bp`}
																				content={`td-fill-${fillerData[i].discordName}-bp`}
																				defaultValue={
																					fillerData[i].teams.fillTeam.bp / 1000
																				}
																			></input>
																		</td>
																	)}
																	{fillerData[i].teams.encoreTeam && (
																		<td>
																			<input
																				className={`td-encore-${fillerData[i].discordName}-isv1 filler-edit-data`}
																				id={`td-encore-${fillerData[i].discordName}-isv1`}
																				key={`td-encore-${fillerData[i].discordName}-isv1`}
																				content={`td-encore-${fillerData[i].discordName}-isv1`}
																				defaultValue={
																					fillerData[i].teams.encoreTeam.isv1
																				}
																			></input>

																			<>
																				<input
																					className={`td-encore-${fillerData[i].discordName}-isv2 filler-edit-data`}
																					key={`td-encore-${fillerData[i].discordName}-isv2`}
																					id={`td-encore-${fillerData[i].discordName}-isv2`}
																					name={`td-encore-${fillerData[i].discordName}-isv2`}
																					content={`td-encore-${fillerData[i].discordName}-isv2`}
																					defaultValue={
																						fillerData[i].teams.encoreTeam?.isv2
																					}
																				></input>
																				<input
																					className={`td-encore-${fillerData[i].discordName}-bp filler-edit-data`}
																					key={`td-encore-${fillerData[i].discordName}-bp`}
																					id={`td-encore-${fillerData[i].discordName}-bp`}
																					name={`td-encore-${fillerData[i].discordName}-bp`}
																					content={`td-encore-${fillerData[i].discordName}-bp`}
																					defaultValue={
																						fillerData[i].teams.encoreTeam.bp /
																						1000
																					}
																				></input>
																			</>
																		</td>
																	)}
																</tr>
															))}
														</>
													)}
												</tbody>
											</table>
										</div>
									</>
								) : (
									<>
										{" "}
										{user.associatedUsers.length !== 0 && (
											<>
												<div className="table-wrapper" key="table-wrapper">
													<div className="edit-btn-wrapper">
														<div className="edit-btn-shadow">
															<button
																className="edit-user-btn"
																onClick={handleEditState}
															>
																Edit...
															</button>
														</div>
													</div>
													{cheerfulOrMarathon === "C" ? (
														<table
															className="all-user-data"
															key="all-user-data"
														>
															<thead>
																<tr>
																	<th
																		className="th-user-name"
																		key="th-user-name"
																	>
																		User
																	</th>
																	<th className="th-SB1" key="th-SB1">
																		SB1
																	</th>
																	<th className="th-SB2" key="th-SB2">
																		SB2
																	</th>
																	<th className="th-fill" key="th-fill">
																		Fill
																	</th>
																	<th className="th-heal" key="th-heal">
																		Heal
																	</th>
																	<th>
																		<img
																			alt="cute wing accessorie"
																			src="../img/wing-accessory-star.png"
																			className="remove-icon  display-none-on-mobile"
																		/>
																	</th>
																</tr>
															</thead>
															<tbody className="tbody-edit-state">
																{[...fillerData].map((e, i) => (
																	<tr
																		className={`tr-user-${fillerData[i].discordName}`}
																		key={`tr-user-${fillerData[i].discordName}`}
																	>
																		<td
																			className={`td-username-${fillerData[i].discordName}`}
																			key={`td-username-${fillerData[i].discordName}`}
																		>
																			{fillerData[i].discordName}
																		</td>
																		<td
																			className={`td-sb1-${fillerData[i].discordName}`}
																			key={`td-sb1-${fillerData[i].discordName}`}
																		>
																			{fillerData[i].teams.SB1Team?.isv1}/
																			{fillerData[i].teams.SB1Team?.isv2}/
																			{fillerData[i].teams.SB1Team?.bp / 1000}K
																		</td>
																		<td
																			className={`td-sb2-${fillerData[i].discordName}`}
																			key={`td-sb2-${fillerData[i].discordName}`}
																		>
																			{fillerData[i].teams.SB2Team?.isv1}/
																			{fillerData[i].teams.SB2Team?.isv2}/
																			{fillerData[i].teams.SB2Team?.bp / 1000}K
																		</td>
																		<td
																			className={`td-fill-${fillerData[i].discordName}`}
																			key={`td-fill-${fillerData[i].discordName}`}
																		>
																			{fillerData[i].teams.fillTeam.isv1}/
																			{fillerData[i].teams.fillTeam.isv2}/
																			{fillerData[i].teams.fillTeam.bp / 1000}K
																		</td>
																		<td
																			className={`td-heal-${fillerData[i].discordName}`}
																			key={`td-heal-${fillerData[i].discordName}`}
																		>
																			{fillerData[i].teams.healTeam?.isv1}/
																			{fillerData[i].teams.healTeam?.isv2}/
																			{fillerData[i].teams.healTeam?.bp / 1000}K
																		</td>
																		<td>
																			<div className="btn-shadow remove-btn">
																				<button
																					className={`submit-btn display-none-on-mobile ${fillerData[i]}`}
																					id={`${fillerData[i].discordName}`}
																					onClick={(e) => confirmDelete(e)}
																				>
																					Remove!
																				</button>
																				<button
																					className={`x-btn mobile-notice ${fillerData[i]}`}
																					id={`${fillerData[i].discordName}`}
																					onClick={(e) => confirmDelete(e)}
																				>
																					X
																				</button>
																			</div>
																		</td>
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
													) : (
														<table
															className="all-user-data"
															key="all-user-data"
														>
															<thead>
																<tr>
																	<th
																		className="th-user-name"
																		key="th-user-name"
																	>
																		User
																	</th>
																	<th className="th-fill" key="th-fill">
																		Fill
																	</th>
																	<th className="th-encore" key="th-encore">
																		Encore
																	</th>
																	<th>
																		<img
																			alt="cute wing accessorie"
																			src="../img/wing-accessory-star.png"
																			className="remove-icon  display-none-on-mobile"
																		/>
																	</th>
																</tr>
															</thead>
															<tbody className="tbody-edit-state">
																{[...fillerData].map((e, i) => (
																	<tr
																		className={`tr-user-${fillerData[i].discordName}`}
																		key={`tr-user-${fillerData[i].discordName}`}
																	>
																		<td
																			className={`td-username-${fillerData[i].discordName}`}
																			key={`td-username-${fillerData[i].discordName}`}
																		>
																			{fillerData[i].discordName}
																		</td>
																		{fillerData[i].teams.fillTeam ? (
																			<td
																				className={`td-fill-${fillerData[i].discordName}-fill-team`}
																				key={`td-fill-${fillerData[i].discordName}-fill-team`}
																			>
																				{fillerData[i].teams.fillTeam.isv1}/
																				{fillerData[i].teams.fillTeam.isv2}/
																				{fillerData[i].teams.fillTeam.bp / 1000}
																				K
																			</td>
																		) : (
																			<td
																				className={`td-fill-${fillerData[i].discordName}`}
																				key={`td-fill-${fillerData[i].discordName}`}
																			>
																				---
																			</td>
																		)}
																		{fillerData[i].teams.encoreTeam ? (
																			<td
																				className={`td-encore-${fillerData[i].discordName}-encore-team`}
																				key={`td-encore-${fillerData[i].discordName}-encore-team`}
																			>
																				{fillerData[i].teams.encoreTeam?.isv1}/
																				{fillerData[i].teams.encoreTeam?.isv2}/
																				{fillerData[i].teams.encoreTeam?.bp /
																					1000}
																				K
																			</td>
																		) : (
																			<td
																				className={`td-fill-${fillerData[i].discordName}`}
																				key={`td-fill-${fillerData[i].discordName}`}
																			>
																				---
																			</td>
																		)}
																		<td>
																			<div className="btn-shadow remove-btn">
																				<button
																					className={`submit-btn display-none-on-mobile ${fillerData[i]}`}
																					id={`${fillerData[i].discordName}`}
																					onClick={(e) => confirmDelete(e)}
																				>
																					Remove!
																				</button>
																				<button
																					className={`x-btn mobile-notice ${fillerData[i]}`}
																					id={`${fillerData[i].discordName}`}
																					onClick={(e) => confirmDelete(e)}
																				>
																					X
																				</button>
																			</div>
																		</td>
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
													)}
												</div>
											</>
										)}
									</>
								)}
							</>
						</>
					)}
				</>
			) : (
				<AdminNotice />
			)}
		</>
	);

	function handleEditState() {
		setEditState(!editState);
	}
	function handleEditStateRunner() {
		setEditStateRunner(!editStateRunner);
	}

	function scrapeFillerData() {
		const newFillers = [];
		let elementOnPage = document.getElementsByClassName(`filler-edit-data`);
		for (let i = 0; i < user.associatedUsers.length * 13; i += 13) {
			newFillers.push({
				discordName: elementOnPage[i].value,
				teams: {
					SB1Team: {
						bp: elementOnPage[i + 3].value * 1000,
						isv1: elementOnPage[i + 1].value,
						isv2: elementOnPage[i + 2].value,
					},
					SB2Team: {
						bp: elementOnPage[i + 6].value * 1000,
						isv1: elementOnPage[i + 4].value,
						isv2: elementOnPage[i + 5].value,
					},
					fillTeam: {
						bp: elementOnPage[i + 9].value * 1000,
						isv1: elementOnPage[i + 7].value,
						isv2: elementOnPage[i + 8].value,
					},
					healTeam: {
						bp: elementOnPage[i + 12].value * 1000,
						isv1: elementOnPage[i + 10].value,
						isv2: elementOnPage[i + 11].value,
					},
				},
			});
		}
		writeNewFillers(newFillers);
		setFillerData(newFillers);
		setEditState(!editState);
	}

	async function writeNewFillers(newFillers) {
		// let event = user.event;
		// let queryObject = { manager, newFillers, event };
		// console.log(queryObject);
		const url = `http://localhost:8080/write/new/fillers`;
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFillers),
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
			console.log(data);
		}
	}

	function scrapeRunnerData() {
		let runnerEditData = document.getElementsByClassName(`runner-edit-data`);
		console.log(
			"New runner data:",
			runnerEditData[0].value,
			runnerEditData[1].value,
			runnerEditData[2].value,
			runnerEditData[3].value
		);
		const newRunner = {
			name: runnerEditData[0].value,
			bp: runnerEditData[3].value * 1000,
			isv1: runnerEditData[1].value,
			isv2: runnerEditData[2].value,
		};

		console.log(newRunner);
		writeNewRunner(newRunner);
		setRunnerData(newRunner);
		handleEditStateRunner(!editState);
		setUser({
			...user,
			runner: newRunner,
		});
	}

	async function handleFind() {
		const queryObjAssociated = {
			event: user.event,
			manager: user.user,
			leadManager: user.leadManager,
		};
		const urlAssociated = `http://localhost:8080/return/associated/users`;
		const resAssociated = await fetch(urlAssociated, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify(queryObjAssociated),
		});
		const associatedUsers = await resAssociated.json();
		setUser({
			...user,
			associatedUsers: associatedUsers,
		});
		let fetchedFillerData = await findAllFillers(associatedUsers, user.event);
		findRunner();
		let fillerData = [];
		let fillerName = [];
		for (let i = 0; i < fetchedFillerData.length; i++) {
			let newFiller = {
				discordName: fetchedFillerData[i][0].userData.discordName,
				teams: fetchedFillerData[i][0].userData.teams,
			};
			fillerData.push(newFiller);
			fillerName.push(newFiller.discordName);
		}
		console.log(`New filler data:`, fillerData);
		setFillerData(fillerData);
	}

	function confirmDelete(e) {
		const name = e.target.id;
		const confirmMessage = `You are going to remove ${name}, are you sure you want to do this? This filler will not be included anywhere if you do this!`;
		confirmAlert({
			message: confirmMessage,
			buttons: [
				{
					label: `Yes, delete ${name}!`,
					onClick: () => removeFiller(name),
				},
				{
					label: `No, keep this filler`,
				},
			],
		});
	}

	async function removeFiller(name) {
		let queryObject = {
			event: user.event,
			manager: user.leadManager,
			removeTarget: name,
		};
		console.log(queryObject);
		const url = `http://localhost:8080/remove/one/filler`;
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

	async function writeNewRunner(newRunner) {
		let event = user.event;
		let queryObject = { runner: newRunner, event, manager };
		console.log(queryObject);
		const url = `http://localhost:8080/write/runner/team`;
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
			console.log(data);
		}
	}

	async function findRunner() {
		setFindCheck(false);
		let queryObject = {
			manager,
			event: user.event,
			leadManager: user.leadManager,
		};
		const url = `http://localhost:8080/return/runner/data`;
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
		}
		setRunnerData(data);
		console.log(`Fetched runner:`, data);
		setUser({ ...user, runner: data });
	}
}
