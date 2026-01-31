"use client";

import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import styles from "./Topbar.module.scss";
import Link from "next/link";

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Topbar({
  onToggleSidebar,
  isSidebarOpen,
}: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button
            className={styles.mobileMenuBtn}
            onClick={onToggleSidebar}
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/dashboard" className={styles.logo}>
            <Image
              src="/assets/logo2.png"
              alt="Lendsqr"
              width={145}
              height={30}
              priority
              className={styles.logoImg}
            />
          </Link>

          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search for anything" />
            <button className={styles.searchBtn}>
              <Search size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <Link href="#" className={styles.docs}>
            Docs
          </Link>

          <div className={styles.notificationWrapper}>
            <Image
              src="/assets/notification.svg"
              alt="Notifications"
              width={20}
              height={20}
            />
          </div>

          <div className={styles.userProfile}>
            <div className={styles.avatarWrapper}>
              <Image
                src="/assets/avatar.png"
                alt="Adedeji"
                width={40}
                height={40}
                className={styles.avatar}
              />
            </div>
            <span className={styles.userName}>Adedeji</span>

            <Image
              src="/assets/dropdown.svg"
              alt="Dropdown"
              width={18}
              height={18}
              className={styles.chevron}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
