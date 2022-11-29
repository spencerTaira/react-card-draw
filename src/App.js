import axios from "axios";
import React, { useState, useEffect } from "react";
import './App.css';
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck/"
const SHUFFLE_CARDS_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

/**
 *  App makes API calls and renders components
 *
 *  Props:
 *    None
 *
 *  State:
 *    deck - Object
 *      Ex: {deckID: '7gllli4p4jtv', cardsRemaining: 52, gotDeck: true}
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

 *
 *  Render:
 *    App -> Card
 */
function App() {

  const [deck, setDeck] = useState({deckID: null, cardsRemaining: null, gotDeck: false});
  const [card, setCard] = useState(null);

  console.log('deck: ', deck, 'card: ', card);

  useEffect(function getDeck() {
    async function getDeckAPI() {
      const response = await axios.get(SHUFFLE_CARDS_URL);

      if (response.data.success === true) {
        setDeck({deckID: response.data.deck_id, cardsRemaining: response.data.remaining, gotDeck: true}); 
      }
    }

    getDeckAPI()
  }, []);

  /**
   * Makes API request to card API and draws 1 card
   * Updates card and deck states
   */
  async function getCard() {
    if (deck.cardsRemaining === 0) {
      alert('Error: No cards remaining');
    }

    const response = await axios.get(`${BASE_URL}${deck.deckID}/draw/?count=1`);

    if (response.data.success === true) {
      setCard(response.data.cards[0]);
      setDeck(d => ({...d, cardsRemaining: response.data.remaining}));
    }
  }


  if (deck.gotDeck === false) return <i>Loading...</i>

  return (
    <div className="App">
      {card ? <Card card={card} /> : null}
      <button onClick={getCard}>Get Card!</button>
    </div>
  );
}

export default App;
