# poe.ninja stash tab view

Adds a stash tab view to supported poe.ninja price pages that overlays the price data where the item is in the stash.

<img src="src/assets/img/icon-128.png" width="64"/>

## Supported pages

### Essences
[https://poe.ninja/challenge/essences](https://poe.ninja/challenge/essences)
![image](https://user-images.githubusercontent.com/2396658/171045898-4ecfae85-6c05-4c20-8d1e-618acc4c5193.png)

### Fossils
[https://poe.ninja/challenge/fossils](https://poe.ninja/challenge/fossils)
![image](https://user-images.githubusercontent.com/2396658/171045952-273c7750-2d71-4e0a-8169-44d8d23a39d7.png)

### Fragments
[https://poe.ninja/challenge/fragments](https://poe.ninja/challenge/fragments)
![image](https://user-images.githubusercontent.com/2396658/171045996-37b152f9-8edb-402e-8e06-b85a8492f9e9.png)

### Scarabs
[https://poe.ninja/challenge/scarabs](https://poe.ninja/challenge/scarabs)
![image](https://user-images.githubusercontent.com/2396658/171046056-dd96b6e6-a78b-451b-a7a5-9534550bbc28.png)

### Breach
[https://poe.ninja/challenge/fragments?tab=1](https://poe.ninja/challenge/fragments?tab=1)
![image](https://user-images.githubusercontent.com/2396658/171046114-51993f14-3295-4cbe-94ae-373cc656e768.png)

## Known Issues

* [Does not always load](https://github.com/justinryder/poe-ninja-stash-tab-view/issues/7) - workaround: refresh the page until it does

## Installing and Running

### First time setup

1. Install the latest LTS version of [Node.js](https://nodejs.org/) **v14+**.
1. Run `npm install` to install the dependencies.
1. Run `npm start`
1. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   1. Check `Developer mode`
   1. Click on `Load unpacked extension`
   1. Select the `build` folder.
1. Happy selling.

### Reloading local changes

1. Run `npm start`
2. Make changes locally and save
3. Find extension in `chrome://extensions/`
4. Click the reload button
5. Load the page
