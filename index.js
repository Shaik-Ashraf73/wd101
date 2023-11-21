function validateDOB() {
  var dobInput = document.getElementById("dob");
  var dobValue = new Date(dobInput.value);
  var currentDate = new Date();
  var minDate = new Date(
    currentDate.getFullYear() - 55,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  var maxDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  if (dobValue < minDate || dobValue > maxDate) {
    alert("Date of birth must be between 18 and 55 years.");
    dobInput.value = "";
  } else {
    alert("Thank you for providing a valid date of birth.");
  }
}

function loadStoredData() {
  var storedData = JSON.parse(localStorage.getItem("registrationData")) || [];
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  storedData.forEach(function (data) {
    var row = tableBody.insertRow();
    for (var key in data) {
      var cell = row.insertCell();
      cell.textContent = data[key];
    }
  });
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dob = document.getElementById("dob").value;
    var acceptTerms = document.getElementById("acceptTerms").checked;

    var formData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      acceptTerms: acceptTerms,
    };

    var storedData = JSON.parse(localStorage.getItem("registrationData")) || [];
    storedData.push(formData);
    localStorage.setItem("registrationData", JSON.stringify(storedData));

    loadStoredData();

    validateDOB();
  });

window.onload = loadStoredData;
