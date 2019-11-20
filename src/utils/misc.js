
export const loopRange = (index, length) => {
	return length ? ((index % length) + length) % length : null;
}