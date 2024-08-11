   // Data storage
   let expenses = {
    shopping: 0,
    rent: 0,
    school: 0,
    food: 0
  };

  let chart;

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
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
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
                  return `${tooltipItem.label}: $${tooltipItem.raw}`;
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
        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById("expenseAmount").value = '';
        updateChart();
      } else {
        alert("Please enter a valid amount");
      }
    });
  });

  // Load saved expenses on page load
  window.addEventListener('load', () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
      expenses = savedExpenses;
    }
    updateChart();
  });