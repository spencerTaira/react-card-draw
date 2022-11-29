import React from "react";

/**
 *  Props:
 *    card - Object
 *      Ex: {
                 "code": "6H",
                  "image": "https://deckofcardsapi.com/static/img/6H.png",
                  "images": {
                                "svg": "https://deckofcardsapi.com/static/img/6H.svg",
                                "png": "https://deckofcardsapi.com/static/img/6H.png"
                            },
                  "value": "6",
                  "suit": "HEARTS"
            }

    State:
      None

    Render:
      App --> Card
 */

function Card({card}) {
  return (
    <img src={`${card.image}`} alt={`Card is ${card.code}`}></img>
  )
}

export default Card;