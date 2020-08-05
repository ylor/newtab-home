async function getPreference() {
  const focusPreference = await browser.storage.local
    .get({ focus: "website" })
    .then((data) => data.focus);
  document.getElementById("preference").value = focusPreference;
}

async function setPreference() {
  browser.storage.local.set({
    focus: document.getElementById("preference").value,
  });
}

document.addEventListener("DOMContentLoaded", getPreference);
document.getElementById("preference").addEventListener("change", setPreference);
