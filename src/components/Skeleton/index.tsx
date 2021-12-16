import styles from './styles.module.scss';

export const SkeletonSidebar = () => {
  return (
    <>
      <div className={styles.clounds_container}>
      </div>

      <div className={styles.infos_container}>
        <h1></h1>
        <h2></h2>
        <div>
        </div>
        <div>
        </div>
      </div>
    </>
  )
}

export const SkeletonDayCard = () => {
  return (
    <div className={styles.dayCard}>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
    </div>
  )
}

export const SkeletonHightlights = () => {
  return (
    <div className={styles.hightlights}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}