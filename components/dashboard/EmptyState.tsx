import styles from "../../app/dashboard/users/[id]/UserDetails.module.scss";

export default function EmptyState() {
  return (
    <div className={styles.emptyContainer}>
      <p>Nothing here yet.</p>
    </div>
  );
}
