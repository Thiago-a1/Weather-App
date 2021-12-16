import { useContext } from 'react';
import {TiLocationArrow} from 'react-icons/ti';

import { SearchContext } from '../../contexts/SearchContext';

import { convertTemp } from '../../utils/convertTemp';
import { convertDate } from '../../utils/convertDate';


import styles from './styles.module.scss';
import { SkeletonDayCard, SkeletonHightlights } from '../Skeleton';

export const Dashboard = () => {
  const { data, isLoading, measurement, handleMeasurement } = useContext(SearchContext);

  return (
    <section className={styles.dashboard}>
      <div className={styles.buttons_container}>
        <button 
          onClick={() => handleMeasurement('C')}
          style={{
            backgroundColor: `${measurement == 'C' ? '#E7E7EB' : ''}`, 
            color: `${measurement == 'C' ? '#110E3C' : ''}`}}
        >ºC</button>
        <button 
          onClick={() => handleMeasurement('F')}
          style={{
            backgroundColor: `${measurement == 'F' ? '#E7E7EB' : ''}`, 
            color: `${measurement == 'F' ? '#110E3C' : ''}`}}
        >ºF</button>
      </div>

      {isLoading ? <SkeletonDayCard /> : 
        <div className={styles.dayCards_container}>
          {data.forecast.forecastday.map(({date ,day}) => {
            return (
              <div className={styles.card} key={date}>
                <h1>{convertDate(date)}</h1>
                <img src={day.condition.icon} alt={day.condition.text} />
                <div className={styles.card_footer}>
                  <p>{convertTemp(day.maxtemp_c, measurement)}</p>
                  <p>{convertTemp(day.mintemp_c, measurement)}</p>
                </div>
              </div>
            )
          })}
        </div>
      }

      {isLoading ? <SkeletonHightlights /> :
        <div className={styles.hightlights}>
          <h1>Today's Hightlights</h1>
            <div className={styles.hightlights_card}>
              <h2>Wind status</h2>
              <h1>{data.current.wind_mph}<span> mph</span></h1>
              <div className={styles.wind}>
                <TiLocationArrow size="28" style={{transform: `rotate(${data.current.wind_degree -35}deg)`}}/>
                <p>{data.current.wind_dir}</p>
              </div>
            </div>
            <div className={styles.hightlights_card}>
              <h2>Humidity</h2>
              <h1>{data.current.humidity}<span>%</span></h1>
              <div className={styles.progressBar}>
                <div>
                  <h3>0</h3>
                  <h3>50</h3>
                  <h3>100</h3>
                </div>
                <div className={styles.progress}>
                  <div className={styles.bar} style={{width: `${data.current.humidity}%`}}></div>
                </div>
                <p>%</p>
              </div>
            </div>
            <div className={styles.hightlights_card}>
              <h2>Visibility</h2>
              <h1>{data.current.vis_miles}<span> miles</span></h1>
            </div>
            <div className={styles.hightlights_card}>
              <h2>Air Pressure</h2>
              <h1>{data.current.pressure_mb}<span> mb</span></h1>
            </div>
        </div>
      }
    </section>
  )
}