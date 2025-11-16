import { headers } from "next/headers";

export const getRootAPIURL = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const rootURL = `${protocol}://${host}`;

  //   console.log("host ==> ", host);
  //   console.log("protocol ==> ", protocol);
  //   console.log("process.env.NODE_ENV ==> ", process.env.NODE_ENV);
  //   console.log("rootURL ==> ", rootURL);

  return rootURL;
};
