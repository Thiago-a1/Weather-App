import { useState, useContext, FormEvent } from 'react';
import axios from 'axios';

import { MdMyLocation, MdLocationPin, MdClose, MdOutlineSearch, MdKeyboardArrowRight } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';

import { SearchContext } from '../../contexts/SearchContext';
import { SkeletonSidebar } from '../Skeleton';
import { convertDate } from '../../utils/convertDate';

import styles from './styles.module.scss';
import { expandIcon } from '../../utils/expandIcon';


export const Sidebar = () => {
  const { data, getQuery, isLoading, measurement } = useContext(SearchContext);

  const [searchSidebar, setSearchSidebar] = useState(false);
  const [input, setInput] = useState('');

  function handleSearchSidebar () {
    setSearchSidebar(searchSidebar === true ? false : true)
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault();
    getQuery(input);
    setInput('');
    setSearchSidebar(false);
  }

  function getClientPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition (
        (position) => {
          console.log(`${position.coords.latitude},${position.coords.longitude}`)
          getQuery(`${position.coords.latitude},${position.coords.longitude}`)
        },
        null,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    } else {
      alert("Geolocation is not suported!")
    }
  }

  return (
    <>
    <article
      className={styles.searchSidebar}
      style={{transform: `translate(${searchSidebar ? 0 : -459}px)`}}
    >
      <div className={styles.button_container}>
        <button onClick={() => handleSearchSidebar()}>
          <MdClose size="32" color="#FFF"/>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.search_container}>
          <div className={styles.input_container}>
            <MdOutlineSearch size="24" />
            <input 
              type="text"
              placeholder="search location"
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
          </div>
          <button>Search</button>
        </div>
        <button 
          className={styles.pre_search}
          onClick={() => setInput('london')}
        >
          London
          <MdKeyboardArrowRight size="24" />
        </button>
        <button 
          className={styles.pre_search}
          onClick={() => setInput('rio de janeiro')}
        >
          Rio de Janeiro
          <MdKeyboardArrowRight size="24" />
        </button>
        <button 
          className={styles.pre_search}
          onClick={() => setInput('singapore')}
        >
          Singapore
          <MdKeyboardArrowRight size="24" />
        </button>
      </form>
    </article>

    <article className={styles.sidebar}>
      <div className={styles.buttons_container}>
        <button 
          className={styles.search_button}
          onClick={() => handleSearchSidebar()}
        >Search for places</button>
        <button 
          className={styles.location_button}
          onClick={() => getClientPosition()}
        >
          <MdMyLocation size="24" />
        </button>
      </div>

      {isLoading ?  <SkeletonSidebar /> :
        <div>
          <div className={styles.clounds_container}>
            <img src={expandIcon(data.current.condition.icon, 128)} alt={data.current.condition.text} />
          </div>

          <div className={styles.infos_container}>
            <h1>
              {measurement == 'C' ? data.current.temp_c : data.current.temp_f}
              <span>º{measurement == 'C' ? 'C' : 'F'}</span>
            </h1>
            <h2>{data.current.condition.text}</h2>
            <div>
              <p>Today</p>
              <BsDot size="24" />
              <p>{convertDate(data.location.localtime)}</p>
            </div>
            <div>
              <MdLocationPin size="24" style={{marginRight: '5px'}}/>
              <p>{data.location.name}</p>
            </div>
          </div>
        </div>
      }
    </article>
    </>
  )
}