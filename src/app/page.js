import styles from "./page.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <div className={styles.document}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src="/34_24_08_19 (2).mp4" type="video/mp4" />
      </video>

      <div className={styles.container}>
        <nav className={styles.topnav}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/image-processing" className={styles.link}>
            Processing
          </Link>
          {user ? (
            <Link
              href="/api/auth/logout"
              className={`${styles.link} ${styles.signin}`}
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/api/auth/login?returnTo=/image-processing"
              className={`${styles.link} ${styles.signin}`}
            >
              Login
            </Link>
          )}
        </nav>

        <div>
          <h1 className={styles.header}>WELCOME!</h1>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h2>Learn</h2>
            <p>Discover ways to conserve water and protect the environment.</p>
          </div>
          <div className={styles.feature}>
            <h2>Engage</h2>
            <p>
              Join a community committed to sustainability and eco-friendly
              practices.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>Take Action</h2>
            <p>Find resources and tools to help you make a positive impact.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
