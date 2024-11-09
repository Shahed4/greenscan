import styles from "./page.module.css";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <div className={styles.document}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src="/34_24_08_19 (2).mp4" type="video/mp4" />
      </video>
      <div className={styles.container}>
        <div className={styles.topnav}>
          {user ? (
            <a className={styles.signin} href="/api/auth/logout">
              Logout
            </a>
          ) : (
            <a
              className={styles.signin}
              href="/api/auth/login?returnTo=/image-processing"
            >
              Login
            </a>
          )}
        </div>
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
