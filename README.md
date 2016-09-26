Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Tool Setup

[Ionic version and Cordova,](https://github.com/uphack/phs_driver_app/wiki/Install-ionic-and-cordova)

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Install cordova plugin
We should use "ionic plugin add name_of_plugin" instead for "cordova plugin add"

## Run app for debug on Browser
1. npm install (we will run this command if there is a new lib added)
2. gulp
3. ionic serve
After that, it will run the app on browser
## Build app for debug.
1. npm install
2. gulp
3. ionic platform add android/ios
3. ionic run android/ios
## Build app for releasing Google play or apple store
1. npm install
2. gulp production
3. ionic platform remove android/ios
4. ionic platform add android/ios
5. ionic build android/ios --release

## Step to sign package apk file for Android

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.
