// Data storage
let expenses = {
    food: 0,
    tuck: 0,
    shopping: 0,
    travel: 0,
    lend: 0,
    others: 0
};

// Array to store transaction history
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Global variable to store the chart instance
let chart = null;

// Function to update the transaction table
function updateTransactionTable() {
    const transactionTableBody = document.getElementById('transactionTable').querySelector('tbody');
    transactionTableBody.innerHTML = ''; // Clear the existing rows

    let totalAmount = 0;

    transactions.forEach(transaction => {
        const transactionRow = document.createElement('tr');

        transactionRow.innerHTML = `
        <td class="border px-4 py-2">${transaction.date} </td>
            <td class="border px-4 py-2">${transaction.category}</td>
            <td class="border px-4 py-2">${transaction.amount}</td>
        `;

        transactionTableBody.appendChild(transactionRow);
        totalAmount += transaction.amount;
    });

    // Add total row at the end
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td class="border px-4 py-2 font-bold text-right" colspan="2">Total Spent:</td>
        <td class="border px-4 py-2 font-bold">${totalAmount}</td>
    `;
    transactionTableBody.appendChild(totalRow);
}

// Function to initialize or update the chart
function updateChart() {
    const ctx = document.getElementById("expensesChart").getContext("2d");

    if (chart) {
        // Update existing chart
        chart.data.labels = Object.keys(expenses);
        chart.data.datasets[0].data = Object.values(expenses);
        chart.update();
    } else {
        // Create new chart
        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(expenses),
                datasets: [
                    {
                        data: Object.values(expenses),
                        backgroundColor: [
                            "#EF4444", // Red for Food
                            "#3B82F6", // Blue for Tuck Shop
                            "#F97316", // Orange for Shopping
                            "#FBBF24", // Yellow for Travel
                            "#EC4899", // Pink for Lend
                            "#16A34A"  // Green for Others
                        ]
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top"
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Event listeners
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function () {
        const categoryName = this.id;
        const amount = parseFloat(document.getElementById("expenseAmount").value);

        if (!isNaN(amount) && amount > 0) {
            expenses[categoryName] += amount;

            // Get current date and time
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            // Add the transaction to the transactions array
            transactions.push({
                category: categoryName,
                amount: amount,
                date: date,
                time: time
            });

            // Save to local storage
            localStorage.setItem('expenses', JSON.stringify(expenses));
            localStorage.setItem('transactions', JSON.stringify(transactions));

            // Clear the input field
            document.getElementById("expenseAmount").value = '';

            // Update the chart and transaction table
            updateChart();
            updateTransactionTable();
        } else {
            alert("Please enter a valid amount");
        }
    });
});
const del = document.querySelector("#delExpense");
del.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})
// Load saved expenses and transactions on page load
window.addEventListener('load', () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
        expenses = savedExpenses;
    }

    updateChart();
    updateTransactionTable();
});
