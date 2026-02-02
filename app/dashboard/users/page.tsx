"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { fetchUsers } from "@/lib/api";
import { User } from "@/types/user";
import StatCard from "@/components/dashboard/StatCard";
import UserTable from "@/components/users/UserTable";
import styles from "./users.module.scss";

const LENDSQR_USERS_KEY = "lendsqr_users_data";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const cachedData = localStorage.getItem(LENDSQR_USERS_KEY);
        if (cachedData) {
          setUsers(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        const data = await fetchUsers();
        if (!data || data.length === 0) throw new Error("No data received");
        localStorage.setItem(LENDSQR_USERS_KEY, JSON.stringify(data));
        setUsers(data);
      } catch (err) {
        setError("Unable to load user records. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return users.slice(indexOfFirstItem, indexOfLastItem);
  }, [users, currentPage, itemsPerPage]);

  // Logic to determine which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      // Always show page 1
      pageNumbers.push(1);

      if (currentPage > 3) pageNumbers.push("...");

      // Show neighbors of current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning or end
      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;

      for (let i = start; i <= end; i++) {
        if (!pageNumbers.includes(i)) pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push("...");

      // Always show last page
      if (!pageNumbers.includes(totalPages)) pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
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
        <StatCard title="USERS" count={users.length.toString()} type="users" />
        <StatCard title="ACTIVE USERS" count="453" type="active" />
        <StatCard title="USERS WITH LOANS" count="153" type="loans" />
        <StatCard title="USERS WITH SAVINGS" count="53" type="savings" />
      </div>

      <UserTable data={currentItems} />

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
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={styles.arrow}
          >
            <Image
              src="/assets/np_prev.svg"
              alt="prev"
              width={14}
              height={14}
            />
          </button>

          {getPageNumbers().map((p, index) =>
            p === "..." ? (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            ) : (
              <button
                key={p}
                className={currentPage === p ? styles.activePage : ""}
                onClick={() => setCurrentPage(Number(p))}
              >
                {p}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
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
