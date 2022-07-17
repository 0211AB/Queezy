import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';
import './Leaders.css'

export default function Leaders() {

  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="duration">
            <button class='btn' data-id='7'>QuizId:2ca04c3f</button>
            <button class='btn' data-id='30'>Fulll Marks : 56</button>
            <button class='btn' data-id='0'>Duration : 44</button>
        </div>

        <Profiles Leaderboard={Leaderboard}></Profiles>

    </div>
  )
}



function between(data, between){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })

}