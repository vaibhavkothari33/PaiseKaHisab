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
