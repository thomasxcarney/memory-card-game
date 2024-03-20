import { useState } from "react";
import { useEffect } from "react";

function CreateCards(){
    const [imgArrValue, setImgArrValue] = useState('');
    const [pokemonNameArr, setPokemonNameArr] = useState('')

    useEffect(()=> {
        const imgUrlArr = [];
        const pokemonArr = ['ditto', 'pichu', 'meowth', 'lugia']
        setPokemonNameArr(pokemonArr);

        async function getPokemonImg(pokemon){
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon, {mode: "cors"})
            const pokemonImg = await response.json();
            imgUrlArr.push(pokemonImg.sprites.front_default);
            console.log(imgUrlArr);
            return setImgArrValue(imgUrlArr);
        };

        function processAllPokemon(array){
            array.forEach((element) => getPokemonImg(element));    
        };
        processAllPokemon(pokemonArr);

        return()=>{}
    },[])

    return(
        <>
            <div className="card" id={pokemonNameArr[0]}>
                <h3>{pokemonNameArr[0]}</h3>
                <img src={imgArrValue[0]}></img>
            </div>
            <div className="card" id={pokemonNameArr[1]}>
                <h3>{pokemonNameArr[1]}</h3>
                <img src={imgArrValue[1]}></img>
            </div>
            <div className="card" id={pokemonNameArr[2]}>
                <h3>{pokemonNameArr[2]}</h3>
                <img src={imgArrValue[2]}></img>
            </div>
            <div className="card" id={pokemonNameArr[3]}>
                <h3>{pokemonNameArr[3]}</h3>
                <img src={imgArrValue[3]}></img>
            </div>
        </>
    )
}

export default CreateCards;