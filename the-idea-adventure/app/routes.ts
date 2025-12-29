import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
  route('api/auth/*', 'routes/auth.ts'),
  route('/project-info', 'routes/projectInformation.tsx'),
  route('/navplaygame', 'routes/navplaygame.tsx'),
  layout('./routes/shell.tsx', [
		route('/game', 'routes/game/index.tsx'),
		route('/game/user/updateFlags', 'routes/game/user/updateFlags.tsx'), 
	]),
] satisfies RouteConfig;
