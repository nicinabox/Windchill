# Windchill

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

## App Store Release

* Update changelog readme
* npm version VERSION
* Archive and upload
* git push && git push --tags

## Copyright

2016 Nic Haynes
