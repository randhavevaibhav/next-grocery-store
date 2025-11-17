import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

// import { getRootAPIURL } from "@/lib/config";
export const dynamic = "force-dynamic";

export default async function Home() {
  // const rootURL = await getRootAPIURL();
  // const res = await fetch(`${rootURL}/api/hello`);
  // const data = await res.json();
  // console.log(`Res data ==> `, data);
  // console.log(`Res data ==> `, await res.json());

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return <div>Home page</div>;
}
