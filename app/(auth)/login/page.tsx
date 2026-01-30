"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  // state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/users");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/logo2.png"
            alt="Lendsqr"
            width={170}
            height={30}
            priority
          />
        </Link>
        <div className={styles.heroWrapper}>
          <Image
            src="/assets/pablo-sign-in.svg"
            alt="Login Illustration"
            width={600}
            height={400}
          />
        </div>
      </div>
      <div className={styles.rightPane}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <input type="email" placeholder="Email" required />
            </div>

            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
            <p className={styles.forgot}>FORGOT PASSWORD?</p>
          </div>
          <button type="submit" className={styles.submitBtn}>
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
