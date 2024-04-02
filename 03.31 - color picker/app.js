// === consts ===

const btn = document.getElementsByTagName("button")[0];
const colorPicker = document.getElementById("color-picker");
const colorInput = document.getElementById("color-input");

// === events ===

btn.addEventListener("click", () => {
  setBackgroundColor(colorInput.value);
});

colorPicker.addEventListener(
  "input",
  () => {
    setBackgroundColor(colorPicker.value);
  },
  true
);

colorPicker.addEventListener(
  "change",
  (event) => {
    colorInput.value = colorPicker.value;
  },
  false
);

// === functions ===

function setBackgroundColor(value) {
  if (isValidHexColor(value)) {
    document.body.style.backgroundColor = value;
    return;
  }
  window.alert(`${value} is not a correct HEX color`);
  return;
}

function isValidHexColor(color) {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;
  return regex.test(color);
}
