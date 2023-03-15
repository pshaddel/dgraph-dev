import assert from "node:assert";
import { query } from "./graphqlClient";
describe("getUsers", () => {
  it("should return a list of users", async () => {
    const { data, errors } = await query({
      query: `query{queryUser {name}}`
    });
    assert.strictEqual(errors, undefined);
    assert.strictEqual(typeof data.queryUser, "object");
    assert.strictEqual(Array.isArray(data.queryUser), true);
  });
});
