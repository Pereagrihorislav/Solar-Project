import { Product } from "./product.interface"

export interface User {
    id: string
    name: string
    role: string
    adverts: [Product],
    registeredTime: string
}