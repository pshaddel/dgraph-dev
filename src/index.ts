import "@total-typescript/ts-reset";

self.addGraphQLResolvers({
  "Mutation.newAuthor": newAuthor
});

self.addWebHookResolvers({});

console.log("Lambda Loaded");

async function newAuthor({ args, graphql }) {
  // lets give every new author a reputation of 3 by default
  const results = await graphql(
    `
      mutation ($name: String!) {
        addAuthor(input: [{ name: $name, reputation: 3.0 }]) {
          author {
            id
            reputation
          }
        }
      }
    `,
    { name: args.name }
  );
  return results.data.addAuthor.author[0].id;
}
