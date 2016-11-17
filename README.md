# FeelsLike (Windchill)

![](screenshot.jpg)

[Available on the App Store](https://appsto.re/us/wtyegb.i)

## Features

* Dead simple design
* Supports US and SI
* Selects unit system automatically based on locale
* Shows the current conditions
* Tap current conditions to set calculator to those values

## Neat tricks

* Use `babel-plugin-transform-inline-environment-variables` to inline `process.env.VAR`. Super useful for enabling features at build time.
* Add support for environment variables in `.env` by adding `[[ -s "../.env" ]] && source "../.env"` to Build Phases > Bundle React Native code and images in Xcode

## Changelog

### 1.1.1

* Fix large text centering
* Fix error when calculated windchill was zero

### 1.1.0

* Fix 3-digit numbers wrapping
* Adjust layout for small and large screens
* Increase max speed
* Increase temperature range (-50 from 0)
* Set units to device locale automatically
* Add support for tapping conditions to set values

### 1.0.0

* Initial release

## Copyright

2016 Nic Haynes
