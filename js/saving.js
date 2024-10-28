document.getElementById('submit').addEventListener('click', function () {
    const budget = parseFloat(document.getElementById('budget').value);
    const goal = parseFloat(document.getElementById('goal').value);
    const save = parseFloat(document.getElementById('save').value);
    
    if (isNaN(budget) || isNaN(save) || budget <= 0 || save <= 0 || save > budget) {
        showWarning("Please enter valid amounts. Budget should be greater than savings.");
        return;
    }

    const dailySpending = (budget - save) / 30;
    const adviceText = `To save ₹${save.toFixed(2)} each month, you can spend ₹${dailySpending.toFixed(2)} each day.`;
    document.getElementById('advice').textContent = adviceText;

    if (!isNaN(goal) && goal > 0) {
        const monthsRequired = Math.ceil(goal / save);
        const resultText = `You need to save for ${monthsRequired} month(s) to buy your item.`;
        document.getElementById('result').textContent = resultText;

        const currentDate = new Date();
        const goalDate = new Date(currentDate.getTime() + monthsRequired * 30 * 24 * 60 * 60 * 1000);
        const daysLeft = Math.floor((goalDate - currentDate) / (1000 * 60 * 60 * 24));
        const countdownText = `You have ${daysLeft} day(s) left to reach your savings goal.`;
        document.getElementById('days-left').textContent = countdownText;
    } else {
        document.getElementById('result').textContent = "You haven't entered a goal amount, so we'll focus on your daily spending and savings.";
        document.getElementById('days-left').textContent = "Set a goal to see your savings countdown!";
    }
});

// Select DOM elements
const sipAmountInput = document.getElementById("sipAmount");
const rateInput = document.getElementById("rate");
const durationInput = document.getElementById("duration");
const calculateSIPButton = document.getElementById("calculateSIP");
const sipResult = document.getElementById("sipResult");
const sipChartCanvas = document.getElementById("sipChart");

// Function to calculate SIP maturity amount
function calculateSIP() {
  const monthlyInvestment = parseFloat(sipAmountInput.value);
  const annualRate = parseFloat(rateInput.value);
  const years = parseInt(durationInput.value);

  if (isNaN(monthlyInvestment) || isNaN(annualRate) || isNaN(years)) {
    sipResult.textContent = "Please enter valid numbers for all fields.";
    return;
  }

  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12;

  const maturityAmount =
    monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);

  sipResult.textContent = `Maturity Amount: ₹${maturityAmount.toFixed(2)}`;

  // Generate SIP data for each year
  const labels = Array.from({ length: years + 1 }, (_, i) => `${i} Year${i === 1 ? '' : 's'}`);
  const data = [];
  let currentBalance = 0;

  for (let month = 0; month <= totalMonths; month++) {
    currentBalance += monthlyInvestment;
    currentBalance *= 1 + monthlyRate;

    if (month % 12 === 0) {
      data.push(currentBalance.toFixed(2));
    }
  }

  updateChart(labels, data);
}

// Function to create or update Chart.js graph
let sipChart;
function updateChart(labels, data) {
  if (sipChart) {
    sipChart.destroy();
  }

  sipChart = new Chart(sipChartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Projected Investment Growth",
          data: data,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Years",
            color: "#ffffff",
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount (₹)",
            color: "#ffffff",
          },
          ticks: {
            color: "#ffffff",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#ffffff",
          },
        },
      },
    },
  });
}

// Event listener for the "Calculate SIP" button
calculateSIPButton.addEventListener("click", calculateSIP);
