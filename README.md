# CT Emulator UI

## 📋 项目背景 (Project Background)

本项目是一个**医疗级CT扫描硬件模拟器**的前端界面系统，旨在为CT设备的研发、测试、培训和演示提供高保真的虚拟环境。该模拟器能够模拟真实CT设备的各项硬件功能、扫描流程和维护操作，无需实际硬件即可进行系统测试和人员培训。

### 核心目标

- **硬件模拟**: 模拟CT设备的各个子系统（探测器、运动控制器、球管等）的状态和行为
- **扫描流程**: 完整的扫描工作流，包括患者定位、协议选择、扫描执行和故障模拟
- **维护功能**: 球管预热、空气校准等日常维护和启动流程
- **实时监控**: 全局状态监控、系统日志和设备健康状态追踪

### 技术背景

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

## 🤖 AI协作开发 (AI-Assisted Development)

本项目采用**人机协作**的开发模式，充分利用AI助手（Antigravity）进行快速迭代和高质量代码生成。

### 协作模式

1. **需求沟通**: 开发者通过自然语言描述功能需求或问题
2. **方案设计**: AI分析需求，提出技术方案和实现策略
3. **代码生成**: AI生成完整的组件、样式和状态管理代码
4. **迭代优化**: 根据反馈持续调整UI布局、交互逻辑和视觉效果
5. **问题解决**: 快速定位和修复bug，优化性能

### 关键成果

通过AI协作，项目实现了：

- **快速原型**: 从概念到可用界面，从数小时缩短到数分钟
- **高质量代码**: 遵循Vue 3最佳实践，类型安全，组件解耦
- **专业UI/UX**: 医疗级界面设计，深色主题，状态色彩编码
- **完整文档**: 自动生成的代码注释和类型定义

### 给其他AI的建议

如果你是另一个AI助手，需要继续维护或扩展此项目，建议：

1. **阅读代码结构**: 先查看 `src/store/simulator.ts` 了解核心状态管理
2. **理解组件分层**: Layout组件负责布局，Simulator组件负责功能模块
3. **遵循设计规范**: 保持医疗级UI美学，使用Ant Design Vue组件
4. **状态优先**: 重要状态变化应通过Pinia store管理，确保响应式更新
5. **参考历史对话**: 项目经历多次重构，conversation history包含重要的设计决策

## 📊 项目执行情况 (Project Progress)

### 已完成功能模块

#### ✅ 核心框架 (2026-02-03)

- **Dashboard布局**: 12栅格系统，侧边栏/顶部栏全局状态显示
- **深色主题**: 专业医疗科技美学，状态色彩编码（运行=脉动绿，错误=警告红）
- **响应式设计**: 适配不同屏幕尺寸

#### ✅ 全局状态监控 (GlobalStatus)

- 实时球管温度显示（带过热警告）
- 机架旋转状态和速度
- 系统连接状态
- 子系统健康列表（Detector, Motion Controller, DAS等）

#### ✅ 维护模块 (Maintenance)

- **球管预热 (Tube Warm-up)**: 多阶段升温流程，实时进度和温度显示
- **空气校准 (Air Calibration)**: 校准流程状态机，参数配置和进度追踪
- **系统日志**: 实时日志查看器，按严重级别分类（INFO/WARNING/ERROR）

#### ✅ 扫描控制 (ScanControl)

- **扫描状态机**: IDLE → READY → SCANNING → COMPLETE 状态流转
- **按钮逻辑优化**:
  - START SCAN（带错误后重启功能）
  - 使能/曝光/故障模拟按钮的条件启用
  - E-STOP紧急停止（始终可用）
- **故障模拟**: 菜单式故障注入，带图标反馈

#### ✅ 协议管理 (Protocol Browser)

- 协议列表和筛选（按年龄组、扫描类型）
- 患者定位配置（4种姿势：Head First Supine/Prone, Feet First Supine/Prone）
- 协议参数编辑器（断层/螺旋扫描参数）
- 剂量管理和阈值计算

### 开发里程碑

| 日期 | 里程碑 | 描述 |
| ------ | -------- | ------ |
| 2026-01-23 | 项目启动 | 初始化Vue 3项目 |
| 2026-01-27~29 | 协议系统 | 协议编辑器、剂量管理、参数验证 |
| 2026-01-30 | UI重构 | 协议面板布局优化、SVG插图修复 |
| 2026-02-03 | 维护模块 | 球管预热和空气校准功能完整实现 |
| 2026-02-03 | 扫描逻辑 | 状态机优化、按钮逻辑细化 |
| 2026-02-03 | 文档完善 | README增强，便于AI理解项目 |

### 技术亮点

- **类型安全**: 完整的TypeScript类型定义
- **状态管理**: Pinia store集中管理模拟器状态
- **组件化**: 高度解耦的Vue组件，易于测试和维护
- **动画效果**: 脉动动画、进度条、状态转换
- **错误处理**: 完善的错误状态和恢复机制

### 待优化项

- [ ] 添加单元测试覆盖
- [ ] 后端API集成（目前为前端模拟）
- [ ] 国际化支持（i18n）
- [ ] 性能监控和优化
- [ ] 可访问性改进（ARIA标签）

## 📄 License

Internal Project - All Rights Reserved.
