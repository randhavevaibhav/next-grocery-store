import { rootURL } from "@/lib/config";

export default async function Home() {
  const res = await fetch(`${rootURL}/api/hello`);
  const data = await res.json();
  console.log(`Res data ==> `, data);

  return (
    <div>
      Home
      <div className="p-2"></div>
    </div>
  );
}
