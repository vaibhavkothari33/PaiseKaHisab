async function fetchUserDataAndAdvice() {
  try {
    const advicePromise = fetchFinancialAdvice(); 
    const [advice] = await Promise.all([advicePromise]);
    document.getElementById("adviceText").innerText = `"${advice}"`;
  } catch (error) {
    document.getElementById("adviceText").innerText =
      "Sorry, we could not load the advice at this time.";
  }
}
// Fetch advice  
async function fetchFinancialAdvice() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  return data.slip.advice;
}
window.addEventListener("load", fetchUserDataAndAdvice);

// Function to fetch number of commits from GitHub
async function fetchCommitCount() {
  try {
    // Fetch all commits from the repo
    const response = await fetch(`https://api.github.com/repos/vaibhavkothari33/PaiseKaHisab/commits?per_page=100`);

    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const commits = await response.json();
    const commitCount = commits.length;

    console.log(commitCount);
  
    document.getElementById("commitCount").innerText = commitCount;
  } catch (error) {
    console.error("Error fetching commit count:", error);
    document.getElementById("commitCount").innerText = "Error fetching data";
  }
}

window.addEventListener("load", fetchCommitCount);
