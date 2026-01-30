"use client";
import Image from "next/image";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  title: string;
  count: string;
  type: "users" | "active" | "loans" | "savings";
}

const config = {
  users: {
    iconName: "np_users2", // Ensure this matches /public/icons/icon-users.svg
    className: styles.users,
  },
  active: {
    iconName: "np_users",
    className: styles.active,
  },
  loans: {
    iconName: "usersloans",
    className: styles.loans,
  },
  savings: {
    iconName: "userssavings",
    className: styles.savings,
  },
};

export default function StatCard({ title, count, type }: StatCardProps) {
  const { iconName, className } = config[type];

  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrapper} ${className}`}>
        <Image
          src={`/assets/${iconName}.svg`}
          alt={title}
          width={22}
          height={22}
        />
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
