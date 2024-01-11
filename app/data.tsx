import { SiPubg, SiLeagueoflegends, SiCounterstrike } from 'react-icons/si'
import { GiDefenseSatellite } from 'react-icons/gi'
import { TbBrandFortnite  } from 'react-icons/tb'

const data = [
  {
    id:1,
    percent: 24,
    prizePool: 19552093,
    game: 'PUBG',
    icon: <SiPubg size={20}/>
  },
  {
    id:2,
    percent: 23,
    prizePool: 12899716,
    game: 'Dota 2',
    icon: <GiDefenseSatellite size={20}/>
  },
  {
    id:3,
    percent: 21,
    prizePool: 12795944,
    game: 'LOL',
    icon: <SiLeagueoflegends size={20}/>
  },
  {
    id:4,
    percent: 19,
    prizePool: 11546300,
    game: 'Fortnite',
    icon: <TbBrandFortnite size={20}/>
  },
  {
    id:5,
    percent: 13,
    prizePool: 9673975,
    game: 'CS:GO',
    icon: <SiCounterstrike size={20}/>
  },
]

export default data;