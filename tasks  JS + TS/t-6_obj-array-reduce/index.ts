type Product = {
  name: string
  price: number
  discount: number
}
type Groceries = Record<string, Product>
type ShoppingBagItem = { productId: string; count: number }

type ShoppingBag = ShoppingBagItem[]

const groceries: Groceries = {
  '73Wakv': {
    name: 'Orange Juice',
    price: 1.5,
    discount: 10,
  },
  '5L3db9': {
    name: 'Chocolate',
    price: 2,
    discount: 0,
  },
  // more items...
}

const getTotalPriceOfShoppingBag = (shoppingBagArray: ShoppingBag): string => {
  const totalCost = shoppingBagArray.reduce((acc, { productId, count }) => {
    const itemInfo = groceries[productId]
    if (!itemInfo) return acc

    const price = itemInfo.price
    const discount = itemInfo.discount

    const itemPriceWithDiscount = price * (1 - discount / 100)
    const itemTotal = itemPriceWithDiscount * count

    return acc + itemTotal
  }, 0)

  return totalCost.toFixed(2)
}

const shoppingBag: ShoppingBag = [
  { productId: '73Wakv', count: 3 },
  { productId: '5L3db9', count: 23 },
]

const totalPrice = getTotalPriceOfShoppingBag(shoppingBag)
console.log('totalPrice', totalPrice) // Возвращает 50.05
