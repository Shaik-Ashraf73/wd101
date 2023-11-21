// Function to validate the date of birth
function validateDateOfBirth() {
    var dobInput = document.getElementById("dob");
    var dobValue = new Date(dobInput.value);
    var currentDate = new Date();
    var minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
    var maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    if (dobValue < minDate || dobValue > maxDate) {
        alert("Date of birth must be between 18 and 55 years.");
        dobInput.value = ""; // Clear the invalid date
    } else {
        alert("Thank you for providing a valid date of birth.");
    }
}

// Function to load saved data from web storage
function loadSavedData() {
    var savedData = JSON.parse(localStorage.getItem("registrationData")) || [];
    var tableBody = document.getElementById("tableBody");

    // Clear table body
    tableBody.innerHTML = "";

    // Populate table with saved data
    savedData.forEach(function (data) {
        var row = tableBody.insertRow();
        for (var key in data) {
            var cell = row.insertCell();
            cell.textContent = data[key];
        }
    });
}

// Function to handle form submission
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dob = document.getElementById("dob").value;
    var acceptTerms = document.getElementById("acceptTerms").checked;

    var formData = { name: name, email: email, password: password, dob: dob, acceptTerms: acceptTerms };

    // Save data to web storage
    var savedData = JSON.parse(localStorage.getItem("registrationData")) || [];
    savedData.push(formData);
    localStorage.setItem("registrationData", JSON.stringify(savedData));

    // Load and display saved data
    loadSavedData();
    
    // Validate date of birth and show an alert
    validateDateOfBirth();
});

// Load saved data when the page loads
window.onload = loadSavedData;
