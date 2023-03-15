import assert from "node:assert";
import { mutation } from "./graphqlClient";
describe("Lambda", () => {
  it("should be able to create an Author by using lambda function", async () => {
    // Arrange
    // Act
    const mutationResult = await mutation({
      mutation: `mutation { newAuthor(name: "Ken Addams")}`,
      jwtPayload: { roles: "superadmin" }
    });
    // Assert
    assert.strictEqual(mutationResult.errors, undefined);
    assert.strictEqual(typeof mutationResult.data?.newAuthor, "string");
  });
});
