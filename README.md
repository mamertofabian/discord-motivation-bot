# Discord Motivation Bot

This project is a Discord bot designed to provide motivational messages and task management for users. It utilizes AI models to generate personalized motivational content.

## Features

- Generates motivational messages using AI models
- Manages and tracks user tasks
- Integrates with Discord for easy interaction
- Supports scheduling of motivational messages

## Technologies Used

- TypeScript
- Discord.js
- Anthropic AI API
- Node.js
- Docker

## Setup

1. Clone the repository
2. Install dependencies with `yarn install`
3. Copy `.env.example` to `.env` and fill in your environment variables (Discord token, Anthropic API key, etc.)
4. Copy `tasks.example.txt` to `tasks.txt` and customize your tasks
5. Run the bot with `yarn start`

## Usage

- Use Discord commands to interact with the bot
- Add tasks using the appropriate command
- Receive scheduled motivational messages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Branch Protection

Please note that both the `main` and `dev` branches are protected:

- The `main` branch is protected due to production deployment actions.
- The `dev` branch is also protected for development stability.

When contributing, please create a new feature branch from `dev`, make your changes there, and then create a pull request to merge into `dev`.

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.
