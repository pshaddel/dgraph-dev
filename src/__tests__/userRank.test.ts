import assert from "node:assert";
import { mutation, query } from "./graphqlClient";
describe("userRank", () => {
  it("should be able to create a user rank with correct jwt payload", async () => {
    // Arrange
    // Fetch All Old UserRanks
    const result = await query({
      query: `query{queryUserRank {UserRankID}}`,
      jwtPayload: { roles: "superadmin" }
    });
    const ids: string[] = result.data.queryUserRank.map(
      (item) => item.UserRankID
    );
    // Delete All User Ranks
    await mutation({
      mutation: `mutation deleteAllUserRanks($ids: [ID!]){
        deleteUserRank(filter: { UserRankID: $ids}) {
          userRank {
            UserRankID
          }
          msg
          numUids
        }
      }`,
      variables: { ids },
      jwtPayload: { roles: "superadmin" }
    });
    // Act
    const { data, errors } = await mutation({
      mutation: `mutation {
        addUserRank(input: {
            rank: 1,
            user: {
              name: "test1",
              username: "poorshad"
            }
        }) {
          userRank {
            UserRankID
            rank
          }
        }
      }`,
      jwtPayload: { roles: "superadmin" }
    });
    // Assert
    assert.strictEqual(errors, undefined);
    assert.strictEqual(typeof data?.addUserRank?.userRank, "object");
    assert.strictEqual(Array.isArray(data?.addUserRank?.userRank), true);
    assert.strictEqual(data?.addUserRank?.userRank[0].rank, 1);
  });

  it("should not be able to create a user rank without correct roles", async () => {
    // Act
    const { data, errors } = await mutation({
      mutation: `mutation {
        addUserRank(input: {
            rank: 1,
            user: {
              name: "test1",
              username: "poorshad"
            }
        }) {
          userRank {
            UserRankID
            rank
          }
        }
      }`,
      jwtPayload: { roles: "someOtherroles" }
    });
    // Assert
    assert.strictEqual(data.addUserRank, null);
    assert.strictEqual(
      errors[0].message,
      "mutation failed because authorization failed"
    );
  });
});
