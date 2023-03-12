import assert from "node:assert";
import { query } from "./graphqlClient";
describe("getUsers", () => {
  it("should return a list of users", async () => {
    const rnd = Math.floor(Math.random() * 5);
    const { data, errors } = await query({
      functionName: "queryUser",
      query: `query{queryUser(first: ${rnd}) {name}}`
    });
    assert.strictEqual(errors, undefined);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(Array.isArray(data), true);
  });
});
