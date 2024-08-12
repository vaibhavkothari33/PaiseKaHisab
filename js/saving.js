document.getElementById('savingsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pocketMoney = parseFloat(document.getElementById('pocketMoney').value);
    const savingsGoal = parseFloat(document.getElementById('savingsGoal').value);

    if (savingsGoal > pocketMoney) {
        alert('Your savings goal cannot exceed your monthly pocket money.');
        return;
    }

    const dailySpendingLimit = (pocketMoney - savingsGoal) / 30;

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('dailySpending').innerText = `To save ₹${savingsGoal.toFixed(2)} this month, you can spend ₹${dailySpendingLimit.toFixed(2)} each day.`;

});