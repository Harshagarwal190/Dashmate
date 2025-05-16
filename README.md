
# Simple Dashboard (React.js)

## Project Overview

This project is a simple and modern user dashboard implemented using Vue.js. It consists of three main sections: Profile Information, Tasks, and Statistics. The dashboard is fully responsive and designed with modern UI principles.

## Features

- **Profile Information:** Displays user details like name, email, and profile picture.
- **Tasks:** Shows a list of tasks with checkboxes to mark them as completed.
- **Statistics:** Provides a summary of completed and pending tasks.
- **Responsive Design:** Adapts to both mobile and desktop views.
- **Data Fetching:** Uses a mock API for dynamic data loading.
- **Edit Profile:** Allows users to update their profile details via a form.

## Tech Stack

- React.js (Frontend Framework)
- HTML & CSS (Markup and Styling)
- JavaScript (Logic)
- Mock API (Data Fetching)
- GitHub Actions (CI/CD)
- ESLint & Prettier (Code Linting and Formatting)

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simple-dashboard.git
   cd simple-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run serve
   ```
4. Open your browser and navigate to `http://localhost:8080/`.

## Code Review and Workflow

- Create a new branch for every feature or bug fix.
- Use pull requests (PRs) for code reviews.
- Follow the Git flow: feature branching and PR merging.
- Run linting before committing:
  ```bash
  npm run lint
  ```
- On PR submission, GitHub Actions automatically run tests and lint checks.

## Usage

- View profile details, task list, and statistics.
- Mark tasks as completed using checkboxes.
- Edit user profile through the form provided.

## Folder Structure

```
src
├── assets        # Static images and assets
├── components    # Vue components for profile, tasks, statistics
├── views         # Main dashboard view
├── api           # Mock API configuration
└── App.ts       # Root component
```

## Mock API Integration

- Uses a local JSON file to simulate API responses.
- Fetches user and task data dynamically on page load.

## Responsive Design

- Uses CSS Flexbox and Media Queries for responsive layouts.
- Optimized for both mobile and desktop devices.

## Contributing

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License.
