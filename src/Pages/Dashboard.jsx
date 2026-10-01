import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const [search, setSearch] = useState("");

  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "10px",
    marginBottom: "8px",
    background: isActive
      ? "linear-gradient(90deg, #9333ea, #d946ef)"
      : "transparent",
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          background:
            "linear-gradient(180deg, #581c87 0%, #312e81 50%, #111827 100%)",
          color: "white",
          minHeight: "100vh",
          padding: "30px 20px",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* LOGO */}
        <div style={{ marginBottom: "45px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#ffffff",
            }}
          >
            Movie<span style={{ color: "#c084fc" }}>Hub</span>
          </h1>

          <p
            style={{
              marginTop: "6px",
              color: "#d8b4fe",
              fontSize: "13px",
            }}
          >
            Movie Explorer
          </p>
        </div>

        {/* MAIN NAVIGATION */}
        <nav>
          <p
            style={{
              color: "#c4b5fd",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "15px",
              fontWeight: "600",
            }}
          >
            Menu
          </p>

          <NavLink to="/" end style={navLinkStyle}>
            🏠 Home
          </NavLink>

          <NavLink to="/shorts" style={navLinkStyle}>
            🎬 Shorts
          </NavLink>

          <NavLink to="/tv-Shows" style={navLinkStyle}>
            📺 TV Shows
          </NavLink>

          {/* GENRES */}
          <div style={{ marginTop: "30px" }}>
            <p
              style={{
                color: "#c4b5fd",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              Genres
            </p>

            <NavLink
              to="/?genre=Drama"
              style={{
                display: "block",
                color: "#f3e8ff",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "5px",
              }}
            >
              🎭 Drama
            </NavLink>

            <NavLink
              to="/?genre=Action"
              style={{
                display: "block",
                color: "#f3e8ff",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "5px",
              }}
            >
              ⚡ Action
            </NavLink>

            <NavLink
              to="/?genre=Comedy"
              style={{
                display: "block",
                color: "#f3e8ff",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "5px",
              }}
            >
              😂 Comedy
            </NavLink>
          </div>
        </nav>

        {/* PROFILE */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(196, 132, 252, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #a855f7, #d946ef, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              M
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Michael
              </p>

              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: "12px",
                  color: "#c4b5fd",
                }}
              >
                Movie Explorer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <div
        style={{
          minWidth: 0,
          background: "#020617",
          color: "#ffffff",
        }}
      >
        {/* NAVBAR */}
        <header
          style={{
            height: "80px",
            background: "#0f172a",
            color: "#ffffff",
            padding: "0 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #1e293b",
            boxSizing: "border-box",
          }}
        >
          {/* SEARCH */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#1e293b",
              borderRadius: "10px",
              padding: "0 16px",
              width: "280px",
              height: "42px",
              color: "#e2e8f0",
            }}
          >
            <span style={{ marginRight: "8px" }}>🔍</span>

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#ffffff",
                fontSize: "14px",
              }}
            />
          </div>

          {/* NAVBAR ACTIONS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <span style={{ color: "#e2e8f0" }}>♡ Favorites</span>

            <span style={{ color: "#e2e8f0" }}>◷ History</span>

            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #9333ea, #d946ef)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              M
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main
          style={{
            color: "#ffffff",
          }}
        >
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
