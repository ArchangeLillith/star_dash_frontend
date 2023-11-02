export function marathonOrCheerful(globalContext, event) {
	for (let i = 0; i < globalContext.allEvents.length; i++) {
		if (event === globalContext.allEvents[i].event) {
			return globalContext.allEvents[i].type;
		}
	}
}
