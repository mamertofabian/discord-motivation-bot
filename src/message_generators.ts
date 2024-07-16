import * as fs from 'node:fs';
import { MotivationalTask } from './motivation.interface';

export function getPrompt() {
	try {
		return fs.readFileSync('prompt.txt', 'utf8');
	} catch (error) {
		console.error('Error reading prompt:', error);
		return '';
	}
}

export function getTasks(): MotivationalTask[] {
	try {
		const taskData = fs.readFileSync('tasks.txt', 'utf8');
		const tasks = taskData.split('<TASK>').filter(task => task.trim().length > 0);
		const motivationalTask = tasks.map(task => {
			const taskDescriptionMatch = task.match(/<DESCRIPTION>([\s\S]+?)<\/DESCRIPTION>/);
			if (!taskDescriptionMatch) {
				return undefined;
			}
			const description = taskDescriptionMatch[1].trim();
			const taskBackgroundInfoMatch = task.match(/<BACKGROUND_INFO>([\s\S]+?)<\/BACKGROUND_INFO>/);
			const backgroundInfo = taskBackgroundInfoMatch ? taskBackgroundInfoMatch[1].trim() : '';
			return { description, backgroundInfo };
		});

		return motivationalTask.filter(task => task !== undefined) as MotivationalTask[];
	} catch (error) {
		console.error('Error reading tasks:', error);
		return [];
	}
}
