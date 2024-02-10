import { useEffect, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'

import './style.scss'

const Slider = () => {
    const { data } = useData()
    const [index, setIndex] = useState(0)
    const byDateDesc = data?.focus
        ? data?.focus.sort((evtA, evtB) =>
              new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
          )
        : []

    const handleChange = (radioIdx) => {
        setIndex(radioIdx)
    }

    const nextCard = () => {
        setTimeout(
            () =>
                setIndex(
                    index < byDateDesc.length
                        ? (index + 1) % byDateDesc.length
                        : 0
                ),
            5000
        )
    }
    useEffect(() => {
        nextCard()
    })
    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div key={`${event.id}-${event.date}`}>
                    <div
                        className={`SlideCard SlideCard--${
                            index === idx ? 'display' : 'hide'
                        }`}
                    >
                        <img src={event.cover} alt="forum" />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="SlideCard__paginationContainer" key="pagination">
                <div className="SlideCard__pagination">
                    {byDateDesc.map((_, radioIdx) => (
                        <input
                            key={index + Math.random(2)}
                            type="radio"
                            name="radio-button"
                            checked={index === radioIdx}
                            onChange={() => handleChange(radioIdx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slider
