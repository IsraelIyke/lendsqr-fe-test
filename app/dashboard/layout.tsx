import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import styles from "./layout.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lendsqr Test App Dashboard",
  description: "A test application for Lendsqr built with React.js",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <Topbar />
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
