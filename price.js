document.addEventListener('DOMContentLoaded', function() {

    const ticketTotals = {
        'SL Adult': 0,
        'SL Child': 0,
        'Foreign Adult': 0,
        'Foreign Child': 0,
        'Infant': 0
    };

    // Function to update a summary row
    function updateSummaryRow(input, row) {
        const enteredValue = parseInt(input.value);
        const ticketTypeCell = row.querySelector('td:first-child');
        const ticketType = ticketTypeCell.getAttribute('data-ticket-type');
        const normalPrice = parseFloat(row.getAttribute('data-normal-price'));
        const peakPrice = parseFloat(row.getAttribute('data-peak-price'));

        let totalPrice;
        if (ticketType === 'Infant') {
            totalPrice = 0; // Infants are free, so no need to calculate a price
        } else {
            totalPrice = enteredValue * (isPeakHour() ? peakPrice : normalPrice);
        }

        row.querySelector('td:last-child').textContent = totalPrice > 0 ? '$' + totalPrice.toFixed(2) : 'FREE';
        ticketTotals[ticketType] = totalPrice;

        const totalPayablesCell = document.querySelector('tfoot td:last-child');
        const totalPayables = Object.values(ticketTotals).reduce((acc, curr) => acc + curr, 0);
        totalPayablesCell.textContent = '$' + totalPayables.toFixed(2);
        
    
        if (ticketType === 'Infant') {
            row.querySelector('td:last-child').textContent = 'FREE';
        } else {
            const totalPrice = enteredValue * (isPeakHour() ? peakPrice : normalPrice);
            row.querySelector('td:last-child').textContent = '$' + totalPrice.toFixed(2);
        }

        if (ticketType.toLowerCase().includes('child')) {
            if (enteredValue > 1) {
                ticketTypeCell.textContent = enteredValue + ' ' + ticketType + 'ren';
            } else {
                ticketTypeCell.textContent = enteredValue + ' ' + ticketType;
            }
        } else {
            if (enteredValue > 1) {
                ticketTypeCell.textContent = enteredValue + ' ' + ticketType + 's';
            } else {
                ticketTypeCell.textContent = enteredValue + ' ' + ticketType;
            }
        }

        if (enteredValue > 0) {
            row.classList.remove('hide');
        } else {
            row.classList.add('hide');
        }
    }

    function initializeSummaryRow(inputId, rowId, ticketType) {
        const input = document.getElementById(inputId);
        const row = document.getElementById(rowId);
        input.addEventListener('input', function() {
            updateSummaryRow(input, row);
        });
        row.querySelector('td:first-child').setAttribute('data-ticket-type', ticketType);
    }

    function isPeakHour() {
        const selectedDuration = document.getElementById('select-duration').value;
        return selectedDuration.includes('Peak');
    }

    // SL Adults
    initializeSummaryRow('sl-adults-input', 'sl-adults-row', 'SL Adult');
    document.getElementById('sl-adults-row').setAttribute('data-normal-price', '4');
    document.getElementById('sl-adults-row').setAttribute('data-peak-price', '6');

    // SL Child
    initializeSummaryRow('sl-child-input', 'sl-child-row', 'SL Child');
    document.getElementById('sl-child-row').setAttribute('data-normal-price', '2');
    document.getElementById('sl-child-row').setAttribute('data-peak-price', '3');

    // Foreign Adults
    initializeSummaryRow('foreign-adults-input', 'foreign-adults-row', 'Foreign Adult');
    document.getElementById('foreign-adults-row').setAttribute('data-normal-price', '10');
    document.getElementById('foreign-adults-row').setAttribute('data-peak-price', '13');

    // Foreign Child
    initializeSummaryRow('foreign-child-input', 'foreign-child-row', 'Foreign Child');
    document.getElementById('foreign-child-row').setAttribute('data-normal-price', '5');
    document.getElementById('foreign-child-row').setAttribute('data-peak-price', '8');

    // Infants
    initializeSummaryRow('infant-input', 'infant-row', 'Infant');
    document.getElementById('infant-row').setAttribute('data-normal-price', 'FREE');
    document.getElementById('infant-row').setAttribute('data-peak-price', 'FREE');

    // Function to update the summary table and save to local storage
    const updateSummaryTable = () => {
        // Your existing code for updating the summary table
        // ...

        // Get the content of the summary table
        const summaryTable = document.querySelector(".summary-table").innerHTML;

        // Save the summary table data to local storage
        localStorage.setItem("summaryTable", summaryTable);

        // Show a confirmation message or perform any other action after saving to local storage
        alert("Summary table data saved to local storage!");
        window.location.href = "./details.html";
    };

    // Event listener for form submit
    const submitButton = document.querySelector(".submit-btn");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission (optional)

        // Update the summary table first before saving to local storage
        updateSummaryTable();
    });
});