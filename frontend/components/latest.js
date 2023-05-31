import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import styles from "@/styles/Home.module.css";


export default function LatestTransaction() {
  const [transactionsResult, setTransactionsResult] = useState([]);

  useEffect(() => {

    const getBlockInfo = async () => {
      const response = await axios.get(
        `http://localhost:5001/getblockinfo`,
        {}
      );

      setTransactionsResult(response.data.previousBlockInfo[0].transactions);
    };

    getBlockInfo();
  }, []);

  return (
    <section className={styles.heroSectionContainer}>
        <section>
          <section className={styles.latestResults_body}>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Transactions
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  {transactionsResult.map((txn) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${
                          transactionsResult.indexOf(txn) ==
                            transactionsResult.length - 1 && styles.lastTd
                        }`}
                        key={txn.transactionHash}
                      >

                        <td className={styles.tdBlock}>
                          <section className={styles.blueText}>
                            {txn.transactionHash?.slice(0, 14)}...
                          </section>
                          <section>
                            {moment(txn.time, "YYYYMMDD").fromNow()}
                          </section>
                        </td>
                        <td className={styles.tdFromTo}>
                          <section>
                            From{" "}
                            <span className={styles.blueText}>
                              {txn.fromAddress?.slice(0, 6)}...
                              {txn.fromAddress?.slice(36)}
                            </span>
                          </section>
                          <section>
                            To{" "}
                            <span className={styles.blueText}>
                              {txn.toAddress?.slice(0, 6)}...
                              {txn.toAddress?.slice(36)}
                            </span>
                            <span className={styles.blueText}>
                              {txn.totalTransactions}
                            </span>
                          </section>
                        </td>
                        <td className={styles.tdValue}>
                          {(Number(txn.value) / 10 ** 18).toFixed(4)} Eth
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </section>
        </section>
    </section>
  );
}
