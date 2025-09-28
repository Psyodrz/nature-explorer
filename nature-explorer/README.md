# Nature Explorer

A mobile-first web application to explore common Indian plants, learn about their properties, and test your knowledge with a quiz.

## Features

- **Mobile-First Design**: Optimized for phone screens with responsive layout
- **Plant Gallery**: Explore a collection of 10 common Indian plants
- **Detail View**: Get detailed information about each plant in English and Hindi
- **Search & Filter**: Find plants by name or filter by type
- **Quiz Section**: Test your knowledge with a 5-question quiz
- **Offline Functionality**: Works completely offline with no external API dependencies

## Technologies Used

- React (with TypeScript)
- Tailwind CSS
- React Router

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Add plant images:
   - Create plant images in the `public/assets` folder with filenames that match those in `src/data/plants.json`
   - See `src/data/get-images.js` for details on required images
   - For testing, you can use placeholder images from services like Picsum Photos
4. Start the development server:
   ```
   npm start
   ```

## Folder Structure

```
/public
  /assets          # Plant images
/src
  /components      # React components
  /data            # JSON data files (plants.json, quiz.json)
  App.tsx          # Main application component
  index.tsx        # Entry point
```

## Offline Usage

This app is designed to work completely offline. All data is stored locally in JSON files, and images are loaded from the `public/assets` folder.

## Mobile Optimization

The app is specifically designed for mobile devices with:
- Responsive grid layout (2 columns on mobile)
- Touch-friendly UI elements with large tap targets
- Bottom navigation bar for easy thumb access
- Readable font sizes and clean interface
