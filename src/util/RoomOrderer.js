export class RoomOrderer {
	static ORDERING_NO_ENCORE = [5, 4, 1, 2, 3];
	static ENCORE_ORDERING = [1, 5, 4, 2, 3];

	constructor(runner, grabbedTeams, encoreTeamPresent) {
		this.runner = runner;
		this.grabbedTeams = grabbedTeams;
		this.encoreTeamPresent = encoreTeamPresent;
	}

	execute() {
		console.log(`ROOM ORDERER INITIATED... CALCULATING...`);
		const orderedList = [];
		const ordering = this.encoreTeamPresent
			? RoomOrderer.ENCORE_ORDERING
			: RoomOrderer.ORDERING_NO_ENCORE;
		let averageIsvHolder = [];
		for (let i = 0; i < this.grabbedTeams.length; i++) {
			const teamName = this.grabbedTeams[i].teams.encoreTeam
				? "encoreTeam"
				: "fillTeam";
			const avgIsv =
				(parseInt(this.grabbedTeams[i].teams[teamName].isv1) +
					parseInt(this.grabbedTeams[i].teams[teamName].isv2)) /
				2;
			averageIsvHolder.push({ avgIsv, name: this.grabbedTeams[i].discordName });
		}
		averageIsvHolder.push({
			avgIsv: (parseInt(this.runner.isv1) + parseInt(this.runner.isv2)) / 2,
			name: this.runner.name,
		});

		averageIsvHolder = averageIsvHolder.sort((a, b) => b.avgIsv - a.avgIsv);
		console.log(averageIsvHolder);

		for (let i = 0; i < ordering.length; i++) {
			orderedList.push(averageIsvHolder[ordering[i] - 1]);
		}
		console.log(`Final return from ordererere:`, orderedList);
		return orderedList;
	}
}
