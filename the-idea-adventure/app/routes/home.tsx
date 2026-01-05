import type { Route } from "./+types/home";
import Hero from "../components/hero.tsx";
import SignIn from "./signIn.tsx";
import { HomePageContent } from "~/content/HomePageContent.tsx";
import Nav from "~/components/nav.tsx";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Idea Adventure" },
    { name: "description", content: "a Good Solution, Requires Ideas" },
  ];
}

export default function Home() {
  return (<>
  <Nav />
    <Hero/>
  </>
);
}
