# CT Emulator UI

A modern, medical-grade CT Scan Hardware Simulator interface built with Vue 3, Vite, and Ant Design Vue. 

![Aesthetic Dashboard](https://img.shields.io/badge/Aesthetics-Premium-blueviolet)
![Medical Tech](https://img.shields.io/badge/Sector-Medical--Tech-blue)

## 🌟 Features

- **Global Status Monitoring**: Real-time tracking of tube temperature, gantry rotation, and system connectivity.
- **Maintenance & Calibration**: Interactive daily startup workflows including tube warm-up and air calibration.
- **Subsystem Health**: Real-time status list for critical hardware components (Detector, Motion Controller, etc.).
- **Real-time Logs**: High-fidelity system log viewer with severity-based styling.
- **Medical Dashboard Layout**: A specialized 12-grid layout designed for clinical environments.
- **Premium Dark Mode**: Professional dark theme with high-contrast status coding (Pulsing green for running, warning red for errors).

## 🛠 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **UI Components**: [Ant Design Vue](https://www.antdv.com/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the UI directory:
   ```bash
   cd ct-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Create a production-ready bundle:
```bash
npm run build
```

## 📂 Project Structure

- `src/components/Layout`: Core layout components (MainLayout, Sidebar).
- `src/components/Simulator`: Functional modules (Maintenance, GlobalStatus, ScanControl).
- `src/store`: Pinia stores for simulator state management.
- `src/assets`: Global styles and static resources.

## 📄 License

Internal Project - All Rights Reserved.
