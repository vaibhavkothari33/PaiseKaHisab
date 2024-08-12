document.getElementById('submit').addEventListener('click', function () {
    const budget = parseFloat(document.getElementById('budget').value);
    const goal = parseFloat(document.getElementById('goal').value);
    const save = parseFloat(document.getElementById('save').value);

    if (isNaN(budget) || isNaN(save) || budget <= 0 || save <= 0) {
        document.getElementById('result').innerText = "Please enter valid amount for budget and saving!";
        return;
    }

    // Calculate daily spending allowance
    const dailySpending = (budget - save) / 30;
    const adviceText = `To save ₹${save} each month, you can spend ₹${dailySpending.toFixed(2)} each day.`;
    document.getElementById('advice').innerText = adviceText;

    if (!isNaN(goal) && goal > 0) {
        // Calculate number of months required
        const monthsRequired = Math.ceil(goal / save);
        const resultText = `You need to save for ${monthsRequired} month(s) to buy your item.`;
        document.getElementById('result').innerText = resultText;

        // Calculate and display countdown
        const currentDate = new Date();
        const goalDate = new Date(currentDate.setMonth(currentDate.getMonth() + monthsRequired));
        const daysLeft = Math.ceil((goalDate - new Date()) / (1000 * 60 * 60 * 24));
        const countdownText = `You have ${daysLeft} day(s) left to reach your savings goal.`;
        document.getElementById('days-left').innerText = countdownText;
    } else {
        document.getElementById('result').innerText = "You haven't entered a goal amount, so we'll focus on your daily spending and savings.";
        document.getElementById('days-left').innerText = "Set a goal to see your savings countdown!";
    }
});