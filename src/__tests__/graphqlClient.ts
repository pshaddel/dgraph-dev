import axios from "axios";
import * as jwt from "jsonwebtoken";
const API_URL = "http://localhost:8080/graphql";
const dgraphConf = {
  VerificationKey: "qwertyuiopasdfghjklzxcvbnm123456",
  Header: "X-Auth-Token",
  Namespace: "https://dgraph.io/jwt/claims",
  Algo: "HS256"
};

const headerGenerator = (Role) => {
  const headers = {
    "Content-Type": "application/json"
  };
  headers[dgraphConf.Header] = jwt.sign(
    { ROLE: Role },
    dgraphConf.VerificationKey,
    { algorithm: dgraphConf.Algo }
  );
  return headers;
};

export const query = async ({
  functionName,
  query,
  variables,
  Role = "USER"
}: {
  functionName: string;
  query: string;
  variables?: Record<string, any>;
  Role?: string;
}) => {
  const result = await axios.post(
    API_URL,
    {
      query,
      variables
    },
    {
      headers: headerGenerator(Role)
    }
  );
  const data = result.data.data ? result.data.data[functionName] : null;
  const errors = result.data.errors;
  return { data, errors };
};

export const mutation = async (
  functionName,
  typeName,
  query,
  variables,
  Role = "USER"
) => {
  const result = await axios.post(
    API_URL,
    {
      query,
      variables
    },
    {
      headers: headerGenerator(Role)
    }
  );
  const data = result.data?.data[functionName]
    ? result.data.data[functionName][typeName]
    : result.data?.data[functionName];
  const errors = result.data.errors;
  return { data, errors };
};
