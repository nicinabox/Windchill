export interface DarkSkyConditionsCurrently {
  [key: string]: any
  windSpeed: number
  temperature: number
  icon: string
}

export interface DarkSkyIcons {
  [key: string]: string;
}

export interface DarkSkyTranslations {
  [key: string]: string;
}

export interface Product {
  identifier: string
  title: string
  priceString: string
}

export interface Purchase {

}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Geolocation {
  coords: Coordinates
}
