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

    transactions.forEach((transaction, index) => {
        const transactionRow = document.createElement('tr');

        transactionRow.innerHTML = `
            <td class="border px-4 py-2">${transaction.date} </td>
            <td class="border px-4 py-2">${transaction.category}</td>
            <td class="border px-4 py-2">${transaction.amount}</td>
            <td class="border px-4 py-2">
                <button class="bg-red-500 text-white py-1 px-2 rounded" onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        `;

        transactionTableBody.appendChild(transactionRow);
        totalAmount += transaction.amount;
        
        console.log(totalAmount)
    });

    // Add total row at the end
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td class="border px-4 py-2 font-bold text-right" colspan="3">Total Spent:</td>
        <td class="border px-4 py-2 font-bold">${totalAmount}</td>
    `;
    transactionTableBody.appendChild(totalRow);
}

// Function to delete a transaction
function deleteTransaction(index) {
    const transaction = transactions[index];

    // Subtract the amount 
    expenses[transaction.category] -= transaction.amount;

    // Remove the transaction from the transactions array
    transactions.splice(index, 1);

    // Update local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateChart();
    updateTransactionTable();
    calculateTotalExpense();
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

            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            transactions.push({
                category: categoryName,
                amount: amount,
                date: date,
                time: time
            });

            // Save 
            localStorage.setItem('expenses', JSON.stringify(expenses));
            localStorage.setItem('transactions', JSON.stringify(transactions));

            // Clear 
            document.getElementById("expenseAmount").value = '';

            // Update
            updateChart();
            updateTransactionTable();
            calculateTotalExpense();
        } else {
            showErrorDialog("Please enter a valid amount");
        }
    });
});

// Load saved expenses and transactions on page load
window.addEventListener('load', () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
        expenses = savedExpenses;
    }

    updateChart();
    updateTransactionTable();
    
});

// JS for the filter dropdown

function updateTransactionTable(filteredCategory = 'all') {
    const transactionTableBody = document.getElementById('transactionTable').querySelector('tbody');
    transactionTableBody.innerHTML = ''; // Clear the existing rows

    let totalAmount = 0;

    const filteredTransactions = filteredCategory === 'all' ? transactions : transactions.filter(transaction => transaction.category === filteredCategory);

    filteredTransactions.forEach((transaction, index) => {
        const transactionRow = document.createElement('tr');

        transactionRow.innerHTML = `
            <td class="border px-4 py-2">${transaction.date}</td>
            <td class="border px-4 py-2">${transaction.category}</td>
            <td class="border px-4 py-2">${transaction.amount}</td>
            <td class="border px-4 py-2">
                <button class="bg-red-500 text-white py-1 px-2 rounded" onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        `;

        transactionTableBody.appendChild(transactionRow);
        totalAmount += transaction.amount;
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td class="border px-4 py-2 font-bold text-right" colspan="3">Total Spent:</td>
        <td class="border px-4 py-2 font-bold">${totalAmount}</td>
    `;
    transactionTableBody.appendChild(totalRow);
}

document.getElementById('filterCategory').addEventListener('change', function() {
    const selectedCategory = this.value;
    updateTransactionTable(selectedCategory);
});

window.addEventListener('load', () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
        expenses = savedExpenses;
    }

    updateChart();
    updateTransactionTable(); 
});

document.getElementById('exportPdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title to PDF
    doc.text("Transaction History", 20, 10);

    // Collect the data from the transaction table
    const transactionTable = document.getElementById("transactionTable");
    const rows = [];

    // Loop through each row and collect the data for the PDF
    transactionTable.querySelectorAll('tbody tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      
      // Check if the row has at least 3 cells (Date, Category, Amount)
      if (cells.length >= 3) {
        const rowData = [
          cells[0]?.innerText || '', // Date
          cells[1]?.innerText || '', // Category
          cells[2]?.innerText || ''  // Amount
        ];
        rows.push(rowData);
      }
    });

    // Use autoTable to add the table to the PDF
    doc.autoTable({
      head: [['Date', 'Category', 'Amount']],
      body: rows,
      startY: 20
    });

    // Save the PDF
    doc.save('transaction-history.pdf');
  });


  // Function to calculate the total expense from the transactions
function calculateTotalExpense() {
    let totalExpense = 0;
    transactions.forEach(transaction => {
        totalExpense += transaction.amount;
    });
    localStorage.setItem('totalExpense', totalExpense);
    return totalExpense;
}
