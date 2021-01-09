async function getPreference() {
  const focusPreference = await browser.storage.local
    .get({ focus: "website" })
    .then((data) => data.focus);
  //console.log(focusPreference)
  document.querySelector(`input[value="${focusPreference}"]`).checked = true;
}

function setPreference(value) {
  browser.storage.local.set({
    focus: value,
  });
  console.log(`Cursor preference '${value}' has been saved`);
}

window.addEventListener("DOMContentLoaded", getPreference);
document.querySelectorAll('input[name="preference"]').forEach((element) => {
  element.addEventListener("change", function (event) {
    setPreference(event.target.value);
  });
});
