// server.ts

const server = Bun.serve({
  port: 3000,

  fetch(req) {
    const url = new URL(req.url)

    // Only allow GET
    if (req.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          "Allow": "GET"
        }
      })
    }

    // Example route
    if (url.pathname === "/") {
      return new Response("Hello from Bun GET server")
    }

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response("Not Found", { status: 404 })
  }
})

console.log(`Server running on http://localhost:${server.port}`)