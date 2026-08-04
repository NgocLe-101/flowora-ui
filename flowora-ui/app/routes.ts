import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
    layout("pages/_layout.tsx", [
        index("pages/home/index.tsx")
    ])

] satisfies RouteConfig;
