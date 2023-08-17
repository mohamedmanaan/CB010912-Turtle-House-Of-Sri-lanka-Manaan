const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span")
const durationSelect = document.getElementById("select-duration");
const pricingTable = {
    "Foreigner Adult": { normal: 10, peak: 13 },
    "Foreigner Child": { normal: 5, peak: 8 },
    "SL Adult": { normal: 4, peak: 6 },
    "SL Child": { normal: 2, peak: 3 },
    Infants: { normal: 0, peak: 0 }, // Infants are free
  };

let date = new Date();
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalender = () =>{
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                      && currYear === new Date().getFullYear() ? "active" : "";  
        liTag += `<li class="${isToday}">${i}</li>`;
        
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    daysTag.innerHTML = liTag;

    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            currMonth = icon.id === "back" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth);
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else{
                date = new Date();
            }
            renderCalender();
        })
    })

    const dateCells = document.querySelectorAll(".days li");
    dateCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            

            // Get the selected date from the clicked cell
            const selectedDate = cell.innerText;

            // Update the content of the span with the selected date
            document.getElementById("selected-date").innerText = `${months[currMonth]} ${selectedDate}, ${currYear}`;
            
        });
    })

    durationSelect.addEventListener("change", () => {
        const selectedOptions = Array.from(durationSelect.selectedOptions);
        const selectedTimes = selectedOptions.map((option) => option.text);
        document.getElementById("selected-time").innerText = selectedTimes.join(", ");
    });


    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("input", updateSummaryTable);
};

const updateSummaryTable = () => {
  // Get the input elements for SL Adults, SL Child, Foreign Adults, Foreign Child, and Infants
  const slAdultsInput = document.querySelector('.guest-select p:contains("SL Adults") + input');
  const slChildInput = document.querySelector('.guest-select p:contains("SL Child") + input');
  const foreignAdultsInput = document.querySelector('.guest-select p:contains("Foreign Adults") + input');
  const foreignChildInput = document.querySelector('.guest-select p:contains("Foreign Child") + input');
  const infantsInput = document.querySelector('.guest-select p:contains("Infants") + input');

  // Get the selected duration from the dropdown
  const selectedOptions = Array.from(durationSelect.selectedOptions);
  const selectedTimes = selectedOptions.map((option) => option.text);

  // Calculate the total payables based on the selected options
  const slAdultsPrice = 4; // Replace this with the actual price for SL Adults
  const slChildPrice = 2; // Replace this with the actual price for SL Children
  const foreignAdultsPrice = 10; // Replace this with the actual price for Foreign Adults
  const foreignChildPrice = 5; // Replace this with the actual price for Foreign Children
  const totalSLAdults = slAdultsInput.value * slAdultsPrice;
  const totalSLChild = slChildInput.value * slChildPrice;
  const totalForeignAdults = foreignAdultsInput.value * foreignAdultsPrice;
  const totalForeignChild = foreignChildInput.value * foreignChildPrice;
  const totalInfants = 0; // Infants are free

  const totalPayables = totalSLAdults + totalSLChild + totalForeignAdults + totalForeignChild + totalInfants;

  // Update the content of the summary table
  document.getElementById("selected-date").innerText = "Selected Date"; // Replace with the selected date
  document.getElementById("selected-time").innerText = selectedTimes.join(", ");
  document.querySelector(".hide:nth-child(1) td:nth-child(2)").innerText = `$${totalSLAdults}`;
  document.querySelector(".hide:nth-child(2) td:nth-child(2)").innerText = `$${totalSLChild}`;
  document.querySelector("tr:nth-child(3) td:nth-child(2)").innerText = `$${totalForeignAdults}`;
  document.querySelector(".hide:nth-child(4) td:nth-child(2)").innerText = `$${totalForeignChild}`;
  document.querySelector(".hide:nth-child(5) td:nth-child(2)").innerText = `$${totalInfants}`;
  document.querySelector("tfoot tr td:nth-child(2)").innerText = `$${totalPayables}`;
}

renderCalender();







