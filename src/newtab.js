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
      console.error("about:");
      return "about:blank";
    } else if (!home.startsWith("http")) {
      home = "http://" + home;
    }
    return home;
  } else {
    console.log("Unable to retrieve configured homepage.");
    return "about:blank";
  }
}

/**
 * Gets the homepage URL configured in Firefox.
 */

async function newTabHome() {
  let home = await getHome();
  const focus = true;

  await browser.tabs.getCurrent((tab) => {
    const tabId = tab.id;

    if (focus) {
      browser.tabs.create(
        { url: home, cookieStoreId: tab.cookieStoreId },
        (tab) => {
          // cookieStoreId required to support the container tabs
          browser.tabs.remove(tabId);
        }
      );
    } else {
      browser.tabs.update(tabId, { url: home, loadReplace: true }, () => {
        // Nothing to do
        // Required for browser.history.deleteUrl() to work
      });
    }
  });

  // Prevent spamming History
  browser.history.deleteUrl({
    url: browser.extension.getURL("newtab.html"),
  });
}

newTabHome();
