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
  let page = 1;
  let commitCount = 0;
  const perPage = 100;

  try {
    while (true) {
      // Fetch a page of commits
      const response = await fetch(`https://api.github.com/repos/vaibhavkothari33/PaiseKaHisab/commits?per_page=${perPage}&page=${page}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const commits = await response.json();

      if (commits.length === 0) {
        break;
      }
      commitCount += commits.length;
      page++;
    }

    console.log(commitCount);

    document.getElementById("commitCount").innerText = commitCount;
  } catch (error) {
    console.error("Error fetching commit count:", error);
    document.getElementById("commitCount").innerText = "Error fetching data";
  }
}

window.addEventListener("load", fetchCommitCount);
