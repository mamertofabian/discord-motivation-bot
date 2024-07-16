import { splitMessageIntoParts } from './utils';
import { User } from 'discord.js';

export async function sendDiscordMessage(user: User, message: string) {
	const messageParts = splitMessageIntoParts(message);

	for (const part of messageParts) {
		await user.send(part);
	}
}
