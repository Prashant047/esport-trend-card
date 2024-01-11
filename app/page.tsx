"use client"
import { useMeasure } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import * as d3 from 'd3';

import cardData from './data';


const data = cardData.map((val) => val.percent);
const placementData = [{x1: 0, x2:0, id:0}]
data.forEach((val,i) => {
  let prev = placementData[placementData.length-1]
  placementData.push({x1: prev.x2, x2: prev.x2 + val, id:cardData[i].id});
});
placementData.shift();
console.log(placementData);


export default function Home() {
  const [ref, {height, width}] = useMeasure();
  const [active, setActive] = useState(0);

  return (
    <section className='max-w-sm p-6 mx-auto my-10 bg-amber-200 rounded-[1.5rem]'>
      <h1 className='text-neutral-950'>
        <b>Esport Games Trends</b>
      </h1>
      <div className='flex justify-between mb-6 text-neutral-800/70'>
        <small>
          by Prize Pool
        </small>
        <small>
          2022
        </small>
      </div>
      <div
        ref={ref}
        className='h-64 bg-amber-200 mb-6'
      >
        {(height&&width?(
          <Graph active={active} height={height} width={width}/>
        ):null)}
      </div>
      <div>
        <ul className='text-neutral-950'>
          {cardData.map(({percent, prizePool, game, icon, id}) => (
            <ListItem
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(0)}
              percent={percent}
              key={id}
              game={(
                <span className='flex items-center gap-2'>
                  <span>{icon}</span>
                  <b>{game}</b>
                </span>
              )}
              prizePool={prizePool}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

interface ListItem {
  percent: number
  game: ReactNode
  prizePool: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}
function ListItem({percent, game, prizePool, onMouseEnter, onMouseLeave}:ListItem){
  const numberFormatter = Intl.NumberFormat('en');
  return (
    <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='grid grid-cols-[2fr_4fr_3fr] text-sm py-3 border-b-2 border-neutral-800/20 last:border-b-0'>
      <b>{percent}%</b>
      <span>{game}</span>
      <span className='justify-self-end'>${numberFormatter.format(prizePool)}</span>
    </li>
  )
}

function Graph({height, width, active}: {height:number, width: number, active:number}){
  const PADDING = 0;

  const xScale = d3.scaleLinear()
    .domain([0,100])
    .range([PADDING, width-PADDING])
  
  const yScale = d3.scaleLinear()
    .domain([0, Math.max(...data)])
    .range([height-PADDING, PADDING]);

  if (!height || !width) {
    return null;
  }

  return (
    <svg height={height} width={width} >
      {placementData.map(({x1: start, x2: end, id}, i) => (
        <motion.g key={id} animate={{opacity:!active?1:active===id?1:0.5}}>
          <motion.g 
            className='text-neutral-900' 
            initial={{x: xScale(start), y:yScale(0), opacity: 0}}
            animate={{x: xScale(start), y:yScale(data[i]), opacity: 1}}
            transition={{
              delay: 0.15*i + 0.5,
              ease: [0.32, 0.72, 0, 1],
              duration: 1
            }}
          >
            <rect 
              fill='currentColor'
              x={0}
              y={0}
              height={20}
              width={4}
            />
            <text
              fill='currentColor'
              x={24}
              y={14}
              textAnchor='middle'
              className='font-bold text-[0.8rem]'
            >{data[i]}%</text>
          </motion.g>
          <motion.line 
            stroke='currentColor' 
            initial={{y1: yScale(0)}}
            animate={{y1: yScale(data[i])}}
            transition={{
              delay: 0.1*i + 0.5,
              ease:[0.32, 0.72, 0, 1],
              duration: 1
            }}
            strokeWidth={1.6}
            className='text-neutral-600'
            opacity={0.5}
            x1={xScale(start)} 
            x2={xScale(start)} 
            y2={yScale(0)} 
            fill='none'
          />
          <motion.rect 
            initial={{width: 0}}
            animate={{width:xScale(end) - xScale(start) }}
            transition={{
              ease:[0.32, 0.72, 0, 1],
              duration: 1
            }}
            whileTap={{scale: 0.95}}
            fill='currentColor'
            className='text-neutral-950'
            style={{opacity: 1 - 0.1*i}}
            x={xScale(start)}
            y={yScale(7)}
            height={height - PADDING - yScale(7)}
          />
        </motion.g>
      ))}
    </svg>
  )
}