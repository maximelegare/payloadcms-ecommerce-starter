import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'
import { Locale } from '@@/i18nConfig'

export const PAGES = (locale: Locale) => `
query Pages  {
  Pages(locale:${locale}, fallbackLocale:en, limit: 300, where: { slug: { not_equals: "cart" } })  {
    docs {
      slug
    }
  }
}
`

export const PAGE = (locale: Locale) => `
query Page($slug: String, $draft: Boolean) {
  Pages(locale:${locale}, fallbackLocale:en, where: { AND: [{ slug: { equals: $slug }}] }, limit: 1, draft: $draft) {
    docs {
      id
      title
      hero {
        type
        richText
        links {
          link ${LINK_FIELDS()}
        }
        ${MEDIA}
      }
      layout {
        ${CONTENT}
        ${CALL_TO_ACTION}
        ${CONTENT}
        ${MEDIA_BLOCK}
        ${ARCHIVE_BLOCK}
      }
      ${META}
    }
  }
}
`
