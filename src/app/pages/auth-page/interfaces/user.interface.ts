export interface User {
    id: string
    name: string
    role: string
    adverts: [
      {
        id: string,
        name: string,
        location: string,
        createdAt: string,
        isActive: true
        imagesIds: string[]
        cost : number
      }
    ],
    registeredTime: string
}