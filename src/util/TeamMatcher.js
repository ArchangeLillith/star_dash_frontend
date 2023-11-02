/**
 * A class that mixes and matches teams of players associated with a specific manager
 * to find combinations that fit BP (battle power) requirements of 175k - 185k
 */
export default class TeamMatcher {
	/**
	 * A list of the different team names and the indexes they correspond to in a list of teams
	 */
	static TEAM_INDEX_TO_TEAM_NAME_MAP = [
		"Heal Team",
		"Fill Team",
		"SB1 Team",
		"SB2 Team",
	];
	static TEAM_INDEX_TO_TEAM_PROPERTY_MAP = [
		"healTeam",
		"fillTeam",
		"SB1Team",
		"SB2Team",
	];

	/**
	 * Set up the base properties of the class
	 * @param runner - Information about the runner
	 * @param runner.team.runnerTeam - The runner's main team
	 * @param {Array} fillers - A list of all of the information for the fillers
	 * @param filler.discordName - Information about the filler's discord name
	 * @param {string} filler.discordName - The discord name of the filler
	 * @param {Array} filler.teams - All the teams that the filler has
	 * @param filler.teams.fillTeam - The filler's fill team
	 * @param filler.teams.healTeam - The filler's heal team
	 * @param filler.teams.SB1Team - The filler's sandbag 1 team
	 * @param filler.teams.SB2Team - The filler's sandbag 2 team
	 */
	constructor(runner, fillers, min, max) {
		this.runner = runner;
		this.fillers = fillers;
		this.min = min;
		this.max = max;
	}

	/**
	 * Override the current list of fillers with a new list of fillers
	 * @param {Array} newFillers - A list of fillers
	 * @param filler.discordName - Information about the filler's discord name
	 * @param filler.discordName - The discord name of the filler
	 * @param filler.teams - All the teams that the filler has
	 * @param filler.teams.fillTeam - A filler's fill team
	 * @param filler.teams.healTeam - A filler's heal team
	 * @param filler.teams.SB1Team - A filler's sandbag 1 team
	 * @param filler.teams.SB2Team - A filler's sandbag 2 team
	 */
	updateFillers(newFillers) {
		this.fillers = newFillers;
	}

	/**
	 * Map all the teams a player has to an array containing the BP values of each team
	 * @param filler - Information about the filler
	 * @param filler.discordName - Information about the filler's discord name
	 * @param filler.discordName - The discord name of the filler
	 * @param filler.teams - All the teams that the filler has
	 * @param filler.teams.fillTeam - A filler's fill team
	 * @param filler.teams.healTeam - A filler's heal team
	 * @param filler.teams.SB1Team - A filler's sandbag 1 team
	 * @param filler.teams.SB2Team - A filler's sandbag 2 team
	 * @returns an object that contains the BP values of each team in the order of
	 * [fillTeamBp], [healTeamBp], [sb1TeamBp], [sb2TeamBp],
	 * and their discord name
	 */
	mapTeamsToBp(filler) {
		return {
			discordName: filler.discordName,
			teams: Object.keys(filler.teams).map((teamNameKey) => {
				return filler.teams[teamNameKey].bp;
			}),
		};
	}

	/**
	 * The Beefy Boi
	 * Execute the algorithm that will find combinations of the runner & fillers
	 * that fit BP requirements of 175k - 185k BP
	 * @returns A list of teams that meet the requirements, or null if none were found
	 * Future Consideration: Return a reason why the requirements could not be met
	 * - Perhaps we return the name of the user with teams that have the highest standard deviation from 180k BP
	 */
	execute() {
		console.table(`this.runner: `, this.runner);
		console.table(`this.fillers: `, this.fillers);
		console.table(`this.min and max: `, this.min, this.max);
		// Make a list that will hold teams that fit the BP requirements
		const applicableTeams = [];

		// Get the runner's team's BP
		const runnerBp = this.runner.bp;

		// Get lists of all the bps of each team that each filler has
		const fillerOneBpObject = this.mapTeamsToBp(this.fillers[0]);
		const fillerTwoBpObject = this.mapTeamsToBp(this.fillers[1]);
		const fillerThreeBpObject = this.mapTeamsToBp(this.fillers[2]);
		const fillerFourBpObject = this.mapTeamsToBp(this.fillers[3]);

		// A list of all the above lists
		const fillerBpObjects = [
			fillerOneBpObject,
			fillerTwoBpObject,
			fillerThreeBpObject,
			fillerFourBpObject,
		];

		// Make a list of the bps of the heal teams across all fillers
		const healTeams = [
			this.fillers[0].teams.healTeam.bp,
			this.fillers[1].teams.healTeam.bp,
			this.fillers[2].teams.healTeam.bp,
			this.fillers[3].teams.healTeam.bp,
		];

		// Loop through all the possible combinations of teams, with each player being selected as the healer in a given run
		healTeams.forEach((healTeamBp, index) => {
			const applicableFillers = [...fillerBpObjects];
			// Splice the player being used as the healer - they cannot be a filler
			applicableFillers.splice(index, 1);

			applicableFillers[0].teams.forEach((fillerOneBp, fillerOneIndex) => {
				applicableFillers[1].teams.forEach((fillerTwoBp, fillerTwoIndex) => {
					applicableFillers[2].teams.forEach(
						(fillerThreeBp, fillerThreeIndex) => {
							const averageBp = Math.round(
								(runnerBp +
									healTeamBp +
									fillerOneBp +
									fillerTwoBp +
									fillerThreeBp) /
									5
							);
							if (this.min <= averageBp && averageBp <= this.max) {
								const healTeam = this.fillers.find(
									(filler) =>
										fillerBpObjects[index].discordName === filler.discordName
								);
								const team1 = this.fillers.find(
									(filler) =>
										applicableFillers[0].discordName === filler.discordName
								);
								const team2 = this.fillers.find(
									(filler) =>
										applicableFillers[1].discordName === filler.discordName
								);

								const team3 = this.fillers.find(
									(filler) =>
										applicableFillers[2].discordName === filler.discordName
								);

								const averageIsv = Math.round(
									(parseInt(
										healTeam.teams[
											TeamMatcher.TEAM_INDEX_TO_TEAM_PROPERTY_MAP[index]
										].isv1
									) +
										parseInt(
											team1.teams[
												TeamMatcher.TEAM_INDEX_TO_TEAM_PROPERTY_MAP[
													fillerOneIndex
												]
											].isv1
										) +
										parseInt(
											team2.teams[
												TeamMatcher.TEAM_INDEX_TO_TEAM_PROPERTY_MAP[
													fillerTwoIndex
												]
											].isv1
										) +
										parseInt(
											team3.teams[
												TeamMatcher.TEAM_INDEX_TO_TEAM_PROPERTY_MAP[
													fillerThreeIndex
												]
											].isv1
										) +
										parseInt(this.runner.isv1)) /
										5
								);

								applicableTeams.push({
									healer: fillerBpObjects[index].discordName,
									healerBp: healTeams[index],
									fillerOne: applicableFillers[0].discordName,
									fillerOneTeamName:
										TeamMatcher.TEAM_INDEX_TO_TEAM_NAME_MAP[fillerOneIndex],
									fillerTwo: applicableFillers[1].discordName,
									fillerTwoTeamName:
										TeamMatcher.TEAM_INDEX_TO_TEAM_NAME_MAP[fillerTwoIndex],
									fillerThree: applicableFillers[2].discordName,
									fillerThreeTeamName:
										TeamMatcher.TEAM_INDEX_TO_TEAM_NAME_MAP[fillerThreeIndex],
									averageBp: averageBp,
									averageIsv: averageIsv,
								});
							}
						}
					);
				});
			});
		});

		return applicableTeams;
	}
}
