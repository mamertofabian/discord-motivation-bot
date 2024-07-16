import cron, { ScheduledTask } from 'node-cron';
import { getTasks } from './message_generators';
import { MotivationalTask } from './motivation.interface';

let motivationJobs: ScheduledTask[] = [];

function getRandomTimes() {
	const hour = Math.floor(Math.random() * 14) + 6;
	const minute = Math.floor(Math.random() * 60);
	return { hour, minute };
}

export function scheduleMotivationMessages(motivationFunc: (task: MotivationalTask) => any) {
	// Cancel the previous day's scheduled tasks
	motivationJobs.forEach(job => job.stop());
	motivationJobs = [];
	const tasksWithSchedule = [];

	const tasks = getTasks();
	for (const task of tasks) {
		const { hour, minute } = getRandomTimes();
		tasksWithSchedule.push({ hour, minute, task });
	}

	tasksWithSchedule.forEach(task => {
		const job = cron.schedule(
			`${task.minute} ${task.hour} * * *`,
			async () => {
				await motivationFunc(task.task);
			},
			{
				timezone: 'Asia/Manila'
			}
		);
		motivationJobs.push(job);
	});
}
