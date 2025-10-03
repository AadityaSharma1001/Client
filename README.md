# Varchas 2025

A modern React web application built with Vite, Tailwind CSS, and React Router. This project appears to be an event management or promotional website with multiple pages including Home, About, Events, and Contact sections.

## 🚀 Features

- **Modern React Setup**: Built with React 19 and Vite for fast development
- **Responsive Design**: Styled with Tailwind CSS for mobile-first responsive design
- **Routing**: Multi-page navigation using React Router DOM
- **Interactive Components**: Includes countdown timers and modal functionality
- **Icon Integration**: Uses React Icons for consistent iconography
- **Social Media Integration**: Facebook, Instagram, Twitter, and YouTube icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** (comes with Node.js) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

## 🛠️ Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd varchas25
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all the required packages including:
   - React & React DOM
   - Vite (build tool)
   - Tailwind CSS (styling)
   - React Router DOM (routing)
   - React Icons (icons)
   - ESLint (code linting)

## 🚀 Getting Started

### Development Server

To start the development server:

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to:
```
http://localhost:5173
```

The page will automatically reload when you make changes to the source files.

### Available Scripts

- **`npm run dev`** - Starts the development server
- **`npm run build`** - Builds the app for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

### Production Build

To create a production build:

```bash
npm run build
```

The built files will be generated in the `dist/` directory, ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
varchas25/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Images and media files
│   │   ├── Designer-1.jpeg
│   │   ├── Designer.jpeg
│   │   ├── image.png
│   │   ├── logo.png
│   │   └── react.svg
│   ├── components/        # Reusable components
│   │   └── Navbar.jsx
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Events.jsx
│   │   └── Home.jsx
│   ├── styles/            # CSS files
│   │   ├── Home.css
│   │   └── Navbar.css
│   ├── App.jsx            # Main App component
│   ├── App.css            # App styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 🧭 Navigation

The application includes the following routes:

- **`/`** - Home page (includes countdown timer and main content)
- **`/about`** - About page
- **`/events`** - Events page
- **`/contact`** - Contact page

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Tailwind classes can be used throughout the components for rapid UI development. Custom styles are also available in the `styles/` directory.

## 🔧 Configuration

### Vite Configuration
The project uses Vite as the build tool. Configuration can be found in `vite.config.js`.

### ESLint Configuration
Code linting is configured in `eslint.config.js` with React-specific rules.

## 📱 Browser Support

This project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and not licensed for public use.

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**