# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [1.6.1]
  - Fix regression introduced in 1.6 related to URLs beginning in http
## [1.6]
  - Fix regression that prevented opening homepages that do not have a protocol in the URL (http/https)
  - Optimizations to improve redirection performance when focus preference is set to the homepage
  - Remove "Color" preference implemented in 1.5 (turns out it never really did anything)
## [1.5]
  - This extension is now Manifest v3 compliant
  - Update Inter font to v4.0 
  - Options revamp
  - Added redirect page background setting to minimize flash of color
## [1.4]
  - Minor facelift to match Firefox Proton design
  - New icon
## [1.3.1]
  - Redirect to ["How to set the home page"](https://support.mozilla.org/en-US/kb/how-to-set-the-home-page) support article when using unsupported homepage
  - Use Inter locally instead of reaching out to Google fonts
## [1.3]
  - Refactor extension
  - Provide more feedback when homepages set to use privileged URLs and cannot be used
  - Add information regarding requested permissions and why they're used to readme
  - Remove the browserHistory and browserTabs permission
## [1.2]
  - Added icon
## [1.1]
  - Add preference for cursor focus when new tab has loaded
    - Options are `Website` or `Address Bar`
## [1.0]
  - Initial release