const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".number, .options");
const MAX_LENGTH = 25;

//BUTTONS FUNCTION
function calculateExpression(expr) {
  const processed = expr.replace(
    /(\d+(\.\d+)?)%/g,
    (_, num) => parseFloat(num) / 100
  );
  try {
    return Function(`"use strict"; return (${processed})`)();
  } catch {
    return "Error";
  }
}
function appendToDisplay(value) {
  if (display.value.length < MAX_LENGTH) {
    display.value += value;
  }
}
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      display.value = calculateExpression(display.value);
    } else {
      appendToDisplay(value);
    }
  });
});
//KEY FUNCTION
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if ("0123456789+-/*.%".includes(key)) {
    appendToDisplay(key);
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    display.value = "";
  } else if (key === "Enter") {
    display.value = calculateExpression(display.value);
  }
});
