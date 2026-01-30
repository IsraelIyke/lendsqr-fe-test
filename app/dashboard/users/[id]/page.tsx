"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUserById } from "@/lib/api";
import { User } from "@/types/user";
import { formatCurrency } from "@/lib/utils";
import styles from "./UserDetails.module.scss";
import Image from "next/image";
import EmptyState from "@/components/dashboard/EmptyState";

export default function UserDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("General Details");

  useEffect(() => {
    if (id) {
      setError(null);
      fetchUserById(id as string)
        .then((data) => {
          if (!data) throw new Error("Could not fetch data");
          setUser(data);
        })
        .catch(() => {
          setError("Unable to fetch user details.");
        });
    }
  }, [id]);

  // Graceful Network Error UI
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <span>⚠️</span>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Fetching user details...</p>
      </div>
    );
  }

  // Helper to render SVG stars
  const renderStars = (tier: number) => {
    return [1, 2, 3].map((star) => (
      <Image
        key={star}
        src={star <= tier ? "/assets/star.svg" : "/assets/nostar.svg"}
        alt="star"
        width={16}
        height={16}
      />
    ));
  };

  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  return (
    <div className={styles.wrapper}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        <Image src="/assets/np_back.svg" alt="back" width={25} height={25} />
        <span>Back to Users</span>
      </button>

      <div className={styles.header}>
        <h2>User Details</h2>
        <div className={styles.actionButtons}>
          <button className={styles.blacklist}>BLACKLIST USER</button>
          <button className={styles.activate}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={styles.topCard}>
        <div className={styles.mainInfo}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/assets/avatar2.png"
              alt="User Avatar"
              width={64}
              height={64}
            />
          </div>
          <div className={styles.nameSection}>
            <h3>{`${user.profile.firstName} ${user.profile.lastName}`}</h3>
            <p>{user.id.substring(0, 10)}</p>
          </div>
          <div className={styles.verticalDivider} />
          <div className={styles.tierSection}>
            <p>User's Tier</p>
            <div className={styles.stars}>{renderStars(user.userTier)}</div>
          </div>
          <div className={styles.verticalDivider} />
          <div className={styles.bankSection}>
            <h3>{formatCurrency(user.accountBalance)}</h3>
            <p>
              {user.accountNumber}/{user.bankName}
            </p>
          </div>
        </div>

        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <span
              key={tab}
              className={activeTab === tab ? styles.activeTab : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </nav>
      </div>

      <div className={styles.detailsContent}>
        {activeTab === "General Details" ? (
          <>
            {/* Personal Information */}
            <section className={styles.section}>
              <h4>Personal Information</h4>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>FULL NAME</label>
                  <p>{`${user.profile.firstName} ${user.profile.lastName}`}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>PHONE NUMBER</label>
                  <p>{user.phoneNumber}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>EMAIL ADDRESS</label>
                  <p>{user.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>BVN</label>
                  <p>{user.profile.bvn}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>GENDER</label>
                  <p>{user.profile.gender}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>MARITAL STATUS</label>
                  <p>{user.profile.maritalStatus}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>CHILDREN</label>
                  <p>{user.profile.children}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>TYPE OF RESIDENCE</label>
                  <p>{user.profile.typeOfResidence}</p>
                </div>
              </div>
            </section>

            <hr className={styles.horizontalDivider} />

            {/* Education and Employment */}
            <section className={styles.section}>
              <h4>Education and Employment</h4>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>LEVEL OF EDUCATION</label>
                  <p>{user.education.level}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>EMPLOYMENT STATUS</label>
                  <p>{user.education.employmentStatus}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>SECTOR OF EMPLOYMENT</label>
                  <p>{user.education.sector}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>DURATION OF EMPLOYMENT</label>
                  <p>{user.education.duration}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>OFFICE EMAIL</label>
                  <p>{user.education.officeEmail}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>MONTHLY INCOME</label>
                  <p>{`₦${user.education.monthlyIncome[0]} - ₦${user.education.monthlyIncome[1]}`}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>LOAN REPAYMENT</label>
                  <p>{user.education.loanRepayment}</p>
                </div>
              </div>
            </section>

            <hr className={styles.horizontalDivider} />

            {/* Socials */}
            <section className={styles.section}>
              <h4>Socials</h4>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>TWITTER</label>
                  <p>{user.socials.twitter}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>FACEBOOK</label>
                  <p>{user.socials.facebook}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>INSTAGRAM</label>
                  <p>{user.socials.instagram}</p>
                </div>
              </div>
            </section>

            <hr className={styles.horizontalDivider} />

            {/* Guarantor */}
            <section className={styles.section}>
              <h4>Guarantor</h4>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>FULL NAME</label>
                  <p>{user.guarantor.fullName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>PHONE NUMBER</label>
                  <p>{user.guarantor.phoneNumber}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>EMAIL ADDRESS</label>
                  <p>{user.guarantor.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>RELATIONSHIP</label>
                  <p>{user.guarantor.relationship}</p>
                </div>
              </div>
            </section>

            <hr className={styles.horizontalDivider} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
