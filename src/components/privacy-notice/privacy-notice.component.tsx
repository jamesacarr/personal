import Link from 'next/link';
import type { FC } from 'react';

import styles from './styles.module.css';

export const PrivacyNotice: FC = () => (
  <div className={styles.wrapper}>
    <nav aria-label="Site" className={styles.bar}>
      <div className={styles.column}>
        <Link className={styles.homeLink} href="/">
          Back to home
        </Link>
      </div>
    </nav>

    <div className={styles.content}>
      <article className={`${styles.column} ${styles.notice}`}>
        <h1>Privacy</h1>
        <p>
          This page explains what happens to the details you send through the
          contact form on this site.
        </p>

        <h2>What I collect</h2>
        <p>
          Your name, email address and message. They&apos;re collected only when
          you submit the contact form.
        </p>

        <h2>Where it goes</h2>
        <p>
          The site checks the submission, strips any HTML from it and sends it
          to Zapier. Zapier forwards it to my Gmail inbox as an email. Copies
          then exist in two places: Zapier&apos;s run history and my mailbox.
        </p>

        <h2>What I use it for</h2>
        <p>
          Replying to your message, and nothing else. I don&apos;t sell it or
          share it with anyone.
        </p>

        <h2>What I don&apos;t collect</h2>
        <p>
          This site sets no cookies and runs no analytics or third-party
          scripts. The hosting provider, Vercel, keeps standard request logs
          (such as IP address and the page requested), as any web host does.
        </p>

        <h2>Who receives it and how long it&apos;s kept</h2>
        <ul>
          <li>
            Zapier keeps a copy in its run history for a limited period under
            its own{' '}
            <a
              className={styles.link}
              href="https://zapier.com/legal/data-retention-deletion"
              rel="noreferrer"
            >
              data retention and deletion policy
            </a>
            .
          </li>
          <li>
            Gmail stores the forwarded email under{' '}
            <a
              className={styles.link}
              href="https://policies.google.com/privacy"
              rel="noreferrer"
            >
              Google&apos;s privacy policy
            </a>
            .
          </li>
          <li>
            The forwarded email stays in my inbox indefinitely unless I delete
            it. I delete it on request.
          </li>
        </ul>

        <h2>Deletion and questions</h2>
        <p>
          To have your message deleted, or to ask anything about this page, send
          a message through{' '}
          <Link className={styles.link} href="/#contact">
            the contact form
          </Link>
          .
        </p>

        <p className={styles.updated}>
          Last updated <time dateTime="2026-11-16">16 November 2026</time>
        </p>
      </article>
    </div>
  </div>
);
