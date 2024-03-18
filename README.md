# Bank Appointment Query Tool

This tool is designed to query available appointment slots for bank branches directly from the Bank of China (Hong Kong) appointment system. It facilitates finding open time slots across various districts, making it easier for individuals to plan their visits to the bank. This script is to be executed in the Chrome browser's Developer Tools console, specifically within the context of an iframe on the Bank of China's appointment page.

## Prerequisites

- A modern web browser (Chrome recommended).
- Access to the Bank of China (Hong Kong) appointment system webpage.

## Important Note

Due to CORS (Cross-Origin Resource Sharing) restrictions, this script can only be executed in the console of the inner iframe named `iframe(input.action)` or `iframe(continueInput.action)`, and **not** in the top-level console (`www.bochk.com`). The correct console can be accessed by navigating to the Developer Tools in Chrome, selecting the "Console" tab, and ensuring you're targeting the correct iframe context via the dropdown menu at the top of the Console panel.

## How to Use

1. **Navigate to the Appointment Page**: Go to the Bank of China (Hong Kong) appointment system website.
2. **Open Developer Tools**: Right-click anywhere on the page and select "Inspect" or use the shortcut `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (Mac).
3. **Find the Correct Iframe**: In the Developer Tools, switch to the "Console" tab and select the appropriate iframe context as mentioned above.
4. **Paste and Execute the Script**: Copy the entire content in the [queryDate.js](queryDate.js) and paste it into the console, then press Enter to execute it.

### Making Queries

To query for available appointment slots, use the `queryDate` function with your desired date as an argument in the `DD/MM/YYYY` format:

```javascript
queryDate("23/03/2024");
```

You can make multiple queries for different dates in sequence:

```javascript
queryDate("23/03/2024");
queryDate("24/03/2024");
```

### Reading the Output

The script will log progress updates and responses from the server directly to the console. This includes:

- Request details for each district and appointment time being queried.
- Responses highlighting available appointments for each query.
- A summary of all available appointments once all queries for the given dates are completed.

## Customization

You may customize the `districts`, `appTimesWeekdays`, and `appTimesSaturday` arrays within the script to match any updates or specific requirements related to the bank's operating hours and available districts.

## Troubleshooting

If you encounter issues related to CORS restrictions or incorrect console context, ensure you're running the script in the correct iframe's console within the Bank of China's appointment system webpage.

## Contribution

Feel free to contribute to the development of this tool by suggesting improvements or reporting issues.

## Disclaimer

This tool is not affiliated with the Bank of China (Hong Kong) or any of its subsidiaries. It is provided as is, for informational purposes only. Please use it responsibly and in accordance with the bank's terms of service.
