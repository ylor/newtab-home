async function getFocusPreference() {
  const focusPreference = await browser.storage.local
    .get({ focus: "homepage" })
    .then((data) => data.focus);
  console.log(`Cursor preference is: '${focusPreference}'`);
  document.querySelector(`input[value="${focusPreference}"]`).checked = true;
}

function setFocusPreference(value) {
  browser.storage.local.set({
    focus: value,
  });
  console.log(`Cursor preference set to: '${value}'`);
}

document.querySelectorAll('input[name="focus"]').forEach((element) => {
  element.addEventListener("click", function (event) {
    setFocusPreference(event.target.value);
  });
});

window.addEventListener("DOMContentLoaded", getFocusPreference);