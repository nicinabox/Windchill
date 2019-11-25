export interface DarkSkyConditionsCurrently {
  [key: string]: any
  windSpeed: number
  temperature: number
  icon: string
}

export interface DarkSkyConversions {
  icons: {
    [key: string]: string;
  }
  translations: {
    [key: string]: string;
  }
}

export interface Product {
  identifer: string
  title: string
  priceString: string
}

export interface Purchase {

}

export interface Geolocation {
  coords: {}
}
