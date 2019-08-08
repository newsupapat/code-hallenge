import React from 'react'
import { Link } from 'react-router-dom'
import color from '@material-ui/core/colors/teal'
const background = {
  Space:
    'https://d21950x0o1sh55.cloudfront.net/assets/home/game-0e307d71d9838e8fbe4927b551f119bcd9e4748f2c2b70c7b81846702996ef94.jpg',
  Thriller:
    'https://d21950x0o1sh55.cloudfront.net/uploads/inside_exclusif/picture/26/desktop_VALERIAN_BNP_68.jpg',
  Cast:
    'https://d21950x0o1sh55.cloudfront.net/uploads/inside_exclusif/picture/6/desktop_VALERIAN_BNP_02.jpg'
}
const CardPlay = ({ problem }) => {
  const { theme } = problem
  return (
    <div
      className='card'
      style={{
        backgroundImage: `url(
            ${background[theme]}
          )`
      }}
    >
      <Link to={`code?CodeId=${problem._id}`}>
        <div className='card__content'>
          <svg
            viewBox='0 0 50 50'
            width='5em'
            height='5em'
            className='play-button'
          >
            <path
              d='M42.7 42.7L25 50 7.3 42.7 0 25 7.3 7.3 25 0l17.7 7.3L50 25l-7.3 17.7z'
              className='polygon'
            />
            <path d='M32.5 25l-11 6.4V18.6z' />
          </svg>
          <div
            className='card__content--description'
            style={{ color: 'F2BE22' }}
          >
            <h3 className='roll-up'>
              <span>
                <span>C</span>
                <span>C</span>
              </span>
              <span>
                <span>O</span>
                <span>O</span>
              </span>
              <span>
                <span>D</span>
                <span>D</span>
              </span>
              <span>
                <span>E</span>
                <span>E</span>
              </span>
              <span>
                <span>I</span>
                <span>I</span>
              </span>
              <span>
                <span>N</span>
                <span>N</span>
              </span>
              <span>
                <span>G</span>
                <span>G</span>
              </span>
            </h3>
            <p className='text-reveal' style={{ color: '#F2BE22' }}>
              <span>
                <span>And get a chance to</span>
                <span>win tickets to the</span>
                <span>premiere of the movie</span>
              </span>
              <span>
                <span>
                  <span>And get a chance to</span>
                </span>
                <span>
                  <span>win tickets to the</span>
                </span>
                <span>
                  <span>premiere of the movie</span>
                </span>
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardPlay
