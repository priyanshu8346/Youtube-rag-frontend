
# YouTube RAG Frontend

[Live Demo](https://priyanshu8346.github.io/Youtube-rag-frontend/)

This is the frontend for the YouTube RAG (Retrieval-Augmented Generation) project. It allows users to paste a YouTube video URL, loads the transcript, and then ask questions about the video using an AI-powered chatbot.

## Features
- Paste any YouTube video URL and load its transcript (if available)
- Ask questions about the video content and get instant answers
- Beautiful, modern, and responsive UI built with Material UI
- Glassmorphism card effect and animated chat bubbles
- Mobile-friendly and desktop-ready

## How It Works
1. Paste a YouTube video URL and click "Load".
2. The app fetches the transcript using the backend.
3. Ask any question about the video in the chat box.
4. The AI will answer based on the transcript and context.

## Demo Section

### 📺 Demo Video

[![Watch the demo](https://img.youtube.com/vi/job3d_XavR8/hqdefault.jpg)](https://youtu.be/job3d_XavR8)

<p align="center">
	<img src="public/images/Screenshot%202025-09-07%20at%201.27.04%E2%80%AFPM.png" alt="Screenshot 1" width="350"/>
	<img src="public/images/Screenshot%202025-09-07%20at%201.27.22%E2%80%AFPM.png" alt="Screenshot 2" width="350"/>
	<img src="public/images/Screenshot%202025-09-07%20at%201.28.18%E2%80%AFPM.png" alt="Screenshot 3" width="350"/>
</p>


---

## Backend
The backend is a Flask app that handles transcript retrieval and AI-powered question answering. You can find the backend code and setup instructions here:

[YouTube RAG Backend (GitHub)](https://github.com/priyanshu8346/Youtube-rag-backend)

---

## Getting Started (Local Development)

1. Clone this repository:
	```sh
	git clone https://github.com/priyanshu8346/Youtube-rag-frontend.git
	cd Youtube-rag-frontend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the development server:
	```sh
	npm start
	```
4. Make sure your backend is running and accessible.

## Deployment
This app is deployed on GitHub Pages. To deploy your own version:
1. Set the `homepage` field in `package.json` to your GitHub Pages URL.
2. Run:
	```sh
	npm run deploy
	```

## Tech Stack
- React
- Material UI
- Axios
- Flask (backend)
- OpenAI (for LLM)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---


## Future Enhancements

- Support for more languages and auto-detection of transcript language
- Summarization of entire video content in one click
- Downloadable chat history or transcript
- User authentication and personal history
- Deploy backend to cloud (e.g., Render, Heroku, AWS, etc.)
- Add support for audio and podcast URLs
- Improved error handling and user feedback
- Real-time streaming answers (typewriter effect)
- Integration with other LLM providers (e.g., Gemini, Cohere)
- Chrome extension version


**Frontend:** [Live Demo](https://priyanshu8346.github.io/Youtube-rag-frontend/)

**Backend:** [GitHub Repo](https://github.com/priyanshu8346/Youtube-rag-backend)

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Youtube-rag-frontend
