import styles from "@/styles/Home.module.css";
import Header from "../components/header.js";
import LatestTransaction from "../components/latest.js";
import Search from "../components/search.js";

export default function Home() {
  return (
      <section className={styles.main}>
        <Header />
        <Search />
        <LatestTransaction />
      </section>
  );
}
