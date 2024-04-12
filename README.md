# Front-end/Mobile Developer Technical Assignment

## Intro

Welcome to the technical assignment for the Front-end/Mobile Developer role.
This assignment is designed to assess your skills in implementing a property search functionality and navigation using the provided back-end API.
The codebase provided uses [[tamagui]](https://tamagui.dev/) as the component library so please use the components provided.
Apart from that the assignment is open ended so feel free to use any libraries or packages you see fit.

Feel free to reach out to andrew.tarabin@loop.software for any questions :)

## Assignment Overview

Your task is to build two mobile screens that allows users to search for properties, apply filters, and navigate to a property screen displaying the property's image and address.
The application should utilize the provided back-end API for fetching property data by using the url https://loop-test-api.azurewebsites.net/api

## Requirements

### API Integration:

- Use the provided swagger documentation or API documentation to understand the endpoints and requests/responses.
- Integrate with the back-end API to fetch property data for the search functionality.
- Integrate with the back-end API to fetch property data for a single property.

## Main Functionality

### Search Functionality:

- Implement a search bar that allows users to enter search criteria for properties.
- Display the search results in a user-friendly manner, showing key information about each property such as an image and the address.
- When the screen first loads or if the user hasn't provided any search query, load the properties provided by the call without any filtering.

### Property Screen:

- Create a separate screen or view to display the details of a selected property.
- Show the property's image and address on this screen.
- Implement navigation from the search results to the property screen when a user selects a property.
- Implement a back button to navigate back to the search screen.

### Local State Management:

- Manage the application's local state to handle navigation between the search screen and the property screen.
- Ensure that the user can navigate back and forth between the screens without losing the search results or selected property.

### Stretch Goal: Property Details:

- If time permits, enhance the property screen by displaying additional fields and details about the property.
- Include information such as price, number of bedrooms, amenities, description, etc.

## API Documentation

The API documentation for the back-end UAT API can be found at the following URL:

[[API Documentation URL]](https://loop-test-api.azurewebsites.net/swagger/index.html)

Please refer to the documentation for detailed information on the available endpoints, request/response formats.
No authentication is required to use the API.

## Submission Guidelines

1. Create a new public repo and send us the link when you're done. (You can delete or privatize the repo after the review)
2. Create a new branch as your `dev` branch
3. Implement the required functionality as per the assignment requirements.
5. Create a pull request from your `dev` branch to the `main` one.
6. Include a brief description of your implementation approach, any assumptions made, and any challenges faced.

## Evaluation Criteria

Your submission will be evaluated based on the following criteria:

- Functionality: Does the application meet the specified requirements and work as expected?
- Code Quality: Is the code well-structured, modular, and maintainable?
- Best Practices: Are best practices followed for the chosen front-end framework and state management?

## Notes

- Use `yarn` as the package manager (already set up)
- Use `tamagui` as the component library (already set up)
- The api URL is set up in `.env.development`
- Expo router uses file based routing

## Setup

- `yarn install` to install dependencies
- `yarn start` to start the development server (Expo Go recommended)
