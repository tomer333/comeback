import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}
