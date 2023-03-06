import dotenv from "dotenv";
dotenv.config();

const required = function (key, defaultValue = null) {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`${key} is not env defiend`);
  }
  return value;
}; // env 오류 예외 처리

export const dotconfig = {
  jwt: {},
  host: {
    port: required("NODE_PORT_ENV", 8000),
  },
  googleAuth: {
    id: required("GOOGLE_CLIENT_ID"),
    secret: required("GOOGLE_SECRET"),
  },
  db: {
    host: required("MYSQL_HOST"),
    user: required("MYSQL_USERNAME"),
    password: required("MYSQL_PASSWORD"),
    database: required("MYSQL_DATABASE"),
  },
};
