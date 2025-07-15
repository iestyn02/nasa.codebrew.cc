import { type RouteConfig, route, index } from '@react-router/dev/routes';

const base = import.meta.env.VITE_BASE_PATH;

export default [
    index('routes/home.tsx'),
    route(`/apod`, 'routes/apod.tsx'),
    route(`/images`, 'routes/images/page.tsx'),
    route(`/images/:id`, 'routes/images/[id].tsx'),
    route(`/moon`, 'routes/moon.tsx'),
    route(`/snapshot`, 'routes/snapshot/page.tsx'),
    route(`/snapshot/fetch`, 'routes/snapshot/fetch.tsx')
] satisfies RouteConfig;
