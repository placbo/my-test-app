export default function About() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of our application.</p>

      <div style={{ margin: "20px 0" }}>
        <p>
          <strong>Current Date:</strong> {currentDate}
        </p>
        <button
          onClick={() => {
            throw new Error("This is your first error!");
          }}
        >
          Break the world
        </button>
      </div>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <svg
          width="300"
          height="250"
          viewBox="0 0 300 250"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            border: "2px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f0f8ff",
          }}
        >
          {/* Sky background */}
          <rect width="300" height="150" fill="#87CEEB" />

          {/* Ground */}
          <rect y="150" width="300" height="100" fill="#90EE90" />

          {/* Sun */}
          <circle cx="250" cy="40" r="20" fill="#FFD700" />

          {/* Red Barn */}
          <rect x="200" y="100" width="80" height="50" fill="#B22222" />
          <polygon points="200,100 240,70 280,100" fill="#8B0000" />

          {/* Big barn doors in the middle */}
          <rect x="225" y="120" width="30" height="30" fill="#654321" />
          <rect
            x="224"
            y="119"
            width="32"
            height="32"
            fill="none"
            stroke="#8B4513"
            strokeWidth="2"
          />
          <line
            x1="240"
            y1="120"
            x2="240"
            y2="150"
            stroke="#8B4513"
            strokeWidth="2"
          />
          <circle cx="233" cy="135" r="1.5" fill="#000" />
          <circle cx="247" cy="135" r="1.5" fill="#000" />

          {/* Small hay loft window */}
          <rect x="230" y="85" width="20" height="10" fill="#654321" />
          <rect
            x="229"
            y="84"
            width="22"
            height="12"
            fill="none"
            stroke="#8B4513"
            strokeWidth="1"
          />

          {/* Barn roof details */}
          <line
            x1="210"
            y1="110"
            x2="270"
            y2="110"
            stroke="#8B0000"
            strokeWidth="2"
          />

          {/* Side windows */}
          <rect x="205" y="115" width="8" height="8" fill="#4169E1" />
          <rect x="267" y="115" width="8" height="8" fill="#4169E1" />

          {/* Farmer's body */}
          <ellipse cx="150" cy="140" rx="25" ry="35" fill="#4169E1" />

          {/* Farmer's head */}
          <circle cx="150" cy="90" r="20" fill="#FDBCB4" />

          {/* Farmer's hat */}
          <ellipse cx="150" cy="75" rx="25" ry="8" fill="#8B4513" />
          <rect x="135" y="70" width="30" height="15" fill="#8B4513" />

          {/* Farmer's arms */}
          <ellipse cx="125" cy="120" rx="8" ry="20" fill="#FDBCB4" />
          <ellipse cx="175" cy="120" rx="8" ry="20" fill="#FDBCB4" />

          {/* Farmer's legs */}
          <ellipse cx="140" cy="180" rx="8" ry="25" fill="#4169E1" />
          <ellipse cx="160" cy="180" rx="8" ry="25" fill="#4169E1" />

          {/* Farmer's feet */}
          <ellipse cx="140" cy="205" rx="12" ry="6" fill="#8B4513" />
          <ellipse cx="160" cy="205" rx="12" ry="6" fill="#8B4513" />

          {/* Farmer's eyes */}
          <circle cx="145" cy="88" r="2" fill="#000" />
          <circle cx="155" cy="88" r="2" fill="#000" />

          {/* Farmer's smile */}
          <path
            d="M 145 95 Q 150 100 155 95"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />

          {/* Pig body */}
          <ellipse cx="80" cy="180" rx="30" ry="20" fill="#FFB6C1" />

          {/* Pig head */}
          <circle cx="80" cy="150" r="18" fill="#FFB6C1" />

          {/* Pig ears */}
          <ellipse cx="70" cy="140" rx="6" ry="10" fill="#FF69B4" />
          <ellipse cx="90" cy="140" rx="6" ry="10" fill="#FF69B4" />

          {/* Pig snout */}
          <ellipse cx="80" cy="155" rx="8" ry="6" fill="#FF69B4" />

          {/* Pig nostrils */}
          <circle cx="77" cy="155" r="1.5" fill="#000" />
          <circle cx="83" cy="155" r="1.5" fill="#000" />

          {/* Pig eyes */}
          <circle cx="75" cy="147" r="2" fill="#000" />
          <circle cx="85" cy="147" r="2" fill="#000" />

          {/* Pig legs */}
          <ellipse cx="65" cy="195" rx="4" ry="10" fill="#FFB6C1" />
          <ellipse cx="75" cy="195" rx="4" ry="10" fill="#FFB6C1" />
          <ellipse cx="85" cy="195" rx="4" ry="10" fill="#FFB6C1" />
          <ellipse cx="95" cy="195" rx="4" ry="10" fill="#FFB6C1" />

          {/* Pig tail */}
          <path
            d="M 110 175 Q 115 170 110 165 Q 105 170 110 175"
            stroke="#FFB6C1"
            strokeWidth="3"
            fill="none"
          />

          {/* Farm fence */}
          <rect x="10" y="160" width="3" height="30" fill="#8B4513" />
          <rect x="20" y="160" width="3" height="30" fill="#8B4513" />
          <rect x="30" y="160" width="3" height="30" fill="#8B4513" />
          <rect x="8" y="170" width="27" height="3" fill="#8B4513" />
          <rect x="8" y="180" width="27" height="3" fill="#8B4513" />
        </svg>
        <p style={{ marginTop: "10px", fontStyle: "italic", color: "#666" }}>
          Farmer Joe and his little pig friend
        </p>
      </div>
    </div>
  );
}
