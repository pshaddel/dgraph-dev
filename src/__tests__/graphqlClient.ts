import axios from "axios";
import * as jwt from "jsonwebtoken";
const API_URL = "http://localhost:8080/graphql";
const dgraphConf = {
  VerificationKey: "qwertyuiopasdfghjklzxcvbnm123456",
  Header: "X-Auth-Token",
  Namespace: "https://dgraph.io/jwt/claims",
  Algo: "HS256"
};

const headerGenerator = (
  payload: Record<string, string | number | null> = {}
) => {
  const headers = {
    "Content-Type": "application/json"
  };
  headers[dgraphConf.Header] = jwt.sign(payload, dgraphConf.VerificationKey, {
    algorithm: dgraphConf.Algo
  });
  return headers;
};

export const query = async ({
  query,
  variables,
  jwtPayload = {}
}: {
  query: string;
  variables?: Record<string, unknown>;
  jwtPayload?: Record<string, string | number | null>;
}) => {
  const result = await axios.post(
    API_URL,
    {
      query,
      variables
    },
    {
      headers: headerGenerator(jwtPayload)
    }
  );
  const data = result.data.data;
  const errors = result.data.errors;
  return { data, errors };
};

export async function mutation({
  mutation,
  variables,
  jwtPayload = {}
}: {
  mutation: string;
  variables?: unknown;
  jwtPayload?: Record<string, string | number | null>;
}) {
  const result = await axios.post(
    API_URL,
    {
      query: mutation,
      variables
    },
    {
      headers: headerGenerator(jwtPayload)
    }
  );
  const data = result.data?.data;
  const errors = result.data.errors;
  return { data, errors };
}
