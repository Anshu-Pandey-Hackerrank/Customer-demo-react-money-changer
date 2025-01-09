# React Currency Converter

This project is a React-based currency converter application that allows users to convert between different currencies using mock exchange rates.

## Project Requirements

Build a currency converter application with the following features:

### Core Features
- Convert between USD, EUR, and GBP currencies
- Input field for entering the amount to convert
- Dropdown selectors for "from" and "to" currencies
- Display the converted amount with appropriate formatting
- Real-time conversion as user types or changes currencies

### Technical Details
- Uses React with Vite for the build system
- Implements Mock Service Worker (MSW) for API simulation
- Available API endpoints:
  - GET `/rates` - Returns all available exchange rates
  - GET `/rate?from={currency}&to={currency}` - Returns specific exchange rate
