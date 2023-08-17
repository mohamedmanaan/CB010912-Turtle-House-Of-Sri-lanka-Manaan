//Confirmation Page

   // Wait for the DOM to load
   document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the confirmation table
    const confirmationTable = document.querySelector(".confirmation table");

    // Load and display the user's selected options from local storage
    function displayConfirmation() {
      const ticketSelection = JSON.parse(localStorage.getItem("ticketSelection"));
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));

      if (ticketSelection && userDetails) {
        confirmationTable.innerHTML = `
          <tr>
            <td>Name</td>
            <td>${userDetails.fullName}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>${userDetails.date}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>${userDetails.time}</td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>${userDetails.duration}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>${userDetails.mobile}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${userDetails.email}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>${userDetails.gender}</td>
          </tr>
          <tr>
            <td>Tickets</td>
            <td>Charges</td>
          </tr>
          ${generateTicketRows(ticketSelection)}
          <tr>
            <td>Total Payable</td>
            <td>${calculateTotalPayable(ticketSelection)}</td>
          </tr>
        `;
      }
    }

    // Function to generate rows for each ticket category
    function generateTicketRows(ticketSelection) {
      // Replace these with actual charge values
      const charges = {
        "SL Adult": 4,
        "SL Child": 2,
        "Foreigner Adult": 10,
        "Foreigner Child": 5,
        "Infant": 0
      };

      let rows = "";

      for (const category in ticketSelection) {
        if (ticketSelection[category] > 0) {
          const charge = charges[category];
          const totalCharge = charge * ticketSelection[category];
          rows += `
            <tr>
              <td>${ticketSelection[category]} ${category}</td>
              <td>$${totalCharge}</td>
            </tr>
          `;
        }
      }

      return rows;
    }

    // Function to calculate the total payable amount
    function calculateTotalPayable(ticketSelection) {
      const charges = {
        "SL Adult": 4,
        "SL Child": 2,
        "Foreigner Adult": 10,
        "Foreigner Child": 5,
        "Infant": 0
      };

      let totalPayable = 0;

      for (const category in ticketSelection) {
        if (ticketSelection[category] > 0) {
          const charge = charges[category];
          totalPayable += charge * ticketSelection[category];
        }
      }

      return `$${totalPayable}`;
    }

    // Display the confirmation table when the page loads
    displayConfirmation();
  });





  // Get references to the relevant elements in the HTML
const selectedDateElement = document.getElementById('selectedDate');
const selectedTimeElement = document.getElementById('selectedTime');
const slAdultsRow = document.getElementById('sl-adults-row');
const slChildRow = document.getElementById('sl-child-row');
const foreignAdultsRow = document.getElementById('foreign-adults-row');
const foreignChildRow = document.getElementById('foreign-child-row');
const infantRow = document.getElementById('infant-row');
const continueButton = document.getElementById('continueButton');

// Function to update the summary table
function updateSummaryTable() {
  const selectedDate = selectedDateElement.innerText;
  const selectedTime = selectedTimeElement.innerText;
  const slAdults = parseInt(document.getElementById('slAdult').value);
  const slChild = parseInt(document.getElementById('slChild').value);
  const foreignAdults = parseInt(document.getElementById('foreignAdults').value);
  const foreignChild = parseInt(document.getElementById('foreignChild').value);
  const infant = parseInt(document.getElementById('infant').value);

  selectedDateElement.innerText = selectedDate;
  selectedTimeElement.innerText = selectedTime;

  if (slAdults > 0) {
    slAdultsRow.classList.remove('hide');
    slAdultsRow.querySelector('td:last-child').innerText = '$' + (slAdults * 10);
  } else {
    slAdultsRow.classList.add('hide');
  }

  if (slChild > 0) {
    slChildRow.classList.remove('hide');
    slChildRow.querySelector('td:last-child').innerText = '$' + (slChild * 5);
  } else {
    slChildRow.classList.add('hide');
  }

  foreignAdultsRow.querySelector('td:last-child').innerText = '$' + (foreignAdults * 15);

  if (foreignChild > 0) {
    foreignChildRow.classList.remove('hide');
    foreignChildRow.querySelector('td:last-child').innerText = '$' + (foreignChild * 10);
  } else {
    foreignChildRow.classList.add('hide');
  }

  if (infant > 0) {
    infantRow.classList.remove('hide');
    infantRow.querySelector('td:last-child').innerText = '$' + (infant * 2);
  } else {
    infantRow.classList.add('hide');
  }

  // Calculate and update total charges
  const totalCharges = slAdults * 10 + slChild * 5 + foreignAdults * 15 + foreignChild * 10 + infant * 2;
  document.getElementById('totalCharges').innerText = '$' + totalCharges;

  // Enable or disable the continue button based on selections
  continueButton.disabled = totalCharges === 0;
}

// Attach event listeners to relevant elements
document.getElementById('slAdult').addEventListener('change', updateSummaryTable);
document.getElementById('slChild').addEventListener('change', updateSummaryTable);
document.getElementById('foreignAdults').addEventListener('change', updateSummaryTable);
document.getElementById('foreignChild').addEventListener('change', updateSummaryTable);
document.getElementById('infant').addEventListener('change', updateSummaryTable);

// Initial call to update the summary table
updateSummaryTable();
