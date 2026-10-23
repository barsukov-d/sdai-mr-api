import http from "node:http"
const port = Number(process.env.PORT || 3001)
export const items = [{ id: 1, title: "Первая запись", price: 100 }, { id: 2, title: "Вторая запись", price: 250 }]
export function handle(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("X-Service", "api")
  if (req.url === "/api/items") { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(items)); return }
  if (req.url === "/api/version") { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify({ version: "1.0.0" })); return }
  if (req.url === "/api/health") { res.end("ok"); return }
  res.statusCode = 404; res.end("not found")
}
if (process.argv[1] && process.argv[1].endsWith("server.js")) http.createServer(handle).listen(port, () => console.log(`api on ${port}`))
