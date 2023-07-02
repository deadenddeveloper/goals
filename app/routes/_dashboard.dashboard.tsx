import type { LoaderArgs } from '@remix-run/node'

import { json } from '@remix-run/router'
import { Link, useLoaderData } from '@remix-run/react'
import { getUid } from '~/services/auth'
import { Box, Button, Text } from '@chakra-ui/react'
import { getGoals } from '~/services/goals'
import { route } from '~/services/routes'

export async function loader({ request }: LoaderArgs) {
    return json(await getGoals((await getUid(request)) as string))
}

const Dashboard = () => {
    const data = useLoaderData<typeof loader>()

    if (!data.length) {
        return (
            <Box>
                <Text>No goals yet</Text>
                <Link to={route('goalCreate')}>
                    <Button>Create</Button>
                </Link>
            </Box>
        )
    }

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Dashboard
