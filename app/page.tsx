import { redirect } from "next/navigation";

// Nothing much here, just a redirect to the login route ;)
export default function Home() {
  redirect("/login");
}
