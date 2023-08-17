//Details Page
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Get references to form elements
  const form = document.querySelector(".details-form form");
  const fullNameInput = document.getElementById("fullName");
  const mobileNumberInput = document.getElementById("mobilenumber");
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const genderInput = document.getElementById("gender");
  const countryInput = document.getElementById("country");
  const submitButton = document.querySelector(".submit-btn");

  // Function to validate form inputs...
  function validateForm() {
    const fullName = fullNameInput.value.trim();
    const mobileNumber = mobileNumberInput.value.trim();
    const email = emailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();
    const gender = genderInput.value.trim();
    const country = countryInput.value.trim();

    // Add more specific validation rules for each input as needed
    if (fullName === "") {
      alert("Please enter your full name.");
      fullNameInput.focus();
      return false;
    }

    if (mobileNumber === "" || !/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      mobileNumberInput.focus();
      return false;
    }

    if (email === "") {
      alert("Please enter your email address.");
      emailInput.focus();
      return false;
    }

    if (confirmEmail === "" || confirmEmail !== email) {
      alert("Email confirmation does not match.");
      confirmEmailInput.focus();
      return false;
    }

    if (gender === "") {
      alert("Please select your gender.");
      genderInput.focus();
      return false;
    }

    if (country === "") {
      alert("Please select your country.");
      countryInput.focus();
      return false;
    }

    // If all validations pass, return true
    return true;
  }

  // Function to validate email confirmation...
  function validateEmailConfirmation() {
    const email = emailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();

    if (email !== confirmEmail) {
      confirmEmailInput.setCustomValidity("Email confirmation does not match.");
    } else {
      confirmEmailInput.setCustomValidity("");
    }
  }

  // Function to update summary table and save to local storage...
  function updateSummaryAndSave() {
    const fullName = fullNameInput.value.trim();
    const mobileNumber = mobileNumberInput.value.trim();
    const email = emailInput.value.trim();
    const gender = genderInput.value.trim();
    const country = countryInput.value.trim();

    // Update the summary table with user's input
    document.getElementById("Name").querySelector("td:nth-child(2)").textContent = fullName;
    document.getElementById("Mobile Number").querySelector("td:nth-child(2)").textContent = mobileNumber;
    document.getElementById("Email").querySelector("td:nth-child(2)").textContent = email;
    document.getElementById("Gender").querySelector("td:nth-child(2)").textContent = gender;
    document.getElementById("Country").querySelector("td:nth-child(2)").textContent = country;

    // Save entered details to local storage
    const userDetails = {
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      gender: gender,
      country: country
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    alert("Details updated and saved to local storage.");
  }

  // Event listener for form submission...
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Perform form validation
    if (validateForm()) {
      // If the form is valid, update summary table, save to local storage, and redirect
      updateSummaryAndSave();
      alert("Form submitted successfully! Redirecting to the next step.");
      window.location.href = "./PaymentPage.html"; // Redirect to the next page
    }
  });

  // Event listener for email confirmation...
  emailInput.addEventListener("input", validateEmailConfirmation);
  confirmEmailInput.addEventListener("input", validateEmailConfirmation);

  // Event listener for "Confirm with Purchase" button...
  submitButton.addEventListener("click", function () {
    // Update summary table and save to local storage
    updateSummaryAndSave();
    alert("Details confirmed with purchase! Redirecting to the next step.");
    window.location.href = "./PaymentPage.html"; // Redirect to the next page
  });
});