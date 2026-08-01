const http = require("http");

const PORT = process.env.PORT || 5000;

// In-memory store for messages (swap for a real DB later if you want)
const messages = [];

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // POST /api/contact - receive a message from the portfolio's Contact form
  if (req.method === "POST" && req.url === "/api/contact") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      // Basic guard against huge payloads
      if (body.length > 1e6) req.destroy();
    });

    req.on("end", () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (err) {
        return sendJson(res, 400, { error: "Invalid JSON." });
      }

      const { name, email, message } = data;
      if (!name || !email || !message) {
        return sendJson(res, 400, { error: "Name, email, and message are all required." });
      }

      const entry = { name, email, message, receivedAt: new Date().toISOString() };
      messages.push(entry);
      console.log("New contact form submission:", entry);

      sendJson(res, 200, { success: true, message: "Message received. Thanks for reaching out!" });
    });
    return;
  }

  // GET /api/contact - view submissions (remove/protect this in production)
  if (req.method === "GET" && req.url === "/api/contact") {
    return sendJson(res, 200, messages);
  }

  sendJson(res, 404, { error: "Not found." });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});