// app/image-processing/page.js
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ObjectDetection from "../../../components/object-detection";
import Link from "next/link";
import styles from "./image.module.css";

export default withPageAuthRequired(async function ImageProcessing(context) {
  const { user } = (await getSession(context.req, context.res)) || {};
  console.log("User data:", user);

  return (
    <div className={styles.container}>
      <nav className={styles.topnav}>
        <Link href="/" className={`${styles.link} ${styles.signin}`}>
          Home
        </Link>
        <Link
          href="/image-processing"
          className={`${styles.link} ${styles.signin}`}
        >
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

      <div className={styles.content}>
        <div className={styles.modelContainer}>
          <ObjectDetection />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Capture Image</button>
          <button className={styles.button}>Upload New Image</button>
          <button className={styles.button}>View Suggestions</button>
        </div>
      </div>
    </div>
  );
});
