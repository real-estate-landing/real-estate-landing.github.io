import MainHeader from "./components/header/Header";
import Complex from "./components/complex/complex";
import Solution from "./components/solution/solution";
import Partners from "./components/partners/partners";
import Comments from "./components/comments/comments";
import Subscription from "./components/subscription/subscription";
import Faq from "./components/faq/faq";
import { useEffect } from "react";

export default function Main() {
  return (
    <main style={{ overflow: "hidden" }}>
      <MainHeader />
      <Complex />
      <Solution />
      <Partners />
      <Comments />
      <Subscription />
      <Faq />
    </main>
  );
}
