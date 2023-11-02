export async function findAllFillers(associatedUsers, event) {
	console.log(`hit the util for finding fillers`);

	let queryObject = {
		fillers: associatedUsers,
		event: event,
	};
	const url = `http://localhost:8080/return/teams/per/hour`;
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
	const allFillers = await res.json();
	console.log(`All fillers:`, allFillers);

	return allFillers;
}
