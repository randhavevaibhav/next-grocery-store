import { getRootAPIURL } from "@/lib/config";

export default async function LoginPage() {
  const rootURL = await getRootAPIURL();

  console.log("rootURL ==> ", rootURL);
  return <div>Login Page</div>;
}
