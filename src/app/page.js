import styles from "./home.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <div className={styles.wrapper}>
      {/* Section 1 */}
      <section id="section1" className={styles.section}>
        <div className={styles.document}>
          <video autoPlay loop muted className={styles.backgroundVideo}>
            <source src="/34_24_08_19 (2).mp4" type="video/mp4" />
          </video>

          <div className={styles.container}>
            <nav className={styles.topnav}>
              <Link href="/" className={styles.logoContainer}>
                <img className={styles.img} src="/logo.png" alt="Logo" />
                <div className={styles.brand}>
                  <h2 className={styles.firstbrand}>Green</h2>
                  <h2 className={styles.secondbrand}>Scan</h2>
                </div>
              </Link>
              <div className={styles.navLinks}>
                <Link
                  href="/image-processing"
                  className={`${styles.link} ${styles.processing}`}
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
              </div>
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
      </section>

      {/* Section 2 */}
      <section id="section2" className={`${styles.section} ${styles.newsSection}`}>
  <h1 className={styles.newsHeader}>Latest News on Garbage Cleanup and Recycling</h1>
  <div className={styles.newsGrid}>
    <div className={styles.newsItem}>
      <img src="./community.jpg" alt="Community Cleanup" className={styles.newsImage} />
      <div className={styles.newsContent}>
        <p className={styles.newsDate}>14 October</p>
        <h2 className={styles.newsTitle}>Community Cleanup Drives Increase in Local Parks</h2>
        <p>Efforts by volunteers are making a big impact on local ecosystems.</p>
        <a href="https://example.com/community-cleanup" target="_blank" rel="noopener noreferrer" className={styles.newsLink}>Read More</a>
      </div>
    </div>

    <div className={styles.newsItem}>
      <img src="./initiative.jpg" alt="Recycling Initiatives" className={styles.newsImage} />
      <div className={styles.newsContent}>
        <p className={styles.newsDate}>6 September</p>
        <h2 className={styles.newsTitle}>New Recycling Initiatives Launched by City Council</h2>
        <p>The city introduces recycling programs to reduce landfill waste.</p>
        <a href="https://example.com/recycling-initiatives" target="_blank" rel="noopener noreferrer" className={styles.newsLink}>Read More</a>
      </div>
    </div>

    <div className={styles.newsItem}>
      <img src="./cleanup.jpg" alt="Beach Cleanup" className={styles.newsImage} />
      <div className={styles.newsContent}>
        <p className={styles.newsDate}>16 August</p>
        <h2 className={styles.newsTitle}>School Students Participate in Beach Cleanup</h2>
        <p>Students help clear plastic waste from local beaches.</p>
        <a href="https://example.com/beach-cleanup" target="_blank" rel="noopener noreferrer" className={styles.newsLink}>Read More</a>
      </div>
    </div>

    <div className={styles.newsItem}>
      <img src="./building.jpg" alt="Recycling Plant" className={styles.newsImage} />
      <div className={styles.newsContent}>
        <p className={styles.newsDate}>22 July</p>
        <h2 className={styles.newsTitle}>Innovative Recycling Plant Opens in Downtown</h2>
        <p>This new plant promises to recycle 70% of incoming waste.</p>
        <a href="https://example.com/recycling-plant" target="_blank" rel="noopener noreferrer" className={styles.newsLink}>Read More</a>
      </div>
    </div>
  </div>
</section>











      {/* Section 3 */}
      <section id="section3" className={styles.section}>
        {/* Add custom content for Section 3 */}
      </section>

      {/* Section 4 */}
      <section id="section4" className={styles.section}>
        {/* Add custom content for Section 4 */}
      </section>
    </div>
  );
}
