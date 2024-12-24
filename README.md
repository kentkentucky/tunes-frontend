## Tunes Frontend
This repository contains the frontend for Tunes, a full-stack music application. The frontend is built with React.js and provides an intuitive user interface for interacting with music data. It communicates seamlessly with the backend to fetch tracks and manage user interactions using the Spotify API and MongoDB.

## Key Features
A retro, responsive design for an optimal user experience.
Integration with the Spotify API to fetch music tracks and playlists.
Interactive elements for searching, playing, and managing music tracks.
Communication with the backend to handle user data and preferences.

## Tech Stack
React.js: For building dynamic and responsive user interfaces.
CSS: For designing a visually appealing and user-friendly layout.
Axios: For making efficient API calls to the backend.
React Router: For seamless navigation between different pages within the app.
React Spotify Web Playback: For integrating Spotify playback functionality, allowing users to play tracks directly within the app.
React JS Popup: For creating modal dialogs or popups to enhance interactivity and usability, such as login prompts or notifications.

## Prerequisites
Before setting up the project, ensure you meet the following requirements:

Spotify Premium Account:
The app requires a Spotify Premium account to enable playback functionality using the Spotify Web Playback SDK. If you don’t have a Premium account, some features may not work as expected.

MongoDB Account:
A MongoDB account is required to store and manage user data. Ensure you have:

A MongoDB Atlas account (or a locally installed MongoDB instance).
A database cluster created and properly configured.
The connection string for your MongoDB database. This will be used in the backend configuration.

## Installation
1. Clone the repository
git clone https://github.com/kentkentucky/tunes-frontend.git
cd tunes-frontend

2. Install the dependencies
npm install

3. Start the server
npm run dev

## Acknowledgements
- Spotify API for music data
- React Spotify Web Playback to play audio