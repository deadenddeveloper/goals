export default {
    debug: process.env.NODE_ENV !== 'production',
    supportedLngs: ['en', 'de', 'ru'],
    fallbackLng: 'en',
    defaultNS: 'common',
    react: { useSuspense: false },
}
