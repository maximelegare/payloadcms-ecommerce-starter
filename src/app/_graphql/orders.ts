import { PRODUCT } from './products'
import { Locale } from '@@/i18nConfig'

export const ORDERS = (locale:Locale) => `
  query Orders {
    Orders(locale:${locale}, fallbackLocale:en, limit: 300) {
      docs {
        id
      }
    }
  }
`

export const ORDER = (locale:Locale) => `
  query Order($id: String ) {
    Orders(locale:${locale}, fallbackLocale:en, where: { id: { equals: $id}}) {
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
