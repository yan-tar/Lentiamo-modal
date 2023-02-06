# Lentiamo modal
Browser extension for checking modals* on Lentiamo sites

## How to add to Chrome
1. Go to chrome://extensions
2. At the upper right corner switch on Developer mode
3. At the upper left corner click on "Load unpacked" button
4. Choose a folder with extension

## How to use
Just click on the extension icon (it should be pinned) or use shortcut `Ctrl+Shift+F` or `MacCtrl+Shift+F`. If there are some hidden modals* on the page a list with its ids will appear on popup. Click on the id to show modal. Some modals doesn't have any content inside, cause it should be dynamically added by clicking on original trigger button, so you'll see just an empty box.

## TODO
1. use Live js collections or add refresh button to popup, cause on detail page when something added to a cart number of modals changes.
1. update extension icon to show that there are some modals on the page (probably a `background.js` will be needed)
1. refactor: use proper async functions
1. show possible issues of modals (no title, no close button) in popup
1. highlite trigger button
1. don't update popup if page wasn't updated, but popup was closed and opened.

*modals - elements that have `.modal`|`.vc-modal`|`.vc-modal-static` class.
