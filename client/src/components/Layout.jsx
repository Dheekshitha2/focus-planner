import { NavLink, Outlet } from "react-router-dom";

/**
 * linkStyle is a function that React Router calls for EACH <NavLink>
 * It passes in an object like: { isActive: true/false } 
 * - isActive = true when the NavLink's "to" matches the current URL.
 * We return a style object so the active link looks highlighted
 */

const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    borderRadius: 8,
    textDecoration: "none",
    color: isActive ? "white" : "#111",
    background: isActive ? "#111" : "transparent",
});

export default function Layout() {
    return (
        // Centered page container with a max width
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px" }}>
            <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Focus Planner</h2>
                <nav style={{ display: "flex", gap: 8 }}>
                    { /* Nav links (active links gets highlighted by linkStyle) */}
                    <NavLink to="/today" style={linkStyle}>Today</NavLink>
                    <NavLink to="/topics" style={linkStyle}>Topics</NavLink>
                    <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
                </nav>
            </header>

            {/* Outlet is where the current page (Today/Topics/Settings) renders */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}
