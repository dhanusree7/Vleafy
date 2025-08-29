// Mock Pricing Data (later will come from Google Sheets)
const pricing = {
  standard: { base: 2000, extraPerson: 500, extraChild: 300, breakfast: 200 },
  deluxe: { base: 3500, extraPerson: 700, extraChild: 400, breakfast: 300 },
  suite: { base: 5000, extraPerson: 1000, extraChild: 500, breakfast: 500 }
};

function calculateNights(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = outDate - inDate;
  return diffTime / (1000 * 60 * 60 * 24);
}

function calculatePrice() {
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const roomType = document.getElementById("roomType").value;
  const extraPerson = parseInt(document.getElementById("extraPerson").value);
  const extraChild = parseInt(document.getElementById("extraChild").value);
  const breakfast = document.getElementById("breakfast").value;

  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates");
    return;
  }

  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) {
    alert("Check-out must be after check-in");
    return;
  }

  const roomData = pricing[roomType];
  let total = roomData.base * nights;
  total += roomData.extraPerson * extraPerson * nights;
  total += roomData.extraChild * extraChild * nights;
  if (breakfast === "yes") {
    total += roomData.breakfast * nights;
  }

  document.getElementById("priceDisplay").innerText = `Total Price: ₹${total}`;
}
