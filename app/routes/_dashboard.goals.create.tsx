import type { ActionArgs } from '@remix-run/node'

import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spacer,
    Stack,
    Textarea,
} from '@chakra-ui/react'
import { FormError } from '~/components/common'
import { useTranslation } from 'react-i18next'
import { route } from '~/services/routes'
import { getUid } from '~/services/auth'
import { createGoal } from '~/services/goals'

export const action = async ({ request }: ActionArgs) => {
    const uid = await getUid(request)

    // TODO data helper?
    const form = await request.formData()
    const title = form.get('title') as string
    const subtitle = form.get('subtitle') as string
    const description = form.get('description') as string
    const deadline = form.get('deadline') as string

    // TODO toast
    return await createGoal(uid as string, {
        title,
        subtitle,
        description,
        deadline,
    })
}

const GoalsCreate = () => {
    const { t } = useTranslation('goals')
    let actionData = useActionData()
    const navigation = useNavigation()

    // TODO validate
    const titleError = actionData?.title
    const subtitleError = actionData?.subtitle
    const descriptionError = actionData?.description
    const deadlineError = actionData?.deadline

    return (
        <Form method="post">
            <Stack spacing="4">
                <FormControl isInvalid={titleError}>
                    <FormLabel>{t('title')}</FormLabel>
                    <Input name="title" />
                    <FormError error={titleError} />
                </FormControl>

                <FormControl isInvalid={subtitleError}>
                    <FormLabel>{t('subtitle')}</FormLabel>
                    <Input name="subtitle" />
                    <FormError error={subtitleError} />
                </FormControl>

                <FormControl isInvalid={descriptionError}>
                    <FormLabel>{t('description')}</FormLabel>
                    <Textarea name="description" />
                    <FormError error={descriptionError} />
                </FormControl>

                <FormControl isInvalid={deadlineError}>
                    <FormLabel>{t('deadline')}</FormLabel>
                    <Input name="deadline" type="date" />
                    <FormError error={deadlineError} />
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
