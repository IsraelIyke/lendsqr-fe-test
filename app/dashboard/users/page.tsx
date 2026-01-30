"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { fetchUsers } from "@/lib/api";
import { User } from "@/types/user";
import StatCard from "@/components/dashboard/StatCard";
import UserTable from "@/components/users/UserTable";
import styles from "./users.module.scss";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUsers()
      .then((data) => {
        if (!data) throw new Error("No data received");
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch users.");
        setLoading(false);
      });
  }, []);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return users.slice(indexOfFirstItem, indexOfLastItem);
  }, [users, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // 1. Graceful Error State
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <Image src="/icons/warning.svg" alt="Error" width={40} height={40} />
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryBtn}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Fetching users...</p>
      </div>
    );
  }

  return (
    <div className={styles.usersWrapper}>
      <h1>Users</h1>

      <div className={styles.statsGrid}>
        <StatCard title="USERS" count="500" type="users" />
        <StatCard title="ACTIVE USERS" count="453" type="active" />
        <StatCard title="USERS WITH LOANS" count="153" type="loans" />
        <StatCard title="USERS WITH SAVINGS" count="53" type="savings" />
      </div>

      <div>
        <UserTable data={currentItems} />
      </div>

      <div className={styles.paginationContainer}>
        <div className={styles.showingText}>
          Showing{" "}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 50, 100].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>{" "}
          out of {users.length}
        </div>

        <div className={styles.pages}>
          {/* 2. Swapped Lucide for SVG Arrows */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={styles.arrow}
          >
            <Image
              src="/assets/np_prev.svg"
              alt="prev"
              width={14}
              height={14}
            />
          </button>

          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                className={currentPage === p ? styles.activePage : ""}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ),
          )}

          {totalPages > 3 && <span className={styles.dots}>...</span>}
          {totalPages > 3 && (
            <button
              className={currentPage === totalPages ? styles.activePage : ""}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={styles.arrow}
          >
            <Image
              src="/assets/np_next.svg"
              alt="next"
              width={14}
              height={14}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
