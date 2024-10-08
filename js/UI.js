function showWarning(message) {
    // Create the toast div
    var toast = document.createElement("div");
    toast.innerText = message;

    // Apply the necessary styles
    toast.style.width = "fit-content";
    toast.style.backgroundColor = "#333333dd";
    toast.style.color = "#fff";
    toast.style.textAlign = "center";
    toast.style.borderRadius = "15px";
    toast.style.padding = "16px";
    toast.style.position = "fixed"; // Keep it fixed
    toast.style.left = "50%"; // Center horizontally
    toast.style.transform = "translateX(-50%)"; // Adjust for true centering
    toast.style.bottom = "80px"; // Set to 80px from the bottom
    toast.style.zIndex = "99";
    toast.style.fontSize = "17px";
    toast.style.visibility = "hidden";

    // Append the toast to the body
    document.body.appendChild(toast);

    // Add the fade-in animation
    toast.style.visibility = "visible";
    toast.style.animation = "fadein 0.5s, fadeout 0.5s 2.5s";

    // Remove the toast after 3 seconds
    setTimeout(function () {
        toast.remove();
    }, 3000);
}

function showErrorDialog(message) {
    // Create a container for the dialog
    const dialogOverlay = document.createElement("div");
    dialogOverlay.style.position = "fixed";
    dialogOverlay.style.top = "0";
    dialogOverlay.style.left = "0";
    dialogOverlay.style.width = "100vw";
    dialogOverlay.style.height = "100vh";
    dialogOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    dialogOverlay.style.zIndex = "100";
    dialogOverlay.style.display = "flex";
    dialogOverlay.style.justifyContent = "center";
    dialogOverlay.style.alignItems = "center";

    // Create the dialog box
    const dialogBox = document.createElement("div");
    dialogBox.style.backgroundColor = "#111827"; // Red for error
    dialogBox.style.color = "#fff";
    dialogBox.style.padding = "20px";
    dialogBox.style.borderRadius = "8px";
    dialogBox.style.position = "relative";
    dialogBox.style.maxWidth = "400px";
    dialogBox.style.width = "90%";
    dialogBox.style.textAlign = "center";
    dialogBox.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";

    // Create the message
    const dialogMessage = document.createElement("p");
    dialogMessage.innerText = message;
    dialogMessage.style.marginBottom = "20px";

    // Create the close button (top-right corner)
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "15px";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";

    // Close the dialog when the close button is clicked
    closeButton.onclick = function () {
        dialogOverlay.remove();
    };

    // Append elements to the dialog box
    dialogBox.appendChild(closeButton);
    dialogBox.appendChild(dialogMessage);
    dialogOverlay.appendChild(dialogBox);

    // Append the overlay to the body
    document.body.appendChild(dialogOverlay);
}


// Add CSS for animations in JS dynamically
var style = document.createElement('style');
style.innerHTML = `
    @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 80px; opacity: 1;} /* Updated to animate from 80px */
    }

    @keyframes fadeout {
        from {bottom: 80px; opacity: 1;} /* Updated to fade out from 80px */
        to {bottom: 0; opacity: 0;}
    }
`;
document.head.appendChild(style);
