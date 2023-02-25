import React from 'react'
import AwardBackground from '../../assets/images/Asset 38.png'
import AmountBackground from '../../assets/images/Asset 41.png'
import TimerBackground from '../../assets/images/Asset 44.png'
import { CARD_TYPES } from '../../constants/card'

const { AMOUNT, AWARD, TIMER } = CARD_TYPES

const IMAGES_TYPE = {
  [AMOUNT]: AmountBackground,
  [AWARD]: AwardBackground,
  [TIMER]: TimerBackground,
}

export const Card = ({ title = "", content = 0, imageType = AWARD }) => {
  const image = IMAGES_TYPE[imageType];

  return (
    <div
      style={{
        backgroundImage: `url("${image}")`,
      }}
      className="relative w-60 h-60 bg-contain bg-no-repeat bg-center"
    >
      <h1 className='absolute left-11 top-10 text-left font-sans w-10 text-black text-sm'>{title}</h1>
      <h1 className='absolute left-2 top-2 w-full h-full flex justify-center items-center text-5xl'>
        {content}
      </h1>
    </div>
  )
}
