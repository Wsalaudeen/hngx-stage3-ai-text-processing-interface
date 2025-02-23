AI-Powered Text Processing Interface

Project Overview

The AI-Powered Text Processing Interface is a web application that utilizes Chrome's AI APIs to process user-inputted text. The application allows users to:

Detect the language of the input text.

Summarize text (if it exceeds 150 characters and is in English).

Translate text into multiple languages (English, Portuguese, Spanish, Russian, Turkish, French).

The UI is designed to resemble a chat interface, ensuring a seamless user experience.

Features

✅ Input Display

A large, user-friendly textarea for users to enter text.

A send button with an icon-only display.

Sent messages appear immediately in the output area.

✅ Language Detection

Uses the Language Detector API to identify the language of the entered text.

Displays the detected language below the output text.

✅ Summarization (English Only)

If the text is more than 150 characters, a "Summarize" button appears.

Uses the Summarizer API to generate a summary.

The summarized text appears below the original text.

✅ Translation

A dropdown allows users to select a language (English, Portuguese, Spanish, Russian, Turkish, French).

A "Translate" button triggers translation using the Translator API.

The translated text is displayed below the original message.

✅ API Integration

Communicates with Chrome AI APIs asynchronously.

Handles API responses gracefully, ensuring a smooth user experience.

Displays error messages for failed API calls or invalid input.

✅ Accessibility

All interactive elements are keyboard-navigable.

Screen reader-friendly with meaningful ARIA labels.

Focus indicators provided for input fields and buttons.

Tech Stack

Frontend: HTML, CSS, React

APIs: Chrome AI APIs (Summarizer, Translator, Language Detection).

Styling: Tailwind CSS

Deployment: Hosted on a platform Vercel

Installation & Setup
git clone
https://github.com/Wsalaudeen/hngx-stage3-ai-text-processing-interface

Install Dependencies
npm install
Enable Chrome AI APIs
Go to chrome://flags/.
Search for Experimental Web Platform Features.
Enable it and restart Chrome.

Start the Development Server
npm run dev
Build and Deploy
npm run build

Usage Instructions

Enter text in the input field.

Click the Send button to display text in the output field.

Language Detection will run automatically.

If the text is in English and exceeds 150 characters, the Summarize button will appear.

Use the dropdown to select a language and click Translate.

The translated and/or summarized text will be displayed.

Error Handling

🚨 Displays an error message when:

The API call fails.

The input field is empty.

The response from the API is invalid.
