import { useTranslation } from 'react-i18next'
import { Link, useMatches } from '@remix-run/react'

export const LangSwitcher = () => {
    const { i18n } = useTranslation()
    const langList = (i18n.options.supportedLngs as Array<string>).filter(
        (lang: string) => lang !== 'cimode'
    )

    const matches = useMatches()
    console.log('matches', matches)

    return (
        <div className="space-x-2">
            {langList?.map((lang: string) => (
                <Link
                    key={lang}
                    style={{
                        marginRight: 5,
                        fontWeight:
                            i18n.resolvedLanguage === lang ? 'bold' : 'normal',
                    }}
                    to={`?lng=${lang}`}
                >
                    {lang}
                </Link>
            ))}
        </div>
    )
}
