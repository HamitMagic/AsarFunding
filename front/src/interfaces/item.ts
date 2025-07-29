export interface Item {
  id:string,
  name:string,
  createdAt: Date,
  supplierList: Supplier[],
}

interface Supplier {
  id: string,
  name: string,
  price: number,
  amount: number,
  measure: string,
  createdAt: Date,
  expireAt: Date,
}