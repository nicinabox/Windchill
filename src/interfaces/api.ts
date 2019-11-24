export interface DarkSkyConditions {
  currently: {
    windSpeed: number
    temperature: number
    icon: string
    unitSystem: string
  }
}

export interface Product {
  identifer: string
  title: string
  priceString: string
}

export interface Purchase {

}
