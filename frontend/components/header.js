import {useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Logo from "../public/assets/logo.png";
import {
  faEye, faMobileScreen
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {

  const [result, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  const changeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    document.querySelector("#inputField").value = "";

    const response = await axios.get("http://localhost:5001/address", {
      params: { address: searchInput },
    });

    setResult(response.data.result);
  };

  return (
    <section className={styles.header}>
      <section className={styles.navbar}>
        <Image src={Logo} alt="Etherscan Logo" className={styles.logo} />
        <section className={styles.menu}>
        <section className={styles.input_section}>
            <input
              className={styles.inputField}
              type="text"
              id="inputField"
              name="inputField"
              maxLength="120"
              placeholder="Search by address / memo / Web3 ID"
              required
              onChange={changeHandler}
            />
            <button className={styles.btn} onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.magnifying}
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </section>
          <button className={styles.signIn}>
            Log in via web3 wallet
          </button>
          <p>
          <FontAwesomeIcon icon={faEye} />
          </p>
          <p>
          <FontAwesomeIcon icon={faMobileScreen} className={styles.svgIcons} />
          </p>
        </section>
      </section>
    </section>
  );
}
