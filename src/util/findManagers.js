export async function findAllManagers(user) {
	console.log(`hit the util for finding managers`);
	let queryObject = {
		event: user.event,
		leadManager: user.leadManager,
		manager: user.user,
	};
	const url = `http://localhost:8080/return/all/managers`;
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
	const allManagers = await res.json();
	console.log(`All managers:`, allManagers);
	return allManagers;
}
