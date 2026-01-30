"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable or probably under construction.
        </p>

        <Link href="/dashboard/users" className={styles.backBtn}>
          <Image src="/icons/back-arrow.svg" alt="" width={20} height={10} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
