import type { LoaderFunctionArgs } from '@remix-run/node'
import type { IGoal } from '~/types/goals'

import { json } from '@remix-run/router'
import { Link, useLoaderData } from '@remix-run/react'
import { getUid } from '~/services/auth'
import { Box, Button, Text } from '@chakra-ui/react'
import { getGoals } from '~/services/goals'
import { route } from '~/services/routes'
import { Goal } from '~/components/goals/Goal'

export async function loader({ request }: LoaderFunctionArgs) {
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

    return data.map((goal: IGoal) => <Goal goal={goal} />)
}

export default Dashboard
