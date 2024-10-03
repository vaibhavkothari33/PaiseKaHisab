# Money Tracker Web Application

Welcome to the **PaiseKaHisab** web application! This app is designed to help you manage your finances, track your expenses, visualize spending patterns, and provide useful financial advice. Below is a detailed overview of the app's features.

## Features

### 1. Expense Tracking

**Feature Overview:**
- **Add an Expense:** Easily record your expenses by entering the amount and selecting a category.
- **Categories:** Track your spending in predefined categories like Food, Shopping, Rent, Travel, Lend, and others.
- **Transaction History:** View a detailed history of all your transactions, including the category, date, and amount spent.

**How It Works:**
- Users enter the expense amount and select the appropriate category.
- Transactions are timestamped and stored locally, so they persist even after page reloads.
- The app maintains a complete history of transactions for future reference.

### 2. Expense Visualization

**Feature Overview:**
- **Pie Chart:** Visualize your expenses with a real-time pie chart that updates as you add new transactions.

**How It Works:**
- The pie chart reflects the percentage of spending across different categories.
- Every new expense automatically updates the chart, providing an instant visual summary.

### 3. Transaction History Table

**Feature Overview:**
- **Detailed Table:** Displays your transaction history in a clear and organized table.
- **Columns:** Includes the category, date, and amount spent for each transaction.
- **Total Spend:** Shows the total amount spent across all categories.

**How It Works:**
- The table is dynamically populated with transaction details as they are entered.
- A total at the bottom calculates the overall spending.

### 4. Financial Advice

**Feature Overview:**
- **Random Advice:** Receive random financial advice every time you visit the home page.

**How It Works:**
- Advice is fetched from the Advice Slip API and displayed on the home page.
- This feature provides quick and helpful financial tips for better money management.

### 5. GitHub Commit Count

**Feature Overview:**
- **GitHub Commit Count:** The number of commits made to build this app is dynamically fetched from GitHub.

**How It Works:**
- The app uses the GitHub API to fetch the total number of commits made to the repository and displays this count in the footer.

## Issues to be Solved

We have some tasks open for contributions. If you're a fresher or a beginner, the app’s easy tech stack makes it ideal for you to start contributing! Here are some issues to work on:

1. **Hide Firebase API Keys**:
   - Currently, the Firebase API keys are publicly visible in the codebase. We need to secure these keys by hiding them properly.
   
2. **Add a Website Visitor Counter**:
   - Implement a feature to count and display the number of visitors to the website.

3. **Custom Alert Box for Input Validation**:
   - Replace the browser's default alert boxes with a custom-designed alert box for validation errors (e.g., when a user doesn't enter a value in required fields like "price" or "name"). [See the full issue details here](https://github.com/vaibhavkothari33/PaiseKaHisab/issues/4).

To contribute to these issues, please follow the contribution steps below.

## Technologies Used

- **HTML/CSS:** For structuring and styling the web pages.
- **JavaScript:** For managing local storage, user interactions, and GitHub API integration.
- **Chart.js:** For rendering dynamic pie charts.
- **Tailwind CSS:** For responsive and modern design.
- **Advice Slip API:** For fetching random financial advice.
- **GitHub API:** To dynamically fetch and display the number of commits made to the repository.

## How to Contribute

We welcome contributions to improve this project! If you are interested in contributing, please follow these steps:

1. **Fork the Repository:**
   - Click the "Fork" button on the top-right of the repository page to create a personal copy of the project.

2. **Clone Your Fork:**
   - Clone the repository to your local machine using:

     ```bash
     git clone https://github.com/vaibhavkothari33/PaiseKaHisab.git
     ```

3. **Create a Branch:**
   - Create a new branch for your changes:

     ```bash
     git checkout -b <your-branch-name>
     ```

4. **Make Changes:**
   - Implement your changes and commit them with a descriptive message:

     ```bash
     git add .
     git commit -m "Your descriptive commit message"
     ```

5. **Push Changes:**
   - Push your changes to your fork:

     ```bash
     git push origin <your-branch-name>
     ```

6. **Submit a Pull Request:**
   - Go to the original repository and open a pull request from your branch to the main repository.

### Contribution Guidelines

- Please ensure your code is well-documented and follows best practices.
- Ensure that all the features you add are fully responsive and work on mobile devices.
- Run tests and verify that the existing functionality is not broken before submitting your pull request.

I appreciate your contributions and will review your pull requests as soon as possible!

## Contact

For any questions, feedback, or support regarding this project, please reach out to me on my social platforms:

- **LinkedIn:** [vaibhavkothari33](https://www.linkedin.com/in/vaibhavkothari33)
- **GitHub:** [vaibhavkothari33](https://github.com/vaibhavkothari33)
- **Twitter:** [@vaibhavkothari33](https://twitter.com/vaibhavkotharii)

I value your input and am here to assist you!
