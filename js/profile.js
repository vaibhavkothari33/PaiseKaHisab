const del_id = document.querySelector("#delete-data")
del_id.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})

document.addEventListener('DOMContentLoaded', () => {
    // Fetch totals from localStorage
    const totals = JSON.parse(localStorage.getItem('totals')) || { totalGive: 0, totalTake: 0 };
    const totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    const totalBillAmount = parseFloat(localStorage.getItem('totalBillAmount')) || 0;
    
    console.log(totalBillAmount);
    console.log(totalExpense)

    document.getElementById('totalExpense').innerText = `₹${totalExpense.toFixed(2)}`;
    document.getElementById('totalBillAmount').innerText = `₹${totalBillAmount.toFixed(2)}`;
    document.getElementById('totalGive').innerText = `₹${totals.totalGive.toFixed(2)}`;
    document.getElementById('totalTake').innerText = `₹${totals.totalTake.toFixed(2)}`;
  });
  