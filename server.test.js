import { test } from "node:test"
import assert from "node:assert"
import { items, handle } from "./server.js"
test("items are listed", () => { assert.ok(items.length >= 1) })
test("GET /api/items returns price for each item", () => {
  const headers = {}
  let body = ""
  const res = { statusCode: 200, setHeader: (k, v) => { headers[k] = v }, end: (b) => { body = b } }
  handle({ url: "/api/items" }, res)
  assert.strictEqual(res.statusCode, 200)
  assert.strictEqual(headers["Content-Type"], "application/json")
  const data = JSON.parse(body)
  assert.ok(Array.isArray(data))
  for (const x of data) assert.strictEqual(typeof x.price, "number")
  assert.deepStrictEqual(data.map(({ id, title }) => ({ id, title })), [{ id: 1, title: "Первая запись" }, { id: 2, title: "Вторая запись" }])
  assert.strictEqual(data.find((x) => x.id === 1).price, 100)
  assert.strictEqual(data.find((x) => x.id === 2).price, 250)
})
test("GET /api/version returns version 1.0.0", () => {
  const headers = {}
  let body = ""
  const res = { statusCode: 200, setHeader: (k, v) => { headers[k] = v }, end: (b) => { body = b } }
  handle({ url: "/api/version" }, res)
  assert.strictEqual(res.statusCode, 200)
  assert.strictEqual(headers["Content-Type"], "application/json")
  assert.deepStrictEqual(JSON.parse(body), { version: "1.0.0" })
})
