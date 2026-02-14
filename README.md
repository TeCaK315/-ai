# AI Sales Automation ROI Platform

A comprehensive dashboard for tracking, analyzing, and optimizing ROI from sales automation tools. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Real-time ROI Tracking**: Monitor costs, revenue, and ROI metrics across all your sales automation tools
- **Interactive Dashboard**: Visualize performance with dynamic charts and graphs using Recharts
- **AI-Powered Recommendations**: Get actionable insights to optimize your sales automation strategy
- **Data Persistence**: All data stored locally in browser (localStorage) for instant access
- **Time-based Filtering**: Analyze performance across different time periods (7d, 30d, 90d, 1y, all time)

### Key Metrics
- Total ROI and ROI Percentage
- Payback Period calculation
- Cost Per Acquisition (CPA)
- Revenue Growth Rate
- Cost Efficiency Analysis
- Revenue Consistency Score

### Intelligent Recommendations
The platform analyzes your data and provides:
- Cost reduction strategies
- Revenue optimization tactics
- Efficiency improvements
- Automation expansion opportunities
- Tool stack optimization suggestions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Browser localStorage (prototype)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sales-automation-roi-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main dashboard page
│   ├── globals.css         # Global styles with Tailwind directives
│   └── api/                # API routes
│       ├── roi/calculate/
│       ├── recommendations/generate/
│       └── data/export/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── ROIOverviewCards.tsx
│   │   ├── ROIChart.tsx
│   │   ├── CostRevenueChart.tsx
│   │   ├── DataInputForm.tsx
│   │   ├── RecommendationsPanel.tsx
│   │   ├── TimeFilterBar.tsx
│   │   └── ProgressIndicator.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Badge.tsx
│   └── icons/              # Custom icon components
│       └── index.tsx
├── lib/                    # Core business logic
│   ├── storage.ts          # localStorage utilities
│   ├── roi-calculator.ts   # ROI calculation functions
│   ├── recommendation-engine.ts  # AI recommendation logic
│   └── chart-utils.ts      # Chart data transformation
└── types/
    └── index.ts            # TypeScript interfaces
```

## Usage Guide

### Adding Data
1. Navigate to the Data Input Form on the dashboard
2. Enter the date, costs, revenue, automation tool name, and leads generated
3. Click "Add Entry" to save the data
4. The dashboard will automatically update with new metrics

### Viewing Analytics
- **Overview Cards**: See key metrics at a glance (Total ROI, ROI %, Payback Period, CPA)
- **ROI Chart**: Track ROI trends over time with interactive line charts
- **Cost vs Revenue Chart**: Compare costs and revenue side-by-side with bar charts
- **Time Filters**: Switch between different time periods to analyze trends

### Getting Recommendations
- Recommendations are automatically generated based on your data
- Each recommendation includes:
  - Priority level (High, Medium, Low)
  - Category (Cost Reduction, Revenue Increase, Efficiency, Automation)
  - Estimated impact percentage
  - Actionable steps to implement
  - Implementation difficulty rating

### Exporting Data
Use the API endpoint `/api/data/export` to export your data in CSV or JSON format for external analysis.

## Key Algorithms

### ROI Calculation
```typescript
ROI = Revenue - Costs
ROI Percentage = ((Revenue - Costs) / Costs) × 100
Payback Period = Total Costs / Daily Revenue
Cost Per Acquisition = Total Costs / Total Leads
```

### Recommendation Engine
The engine analyzes:
- Average ROI across all tools
- Cost efficiency ratios
- Revenue consistency patterns
- Tool-specific performance
- Lead generation efficiency
- Growth trends

Based on these factors, it generates prioritized recommendations with estimated impact.

## Color Palette

- **Primary**: #4A90E2 (Blue) - Main brand color
- **Secondary**: #50E3C2 (Teal) - Accent for success states
- **Accent**: #F5A623 (Orange) - Call-to-action elements
- **Background**: #1F1F1F (Dark Gray) - Main background
- **Text**: #EAEAEA (Light Gray) - Primary text color

## Future Enhancements

### Planned Features
- MongoDB integration for cloud data persistence
- User authentication and multi-user support
- Team collaboration features
- Advanced AI predictions using OpenAI API
- Email report scheduling
- Integration with popular CRM systems
- Mobile app version
- Real-time data sync across devices

### Database Schema (MongoDB)
The platform is designed to scale with MongoDB collections for:
- `roi_data`: Individual ROI entries
- `roi_reports`: Generated reports
- `recommendations`: AI recommendations
- `users`: User accounts and preferences

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript