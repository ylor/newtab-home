async function getHomepage() {
  const hasPermission = await browser.permissions.contains({
    permissions: ["browserSettings"],
  });
  const protectedUrls = new RegExp(/^(about|chrome):/gi);

  if (hasPermission) {
    const response = await browser.browserSettings.homepageOverride.get({});
    let homepage = response.value.split("|")[0].trim();
    
    if (protectedUrls.test(homepage)) {
      alert('The currently configured homepage is considered privileged by Firefox and may not be used.')
      homepage = "https://support.mozilla.org/en-US/kb/how-to-set-the-home-page"
    }
    
    try {
      new URL(homepage);
    } catch {
      homepage = "https://" + homepage
    }

    return homepage;
  } else {
    alert(
      `Unable to retrieve configured homepage. Have you denied the permission for access to Browser Settings?`
    );
  }
}

async function redirectNewTab() {
  const homepage = await getHomepage();
  const tab = await browser.tabs.getCurrent()
  const focusPreference = await browser.storage.local
    .get({ focus: "website" })
    .then((data) => data.focus);

  if (focusPreference === "addressbar") {
    browser.tabs.update(
      tab.id,
      { url: homepage, loadReplace: true }
    );
  } else {
    browser.tabs.create({ url: homepage });
    browser.tabs.remove(tab.id);
  }
}

redirectNewTab();