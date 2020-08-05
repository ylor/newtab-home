/**
 * Gets the homepage URL configured in Firefox.
 *
 * @return the homepage URL as a string
 */
async function getHome() {
  let hasPermission = await browser.permissions.contains({
    permissions: ["browserSettings"],
  }); // Check for permission to read browserSettings

  if (hasPermission) {
    let result = await browser.browserSettings.homepageOverride.get({});
    let home = result.value;

    if (home.startsWith("about:")) {
      //exit early if home begins with "about:"
      console.log("Currently configured homepage is " + result.value);
      home = "about:blank";
    } else if (!home.startsWith("http")) {
      // if configured homepage doesn't begin with http(s) prepend it
      home = "http://" + home;
    }
    return home;
  } else {
    console.error("Unable to retrieve configured homepage.");
    return "about:blank";
  }
}

/**
 * Gets the homepage URL configured in Firefox.
 */

async function newTabHome() {
  const home = await getHome();
  const focus = await browser.storage.local
    .get({ focus: "website" })
    .then((data) => data.focus);

  await browser.tabs.getCurrent((tab) => {
    const tabId = tab.id;

    if (focus === "addressbar") {
      browser.tabs.update(tabId, { url: home, loadReplace: true }, () => {});
      // Nothing to do
      // Required for browser.history.deleteUrl()
    } else {
      browser.tabs.create({ url: home }, (tab) => {
        browser.tabs.remove(tabId);
      });
    }
  });

  // Prevent spamming History
  browser.history.deleteUrl({
    url: browser.extension.getURL("newtab.html"),
  });
}

newTabHome();
