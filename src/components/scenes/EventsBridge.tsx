import styles from "./EventsBridge.module.css";

function OrbitMark() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 148 148"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="74" cy="74" r="55.5" />
      <circle cx="74" cy="74" r="37.5" />
      <circle cx="74" cy="74" r="7" />
      <path d="M8 74h30m72 0h30M74 8v30m0 72v30" />
      <path d="m28 28 22 22m48 48 22 22M120 28 98 50M50 98l-22 22" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 19 19 5m-7 0h7v7" />
    </svg>
  );
}

export function EventsBridge() {
  return (
    <section
      aria-labelledby="events-title"
      className={styles.eventsBridge}
      data-scene="events"
      id="events"
    >
      <div aria-hidden="true" className={styles.leftOrbit}>
        <OrbitMark />
      </div>
      <div aria-hidden="true" className={styles.rightOrbit}>
        <OrbitMark />
      </div>

      <div className={styles.composition}>
        <div className={styles.copy}>
          <p aria-hidden="true" className={styles.eyebrow}>
            <span />
            <i />
            <span />
          </p>
          <h2 id="events-title">
            Встречи <em>и события</em>
          </h2>
          <p className={styles.message}>
            Афишу и ближайшие встречи уточняйте в сообществе
          </p>
        </div>

        <a
          aria-label="Открыть сообщество VK в новой вкладке"
          className={styles.communityLink}
          data-external-link="true"
          href="https://vk.ru/samaratochkaprityazheniya"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span>Сообщество VK</span>
          <ExternalArrow />
        </a>
      </div>
    </section>
  );
}
