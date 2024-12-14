# Journey Through Space: Neo Stats Viewer

## Overview
Welcome to the **Neo Stats** project! This application provides an interactive and visually engaging way to explore near-Earth object (NEO) statistics based on user-selected date ranges. Leveraging the latest in modern web technologies, this project demonstrates scalable architecture and well-organized code for ease of maintenance and future extensibility.

## Features
- **Date Range Picker**: Easily select a start and end date to fetch NEO statistics.
- **Dynamic Data Visualization**: View details about the fastest asteroid, closest asteroid, and average asteroid size in a responsive card layout.
- **Interactive Charts**: Bar and line charts dynamically display the number of asteroids per day.
- **Toast Notifications**: Feedback system for error and success messages.
- **Optimized API Integration**: Axios plugin configured with interceptors to handle API requests efficiently.

### Enforcing Best Practices with ESLint https://github.com/antfu/eslint-config 

This project uses a robust ESLint configuration to ensure code quality and consistency:
### Benefits of Using ESLint Configuration

1. **Code Consistency**: The configuration enforces stylistic rules like indentation, quotes, and semicolon usage, ensuring uniform code formatting.
2. **Improved Readability**: Organizing Vue component blocks and enforcing padding lines between blocks improves code clarity.
3. **Tailwind-Specific Rules**: Integration with Tailwind CSS plugin prevents non-standard class names.
4. **Error Prevention**: Helps catch potential issues such as empty component blocks or missing props during development.
5. **Customizable**: Easily extend or modify rules to fit project-specific requirements.

## Tech Stack
- **Framework**: Nuxt.js 3 (Vue.js 3)
- **Styling**: Tailwind CSS
- **Data Visualization**: Chart.js
- **State Management**: Vue 3 Composition API
- **Date Picker**:  https://vue-tailwind-datepicker.com/

## Scalability and Architecture
This project is designed with scalability and future growth in mind:

### Component-Based Design
- All features are implemented as reusable Vue components.
- Components like `DatePicker`, `ChartsBarChart`, and `Toast` can be easily extended or replaced.

### Modular Code Organization
- **Composable Functions**: Utility functions for Axios and Toast are encapsulated in reusable composables for consistent and efficient handling across the app.
- **Plugins**: Axios is configured as a Nuxt plugin with interceptors, enabling API key management and uniform error handling.

### Responsive UI
- Built with Tailwind CSS, the application is fully responsive and adapts to devices of all sizes.

### Dynamic Visualizations
- Chart.js integration provides interactive and scalable charts that can handle large datasets.

### Robust Error Handling
- Toast notifications inform users of success, errors, and important information.

## Project Structure
```
project-root/
├── components/
│   ├── Charts
│       ├── BarChart.vue
│       ├── LineChart.vue
│   └── Toast.vue
├── composables/
│   ├── axios.ts
│   └── toast.ts
├── pages/
│   └── index.vue
├── plugins/
│   └── axios.ts
├── assets/
│   └── main.css/
├── types/
│   └── index.ts
│   └── global-components.d.ts
├── public/
│   └── world-globe-america 1.svg
├── package.json
└── README.md
```

## Installation
1. **Clone the repository**:
   ```bash
   git clone git@github.com:10shubham01/neo-stats.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd neo-stats
   ```
3. **Install dependencies**:
   ```bash
   yarn install
   ```
4. **Run the development server**:
   ```bash
   yarn dev
   ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Use the date picker to select a start and end date.
3. Click **Submit** to fetch and visualize NEO data.

## Customization
### API Configuration
To use your own NASA API key:
1. Create a .env file in the project root with the following contents:
```bash
BASE_URL="https://api.nasa.gov/neo"
API_KEY="jwdihiwhliwlw oihywoih"
```
2.The application will use these values to make API requests.

### Styling
- Customize the design by editing Tailwind classes in Vue components.

## Future Enhancements
- **Advanced Filtering**: Add options to filter data by size, speed, or distance.
- **Offline Mode**: Cache previous results for offline viewing.

---
Author: **Shubham Gupta**
