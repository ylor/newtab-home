/**
 * Get the homepage URL configured in Firefox.
 *
 * @return the homepage URL as a string
 */

async function getHomepage() {
  const hasPermission = await browser.permissions.contains({
    permissions: ["browserSettings"],
  });
  const privilegedUrls = new RegExp(/^(about|chrome|data|file):|\.js$/g);

  if (hasPermission) {
    const result = await browser.browserSettings.homepageOverride.get({});
    let homepage = result.value;

    if (privilegedUrls.test(homepage)) {
      // Exit early if configured homepage is a priveleged URL
      alert(
        `The currently configured homepage is considered a privileged URL by Firefox and may not be used.`
      );
      homepage =
        "https://support.mozilla.org/en-US/kb/how-to-set-the-home-page";
    }

    if (!homepage.startsWith("http")) {
      // if configured homepage doesn't begin with http prepend it with https
      homepage = "https://" + homepage;
    }

    return homepage;
  } else {
    alert(
      `Unable to retrieve configured homepage. Have you denied the permission for access to Browser Settings?`
    );
  }
}

// Do the thing
async function redirectNewTab() {
  const homepageUrl = await getHomepage();
  const focusPreference = await browser.storage.local
    .get({ focus: "website" })
    .then((data) => data.focus);

  await browser.tabs.getCurrent((tab) => {
    if (focusPreference === "addressbar") {
      browser.tabs.update(
        tab["id"],
        { url: homepageUrl, loadReplace: true },
        () => {}
      );
    } else {
      browser.tabs.create({ url: homepageUrl }, () => {
        browser.tabs.remove(tab["id"]);
      });
    }
  });
}

redirectNewTab();
