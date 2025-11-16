import { getRootAPIURL } from "@/lib/config";

export default async function Home() {
  const rootURL = await getRootAPIURL();
  const res = await fetch(`${rootURL}/api/hello`);
  const data = await res.json();
  // console.log(`Res data ==> `, data);
  // console.log(`Res data ==> `, await res.json());

  return (
    <div>
      Home
      <div className="p-2"></div>
    </div>
  );
}
