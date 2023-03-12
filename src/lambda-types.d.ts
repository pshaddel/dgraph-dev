/* eslint-disable @typescript-eslint/no-explicit-any */
export type GraphQLResponse = {
  data?: Record<string, any>;
  errors?: { message: string }[];
};

export type AuthHeaderField = {
  key: string | undefined;
  value: string | undefined;
};

export type InfoField = {
  field: selectionField;
};

export type selectionField = {
  alias: string;
  name: string;
  arguments: Record<string, any>;
  directives: fldDirectiveList;
  selectionSet: selectionSet;
};

export type selectionSet = Array<selectionField>;

export type fldDirectiveList = Array<fldDirective>;

export type fldDirective = {
  name: string;
  arguments: Record<string, any>;
};

export type eventPayload = {
  __typename: string;
  operation: string;
  commitTs: number;
  add: addEvent | undefined;
  update: updateEvent | undefined;
  delete: deleteEvent | undefined;
};

export type addEvent = {
  add: {
    rootUIDs: Array<any>;
    input: Array<any>;
  };
};

export type updateEvent = {
  update: {
    rootUIDs: Array<any>;
    SetPatch: any;
    RemovePatch: any;
  };
};

export type deleteEvent = {
  delete: {
    rootUIDs: Array<any>;
  };
};

export type GraphQLEventFields = {
  type: string;
  parents: Record<string, any>[] | null;
  args: Record<string, any>;
  authHeader?: AuthHeaderField;
  event?: eventPayload;
  info?: InfoField;
};

export type ResolverResponse = any[] | Promise<any>[] | Promise<any[]>;

export type GraphQLEventCommonFields = {
  type: string;
  respondWith: (r: ResolverResponse) => void;
  graphql: (
    s: string,
    vars: Record<string, any> | undefined,
    ah?: AuthHeaderField
  ) => Promise<GraphQLResponse>;
  dql: {
    query: (
      s: string,
      vars: Record<string, any> | undefined
    ) => Promise<GraphQLResponse>;
    mutate: (s: string) => Promise<GraphQLResponse>;
  };
  authHeader?: AuthHeaderField;
};

export type GraphQLEvent = GraphQLEventCommonFields & {
  parents: Record<string, any>[] | null;
  args: Record<string, any>;
  info: InfoField;
};

export type WebHookGraphQLEvent = GraphQLEventCommonFields & {
  event?: eventPayload;
};

export type GraphQLEventWithParent = GraphQLEvent & {
  parent: Record<string, any> | null;
};

function addGraphQLResolvers(resolvers: {
  [key: string]: (e: GraphQLEventWithParent) => any;
}): void;

function addWebHookResolvers(resolvers: {
  [key: string]: (e: WebHookGraphQLEvent) => any;
}): void;

function addMultiParentGraphQLResolvers(resolvers: {
  [key: string]: (e: GraphQLEvent) => ResolverResponse;
}): void;

// Add some methods to the global object
declare global {
  interface Window {
    addGraphQLResolvers: typeof addGraphQLResolvers;
    addWebHookResolvers: typeof addWebHookResolvers;
    addMultiParentGraphQLResolvers: typeof addMultiParentGraphQLResolvers;
  }
}
