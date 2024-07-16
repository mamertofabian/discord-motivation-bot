import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from '@anthropic-ai/sdk/resources';
import { getPrompt } from './message_generators';
import { MotivationalTask } from './motivation.interface';

require('dotenv/config');

type AIModel = 'sonnet' | 'opus';
const CLAUDE_OPUS_MODEL_ID = (process.env.CLAUDE_OPUS_MODEL_ID || 'claude-3-opus-20240229') as string;
const CLAUDE_SONNET_MODEL_ID = (process.env.CLAUDE_SONNET_MODEL_ID || 'claude-3-5-sonnet-20240620') as string;
const modelIds = {
	'opus': CLAUDE_OPUS_MODEL_ID,
	'sonnet': CLAUDE_SONNET_MODEL_ID
};
const DEFAULT_AI_MODEL: AIModel = 'sonnet';
const DEFAULT_MODEL_ID = CLAUDE_SONNET_MODEL_ID;
const TEMPERATURE = Number(process.env.TEMPERATURE || 0.8);
const MAX_TOKENS = Number(process.env.MAX_TOKENS || 1000);

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY
});

function getClaudeModelId(model: AIModel): string {
	const modelId = modelIds[model];
	if (modelId) {
		return modelId as string;
	}
	return DEFAULT_MODEL_ID;
}

async function createAnthropicChatMessage(messages: MessageParam[], model: AIModel = DEFAULT_AI_MODEL) {
	try {
		let claudeModelId = getClaudeModelId(model);
		console.log(`Generating chat response using model: ${claudeModelId}`);
		return await anthropic.messages.create({
			model: claudeModelId,
			max_tokens: MAX_TOKENS,
			temperature: TEMPERATURE,
			messages: messages
		});
	} catch (error) {
		console.error('Error generating chat response:', error);
		throw error;
	}
}

function generateUserMessageParam(prompt: string) {
	const messages: MessageParam[] = [
		{
			role: 'user',
			content: [
				{
					type: 'text',
					text: prompt
				}
			]
		}
	];
	return messages;
}

export async function generateTaskMotivation(
	task: MotivationalTask, aiModel: AIModel = DEFAULT_AI_MODEL) {
	const prompt = getPrompt();
	const userPrompt = prompt.replace(
		'{{TASK_DESCRIPTION}}', task.description
	).replace(
		'{{BACKGROUND_INFO}}', task.backgroundInfo || ''
	);

	return await createAnthropicChatMessage(generateUserMessageParam(userPrompt), aiModel);
}
