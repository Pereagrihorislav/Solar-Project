export interface Root {
  status: string
  code: number
  total: number
  data: Daum[]
}

export interface Daum {
  id: number
  name: string
  description: string
  ean: string
  upc: string
  image: string
  images: Image[]
  net_price: number
  taxes: string
  price: string
  categories: string[]
  tags: string[]
}

export interface Image {
  title: string
  description: string
  url: string
}