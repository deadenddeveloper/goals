import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spacer,
    Stack,
} from '@chakra-ui/react'
import { FormError } from '~/components/common'
import { useTranslation } from 'react-i18next'
import { route } from '~/services/routes'

const GoalsCreate = () => {
    const { t } = useTranslation('goals')
    let actionData = useActionData()
    const navigation = useNavigation()

    // TODO validate
    const titleError = actionData?.title

    return (
        <Form method="post">
            <Stack spacing="4">
                <FormControl isInvalid={titleError}>
                    <FormLabel>{t('title')}</FormLabel>
                    <Input name="title" />
                    <FormError error={titleError} />
                </FormControl>

                <Flex alignItems="center">
                    <Button
                        type="submit"
                        isLoading={navigation.state === 'submitting'}
                    >
                        {t('create_goal')}
                    </Button>
                    <Spacer />
                    <Link to={route('dashboard')}>
                        <Button variant="outline">{t('cancel')}</Button>
                    </Link>
                </Flex>
            </Stack>
        </Form>
    )
}

export default GoalsCreate
