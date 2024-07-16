export function splitMessageIntoParts(message: string, partSize: number = 2000): string[] {
	if (message.length <= partSize) {
		return [message];
	}

	const lastSpaceIndex = message.lastIndexOf(' ', partSize);
	const part = message.slice(0, lastSpaceIndex);
	const remaining = message.slice(lastSpaceIndex + 1);

	return [part, ...splitMessageIntoParts(remaining, partSize)];
}
