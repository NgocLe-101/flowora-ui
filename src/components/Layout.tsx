import { Outlet } from "react-router";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  )
}
