// app/image-processing/page.js
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ObjectDetection from "../../../components/object-detection";
import Link from "next/link";
import styles from "../page.module.css";

export default withPageAuthRequired(async function ImageProcessing(context) {
  const { user } = (await getSession(context.req, context.res)) || {};
  console.log("User data:", user);

  return (
    <>
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
      <ObjectDetection />
    </>
  );
});
