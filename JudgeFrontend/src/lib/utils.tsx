export function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Used for determining route (Used in Navbar)
export type AppRoute = "/" | "/history" | "/scoreboard" | "/dashboard";
export const ROUTE_TITLES: Record<AppRoute, string> = {
    "/": "Home",
    "/history": "History",
    "/scoreboard": "Scoreboard",
    "/dashboard": "Dashboard",
};
