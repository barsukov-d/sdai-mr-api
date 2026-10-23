import { test } from "node:test"
import assert from "node:assert"
import { items } from "./server.js"
test("items are listed", () => { assert.ok(items.length >= 1) })
