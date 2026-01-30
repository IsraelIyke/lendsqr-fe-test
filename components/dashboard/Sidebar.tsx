"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/navigation";

// Helper component for your Figma SVGs
const Icon = ({ name }: { name: string }) => (
  <Image
    src={`/assets/${name}.svg`}
    alt=""
    width={16}
    height={16}
    className={styles.sidebarIcon}
  />
);

const menuItems = [
  {
    title: "CUSTOMERS",
    items: [
      { name: "Users", icon: <Icon name="users" />, path: "/dashboard/users" },
      { name: "Guarantors", icon: <Icon name="guarantor" />, path: "#" },
      { name: "Loans", icon: <Icon name="loans" />, path: "#" },
      {
        name: "Decision Models",
        icon: <Icon name="models" />,
        path: "#",
      },
      { name: "Savings", icon: <Icon name="piggy-bank" />, path: "#" },
      { name: "Loan Requests", icon: <Icon name="loan" />, path: "#" },
      { name: "Whitelist", icon: <Icon name="whitelist" />, path: "#" },
      { name: "Karma", icon: <Icon name="karma" />, path: "#" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { name: "Organization", icon: <Icon name="organization" />, path: "#" },
      { name: "Loan Products", icon: <Icon name="loan" />, path: "#" },
      {
        name: "Savings Products",
        icon: <Icon name="savings" />,
        path: "#",
      },
      {
        name: "Fees and Charges",
        icon: <Icon name="charges" />,
        path: "#",
      },
      { name: "Transactions", icon: <Icon name="transactions" />, path: "#" },
      { name: "Services", icon: <Icon name="services" />, path: "#" },
      {
        name: "Service Account",
        icon: <Icon name="service" />,
        path: "#",
      },
      { name: "Settlements", icon: <Icon name="settlements" />, path: "#" },
      { name: "Reports", icon: <Icon name="reports" />, path: "#" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Preferences", icon: <Icon name="preferences" />, path: "#" },
      {
        name: "Fees and Pricing",
        icon: <Icon name="fees" />,
        path: "#",
      },
      { name: "Audit Logs", icon: <Icon name="audit" />, path: "#" },
      { name: "Systems Messages", icon: <Icon name="system" />, path: "#" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOrgOpen, setIsOrgOpen] = useState(false);

  const router = useRouter();
  return (
    <aside className={styles.sidebar}>
      {/* 1. Switch Organization */}
      <div
        className={styles.switchOrg}
        onClick={() => setIsOrgOpen(!isOrgOpen)}
      >
        <Icon name="briefcase" />
        <span>Switch Organization</span>
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${isOrgOpen ? styles.rotate : ""}`}
        />
      </div>

      {isOrgOpen && (
        <div className={styles.orgDropdown}>
          <div className={styles.orgItem}>Lendsqr</div>
        </div>
      )}

      {/* 2. Dashboard Link */}
      <div className={styles.dashboardLink}>
        <Link
          href="#"
          className={`${styles.navItem} ${pathname === "/dashboard" ? styles.active : ""}`}
        >
          <Icon name="dashboard" /> <span>Dashboard</span>
        </Link>
      </div>

      {/* 3. Categorized Menu */}
      <div className={styles.menuContainer}>
        {menuItems.map((section) => (
          <div key={section.title} className={styles.section}>
            <p className={styles.label}>{section.title}</p>
            {section.items.map((item) => {
              // Ensure we check if path is not # before showing active state
              const isActive =
                item.path !== "#" && pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                >
                  {item.icon} <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* 4. Logout & Footer */}
      <div className={styles.logoutSection}>
        <button
          className={styles.logoutBtn}
          onClick={() => router.push("/login")}
        >
          <Icon name="logout" /> <span>Logout</span>
        </button>
        <div className={styles.version}>v1.2.0</div>
      </div>
    </aside>
  );
}
