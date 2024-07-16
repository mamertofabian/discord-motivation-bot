import { Client } from 'discord.js';
import cron from 'node-cron';
import { scheduleMotivationMessages } from './scheduling';
import { generateTaskMotivation } from './anthropic_utils';
import { MotivationalTask } from './motivation.interface';
import { sendDiscordMessage } from './discord_utils';
import { getTasks } from './message_generators';

require('dotenv/config');

const client = new Client({
	intents: ['Guilds', 'GuildMessages', 'MessageContent']
});

client.login(process.env.BOT_TOKEN).then(
	() => {
		console.log(`Atomic bot has logged in as ${client.user?.tag}`);
	},
	(error) => {
		console.error('Error logging in:', error);
		process.exit(1);
	}
);

client.once('ready', async () => {
	console.log('Atomic bot is ready');

	// send a motivational message for a random task
	const tasks = getTasks();
	const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
	await sendMotivationalMessage(randomTask);

	cron.schedule(
		'0 0 * * *',
		async () => {
			scheduleMotivationMessages(sendMotivationalMessage);
		},
		{
			timezone: 'Asia/Manila'
		}
	);
});

async function sendMotivationalMessage(task: MotivationalTask) {
	const user = await client.users.fetch(process.env.USER_ID as string);
	const message = await generateTaskMotivation(task);
	if (!message || message.content.length === 0) {
		console.error('No message generated for task:', task.description);
		return;
	}

	const contentText = message.content[0].type === 'text' ? message.content[0].text : '';
	// get the motivation message between <message> tags
	const motivationMessage = contentText.match(/<message>([\s\S]*?)<\/message>/);
	console.log('Sending message to user...');
	await sendDiscordMessage(user, motivationMessage ? motivationMessage[1] : contentText);
	console.log('Message sent');
}
