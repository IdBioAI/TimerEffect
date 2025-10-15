# Bar Chart Element Plugin

An Element plugin for Alfons that displays a dynamic bar chart with real-time data updates.

## Requirements Fulfilled

### Plugin Configuration
- **Plugin Icon**: Uses `ChartMultipleRegular` icon from Fluent Icons
- **No Children**: `shouldAllowChild: () => () => false`
- **Hybrid Data Sourcing**: Data can be entered statically or connected through variables

### Inspector Design
- **Clear Organization**: Properties organized into logical categories:
  - **Data**: Chart dataset with custom control for adding/removing items
  - **Chart Settings**: Axis labels, dimensions, and text rotation
- **Meaningful Defaults**: Sensible default values for all properties
- **User-Friendly Controls**: Intuitive controls for each property type

### Dynamic Chart Features
- **Real-time Updates**: Chart changes dynamically immediately when values are modified
- **Custom Colors**: Each bar can have individual color customization
- **Configurable Dimensions**: Adjustable width and height
- **Text Rotation**: Optional rotation of X-axis labels for better readability
- **Axis Labels**: Customizable X and Y axis descriptions

### Technical Implementation
- **Framework**: Built with Alfons PDK, React, TypeScript
- **Chart Library**: React Native Gifted Charts for cross-platform compatibility
- **Localization**: Czech and English translations
- **Data Management**: Advanced form controls with react-hook-form integration

### Inspector Properties

| Property | Type | Description |
|----------|------|-------------|
| `dataset` | array | Chart data with value, label, and color for each bar |
| `axisX` | string | X-axis label |
| `axisY` | string | Y-axis label |
| `width` | number | Chart width (default: 350) |
| `height` | number | Chart height (default: 200) |
| `textRotate` | boolean | Rotate X-axis labels vertically |

### Data Structure
Each chart item contains:
- `value`: Numeric value for bar height
- `label`: Text label displayed on X-axis
- `color`: Optional custom color (hex format)