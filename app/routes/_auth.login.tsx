import { useTranslation } from 'react-i18next'

const Login = () => {
    const { t } = useTranslation('common')

    return (
        <div>
            <h1>{t('title')}</h1>
        </div>
    )
}

export default Login
