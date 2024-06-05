import { useState } from "react";
import { useEffect } from "react";

function CreateCards({updateScore}) {
  const [imgArr, setImgArr] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [CardsClicked, setCardsClicked] = useState([]);

  const updateState = async () => {
    const pokemonArr = ['ditto', 'pichu', 'meowth', 'lugia', 'snorlax', 'mew', 'sylveon', 'suicune'];
    
    const getPokemonImg = async (pokemon) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { mode: "cors" });
      const pokemonImg = await response.json();
      return { name: pokemon, url: pokemonImg.sprites.front_default };
    };

    const processAllPokemon = async (array) => {
      const imgUrlArr = await Promise.all(array.map(pokemon => getPokemonImg(pokemon)));
      setImgArr(imgUrlArr);
    };

    await processAllPokemon(pokemonArr);
  };

  useEffect(() => {
    updateState();
  }, []);

  useEffect(() => {
    if (imgArr.length > 0) {
      setIsUpdated(true);
    }
  }, [imgArr]);

  useEffect(() => {
    function shuffleArray(originalArr) {
        let array = originalArr.slice(0);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if(refresh){
        setImgArr(shuffleArray(imgArr));
        setRefresh(false);
    };
  }, [refresh])

  function handleClick(cardName){
    setRefresh(true);

    if(CardsClicked.length === 0){
        updateScore('add');
        setCardsClicked([...CardsClicked, cardName]);
    } else if (CardsClicked.includes(cardName)){
        updateScore('reset');
        setCardsClicked([]);
    } else {
        updateScore('add');
        setCardsClicked([...CardsClicked, cardName]);
    };
  };


  return (
    <>
      {isUpdated && (
        imgArr.map(pokemon => (
          <div onClick={()=>{handleClick(pokemon.name)}} className="card" key={pokemon.name} id={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.url} alt={pokemon.name} />
          </div>
        ))
      )}
    </>
  );
};

export default CreateCards;