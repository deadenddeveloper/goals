const routeMap = {
    home: '/',
    login: '/login',
    logout: '/logout',
    signup: '/signup',
    dashboard: '/dashboard',
    goalEdit: '/goals/edit',
    goalCreate: '/goals/create',
}

export const route = (routeName: keyof typeof routeMap): string => {
    if (!routeMap[routeName]) {
        throw new Error(`Route ${routeName} not found`)
    }

    return routeMap[routeName]
}
