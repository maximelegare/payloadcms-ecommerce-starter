import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { CATEGORIES } from './categories'
import { META } from './meta'
import { Locale } from '@@/i18nConfig'

export const PRODUCTS = (locale:Locale) => `
  query Products {
    Products(locale:${locale}, fallbackLocale:en, limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PRODUCT = (locale:Locale) => `
  query Product( $slug: String, $draft: Boolean) {
    Products(locale:${locale}, fallbackLocale:en, where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        title
        stripeProductID
        ${CATEGORIES}
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        priceJSON
        enablePaywall
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(locale:en, fallbackLocale:en,  where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
