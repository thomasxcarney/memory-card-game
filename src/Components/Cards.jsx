import { useState } from "react";
import { useEffect } from "react";

// function CreateCards(){
//     const [imgArr, setImgArr] = useState([]);
//     const [isUpdated, setIsUpdated] = useState(false);

    // useEffect(()=> {
    //     const pokemonArr = ['ditto', 'pichu', 'meowth', 'lugia', 'snorlax', 'mew', 'sylveon', 'suicune'];
    //     // const imgUrlArr = [];
        
    //     const handleAdd = (pokemonObj) => {
    //         const newPokeObj = imgArr.slice();
    //         newPokeObj.push(pokemonObj);
    //         setImgArr(newPokeObj);
    //     };

    //     async function getPokemonImg(pokemon){
    //         const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon, {mode: "cors"})
    //         const pokemonImg = await response.json();
    //         return handleAdd({name: pokemon, url: pokemonImg.sprites.front_default});
    //     };


    //     function processAllPokemon(array){
    //         array.forEach((element) => getPokemonImg(element));
    //         // setImgArr(imgUrlArr);
    //         return;
    //     };

    //     processAllPokemon(pokemonArr);

    //     return ()=>{};
    // },[])

//     const updateState = () => {
//         const pokemonArr = ['ditto', 'pichu', 'meowth', 'lugia', 'snorlax', 'mew', 'sylveon', 'suicune'];
//         const imgUrlArr = [];
        
//         // const handleAdd = (pokemonObj) => {
//         //     const newPokeObj = imgArr.slice();
//         //     newPokeObj.push(pokemonObj);
//         //     setImgArr(newPokeObj);
//         // };

//         async function getPokemonImg(pokemon){
//             const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon, {mode: "cors"})
//             const pokemonImg = await response.json();
//             return imgUrlArr.push({name: pokemon, url: pokemonImg.sprites.front_default});
//         };


//         function processAllPokemon(array){
//             array.forEach((element) => getPokemonImg(element));
//             setImgArr(imgUrlArr);
//             return;
//         };

//         processAllPokemon(pokemonArr);
//     };

//     useEffect(()=>{
//         updateState();
//     },[])


//     useEffect(()=>{
//         if(imgArr.length > 0){
//             console.log('state changed', imgArr);
//             setIsUpdated(true);
//         };
//     },[imgArr]);

//     return (
//         <div>
//           {isUpdated && (
//             <div className="card" id={imgArr[0].name}>
//                 <h3></h3>
//                 <img src={imgArr[0].url}></img>
//             </div>
//           )}
//         </div>
//       );

//     // if(imgArr.length > 0){
//     //     return console.log(imgArr)
//     // };
//     // return(
//     //     <>
//     //         <div className="card" id={imgArr[0].name}>
//     //             <h3>{}</h3>
//     //             <img src={imgArr[0].url}></img>
//     //         </div>
//     //         <div className="card" id={'1'}>
//     //             <h3>{}</h3>
//     //             <img src={imgArrValue[1]}></img>
//     //         </div>
//     //         <div className="card" id={'1'}>
//     //             <h3>{'1'}</h3>
//     //             <img src={imgArrValue[2]}></img>
//     //         </div>
//     //         <div className="card" id={pokemonNameArr[3]}>
//     //             <h3>{pokemonNameArr[3]}</h3>
//     //             <img src={imgArrValue[3]}></img>
//     //         </div>
//     //         <div className="card" id={pokemonNameArr[4]}>
//     //             <h3>{pokemonNameArr[4]}</h3>
//     //             <img src={imgArrValue[4]}></img>
//     //         </div>
//     //         <div className="card" id={pokemonNameArr[5]}>
//     //             <h3>{pokemonNameArr[5]}</h3>
//     //             <img src={imgArrValue[5]}></img>
//     //         </div>
//     //         <div className="card" id={pokemonNameArr[6]}>
//     //             <h3>{pokemonNameArr[6]}</h3>
//     //             <img src={imgArrValue[6]}></img>
//     //         </div>
//     //         <div className="card" id={pokemonNameArr[7]}>
//     //             <h3>{pokemonNameArr[7]}</h3>
//     //             <img src={imgArrValue[7]}></img>
//     //         </div>
//     //     </>
//     // );
// }

function CreateCards() {
  const [imgArr, setImgArr] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const updateState = async () => {
    const pokemonArr = ['ditto', 'pichu', 'meowth', 'lugia', 'snorlax', 'mew', 'sylveon', 'suicune'];
    
    // Function to fetch image URL for a single Pokemon
    const getPokemonImg = async (pokemon) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { mode: "cors" });
      const pokemonImg = await response.json();
      return { name: pokemon, url: pokemonImg.sprites.front_default };
    };

    // Process all Pokemon and wait for all fetches to complete
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
      console.log('state changed', imgArr);
      setIsUpdated(true);
    }
  }, [imgArr]);

  return (
    <div>
      {isUpdated && (
        imgArr.map(pokemon => (
          <div className="card" key={pokemon.name} id={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.url} alt={pokemon.name} />
          </div>
        ))
      )}
    </div>
  );
};

export default CreateCards;