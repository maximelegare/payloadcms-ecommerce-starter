import { PRODUCT } from './products'

export const ORDERS = `
  query Orders {
    Orders(locale:en, fallbackLocale:en, limit: 300) {
      docs {
        id
      }
    }
  }
`

export const ORDER = `
  query Order($id: String ) {
    Orders(locale:en, fallbackLocale:en, where: { id: { equals: $id}}) {
      docs {
        id
        orderedBy
        items {
          product ${PRODUCT}
          title
          priceJSON
        }
      }
    }
  }
`
