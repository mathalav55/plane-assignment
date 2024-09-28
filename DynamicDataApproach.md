# 📈 Dynamic Data Handling and Chart Rendering in React.js

My approach to handling dynamic data and rendering charts in React.js involves several key steps:

## 1. 📂 File Reading and Parsing
I used `FileReader` for JSON files and `PapaParse` for CSV files to efficiently handle different data formats. Once the file is uploaded, the data is read and parsed.

## 2. 🗂️ Header Extraction
After parsing, I extracted headers from the data to populate the axis dropdowns dynamically. This allows users to choose the fields they want to visualize on the chart's X and Y axes.

## 3. 🔄 Dynamic Data Passing
The extracted data, along with the selected axes, is passed to the chart rendering component. The chart component then processes the data based on the user's selections.

## 4. 🔧 Data Transformation
I modified the data as needed, depending on the chart type (e.g., bar, line, donut, etc.) to ensure the correct format for rendering.

## 5. 🏷️ Axes Labels and Tooltips
I used label names dynamically for axes labels and tooltips, so they reflect the user's selections, improving the chart’s interactivity and readability.

## 6. 🎨 Color Generation
To add visual distinction, I implemented a color generation function that assigns unique colors to chart elements based on the number of data points.
