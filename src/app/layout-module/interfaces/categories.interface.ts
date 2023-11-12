export interface ExtCategory {
    id: string
    name: string
    parentId: string
    childs: Category[]
}

export interface Category {
    id: string
    parentId: string
    name: string
}