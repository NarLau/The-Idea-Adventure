import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Hero from "../components/hero.tsx";
import SignIn from "./signIn.tsx";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Idea Adventure" },
    { name: "description", content: "a Good Solution, Requires Ideas" },
  ];
}

export default function Home() {
  return (<>
    <Hero/>
  <Welcome />
  <SignIn/>
  </>
);
}
