# FleetManagerPro: Logistics and Transportation

## Overview
Efficient fleet management is crucial for businesses that rely on transportation. FleetManagerPro enables users to manage vehicles, track their locations, schedule maintenance, and monitor driver performance, ensuring that logistics operations run smoothly.

## Project Goal
Develop a comprehensive fleet management system that allows users to track vehicles in real-time, schedule maintenance, and manage driver information. The app aims to enhance operational efficiency, improve safety, and reduce costs.

## Features
- **Real-Time Vehicle Tracking**: Monitor the location and status of your fleet in real-time.
- **Maintenance Scheduling**: Schedule and track vehicle maintenance to ensure optimal performance.
- **Driver Management**: Manage driver information, including performance metrics and trip history.
- **Dashboard**: A user-friendly dashboard to visualize key metrics and insights.

## Installation
To get started with FleetManagerPro, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FleetManagerPro.git
   cd FleetManagerPro
   ```

2. Install dependencies:
   ```bash
   cd FrontEnd
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage
Once the application is running, you can:
- Add and manage vehicles through the Vehicles component.
- Schedule maintenance using the MaintenanceForm component.
- View driver performance and manage driver information in the Drivers component.
- Access the dashboard for an overview of fleet operations.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Technologies Used
- **TypeScript**: The project is built using TypeScript for type safety and better development experience.
- **Tailwind CSS**: Utilized for styling the application with utility-first CSS.
- **Firebase**: Integrated for backend services including authentication and database management.

## Folder Structure
The project has the following folder structure:
```
FrontEnd/
├── .bolt
├── node_modules/
├── src/
│   ├── components/
│   │   ├── routes/
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Drivers.tsx
│   │   ├── Layout.tsx
│   │   ├── Login.tsx
│   │   ├── Maintenance.tsx
│   │   ├── MaintenanceForm.tsx
│   │   ├── Reports.tsx
│   │   └── Vehicles.tsx
│   ├── store/
│   │   ├── actions/
│   │   │   ├── driver.actions.ts
│   │   │   └── maintenance.action.ts
│   │   ├── reducers/
│   │   │   ├── driver.reducer.ts
│   │   │   ├── maintenance.reducer.ts
│   │   │   ├── SidebarReducer.ts
│   │   │   └── auth.ts
│   │   └── store.ts
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
