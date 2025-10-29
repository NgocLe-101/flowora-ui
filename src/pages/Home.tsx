import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-20 px-4">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        Digital space to get more done
      </h1>
      <p className="mt-6 text-lg text-gray-700 max-w-2xl">
        Relaxing live wallpaper, focus music, stopwatch, pomodoro timer, clock,
        notes, todo list, calendar, virtual co-working, and more.
      </p>
      <Button size="lg" className="mt-8 text-lg" asChild>
        <Link to="/signup">Start focusing</Link>
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        ❤️ Loved by 4,000,000+ users worldwide
      </p>
      {/* You would add the background image/video component here */}
    </div>
  )
}
