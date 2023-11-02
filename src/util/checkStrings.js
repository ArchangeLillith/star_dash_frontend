export function isBlankIsNull(data) {
	if (data === null || data === "") {
		return true;
	} else {
		return false;
	}
}

export function isBlankNullUndefined(data) {
	if (data === null || data === "" || data === undefined) {
		return true;
	} else {
		return false;
	}
}

export function isBlankNullUndefinedLengthZero(data) {
	if (
		data === null ||
		data === "" ||
		data === undefined ||
		data?.length === 0
	) {
		return true;
	} else {
		return false;
	}
}
