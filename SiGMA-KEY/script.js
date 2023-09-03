const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("file");
const fileError = document.getElementById("fileError");
const countdownBox = document.getElementById("countdown-box");
let uploadAttempts = 0;
let countdownSeconds = 180; // 3 minutes
let countdownInterval; // Variable to hold the countdown interval

// Function to disable the file input and enable it after a specified time
function disableFileInput() {
    fileInput.disabled = true;
    countdownBox.style.display = "block";
    document.body.style.backgroundColor = "black"; // Set the background color to black

    countdownInterval = setInterval(() => {
        const minutes = Math.floor(countdownSeconds / 60);
        const seconds = countdownSeconds % 60;
        countdownBox.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        countdownSeconds--;

        if (countdownSeconds < 0) {
            clearInterval(countdownInterval);
            fileInput.disabled = false;
            countdownBox.style.display = "none";
            document.body.style.backgroundColor = ""; // Reset the background color
            countdownSeconds = 180; // Reset the countdown timer
            uploadAttempts = 0; // Reset the upload attempts
        }
    }, 1000); // Update the countdown every 1 second
}

uploadForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const allowedExtensions = [".sigma"];
    const fileName = fileInput.value;
    const fileExtension = fileName.substring(fileName.lastIndexOf("."));

    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        fileError.textContent = "Only .sigma files are allowed.";
        return;
    } else {
        fileError.textContent = ""; // Clear any previous error message
    }

    if (uploadAttempts >= 3) {
        alert("You have reached the maximum upload attempts. Please try again later.");
        disableFileInput();
        return;
    }

    // Read the file contents
    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function () {
        const fileContent = fileReader.result;

        // Check if the file content exactly matches "SiGMA"
        if (fileContent.trim() === "SiGMA") {
            alert("Logged In");
            uploadAttempts = 0; // Reset the upload attempts upon successful login
        } else {
            alert("Wrong Key");
            uploadAttempts++;
        }
    };

    fileReader.readAsText(file);
});




        // Function to disable back navigation
        function disableBackNavigation() {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, null, window.location.href);
            };
        }

        // Call the function to disable back navigation
        disableBackNavigation();









        