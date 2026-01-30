"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";
import styles from "./UserTable.module.scss";

interface Props {
  data: User[];
}

export default function UserTable({ data }: Props) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  // 1. Filter State
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  // 2. Applied Filters State (what actually triggers the table update)
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Logic to extract unique organizations and statuses for the dropdowns
  const organizations = useMemo(
    () => Array.from(new Set(data.map((u) => u.orgName))),
    [data],
  );
  const statuses = useMemo(
    () => Array.from(new Set(data.map((u) => u.status))),
    [data],
  );

  // 4. Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      return (
        (appliedFilters.organization === "" ||
          user.orgName === appliedFilters.organization) &&
        user.userName
          .toLowerCase()
          .includes(appliedFilters.username.toLowerCase()) &&
        user.email.toLowerCase().includes(appliedFilters.email.toLowerCase()) &&
        user.phoneNumber.includes(appliedFilters.phoneNumber) &&
        (appliedFilters.status === "" ||
          user.status === appliedFilters.status) &&
        (appliedFilters.date === "" ||
          new Date(user.createdAt).toISOString().split("T")[0] ===
            appliedFilters.date)
      );
    });
  }, [data, appliedFilters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    setAppliedFilters(filters);
    setShowFilter(false);
  };

  const resetFilter = () => {
    const emptyFilters = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setShowFilter(false);
  };

  return (
    <div className={styles.tableContainer}>
      {showFilter && (
        <div className={styles.filterPopup} ref={filterRef}>
          <div className={styles.filterGroup}>
            <label>Organization</label>
            <select
              name="organization"
              value={filters.organization}
              onChange={handleFilterChange}
            >
              <option value="">Select</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="User"
              value={filters.username}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={filters.email}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={filters.phoneNumber}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Select</option>
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterActions}>
            <button className={styles.resetBtn} onClick={resetFilter}>
              Reset
            </button>
            <button className={styles.filterBtn} onClick={applyFilter}>
              Filter
            </button>
          </div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            {[
              "ORGANIZATION",
              "USERNAME",
              "EMAIL",
              "PHONE NUMBER",
              "DATE JOINED",
              "STATUS",
            ].map((header) => (
              <th key={header} onClick={() => setShowFilter(!showFilter)}>
                <div className={styles.headerContent}>
                  {header}
                  <Image
                    src="/assets/filter-results-button.svg"
                    alt="filter"
                    width={14}
                    height={14}
                  />
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.orgName.toLowerCase()}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <span
                  className={`${styles.status} ${styles[user.status.toLowerCase()]}`}
                >
                  {user.status}
                </span>
              </td>
              <td className={styles.actionCell}>
                <div className={styles.actionWrapper}>
                  <Image
                    src="/assets/ic-more.svg"
                    alt="more"
                    width={20}
                    height={20}
                    onClick={() =>
                      setActiveMenuId(activeMenuId === user.id ? null : user.id)
                    }
                    className={styles.moreIcon}
                  />
                  {activeMenuId === user.id && (
                    <div className={styles.actionPopup} ref={menuRef}>
                      <Link href={`/dashboard/users/${user.id}`}>
                        <Image
                          src="/assets/view.svg"
                          alt="view"
                          width={16}
                          height={16}
                        />{" "}
                        View Details
                      </Link>
                      <button>
                        <Image
                          src="/assets/np_delete.svg"
                          alt="blacklist"
                          width={16}
                          height={16}
                        />{" "}
                        Blacklist User
                      </button>
                      <button>
                        <Image
                          src="/assets/np_user.svg"
                          alt="activate"
                          width={16}
                          height={16}
                        />{" "}
                        Activate User
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
