import { ref } from 'vue'
import pokeArray from './pokemons.json'

class PokeService {
  //esta api devuelve un objeto de arrays
  pokeObj //objeto de listas de pokemones
  pokeList //array de pokemones
  pokemon //objeto pokemon individual

  //constructor de la clase
  constructor() {
    this.pokeObj = ref({})
    this.pokeList = ref([])
    this.pokemon = ref({})
  }

  //getter
  getPokeObj() {
    return this.pokeObj
  }

  getPokeList() {
    return this.pokeList
  }

  getPokemon() {
    return this.pokemon
  }

  async fetchAll() {
    try { //tratamiento de errores externos
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
      const response = await fetch(url)
      const json = await response.json()
      this.pokeObj = await json
      this.pokeList = this.pokeObj.results
      console.log(typeof this.pokeList);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchData() {
    const pokeInfo = pokeArray
    let pokemons = []
    let aux = [] //array de indices auxiliar, pares de 3
    let objToPush = {} //objeto a pushear en el array
    let randomIndex = 0
    let correctA = 0

    /**FUNCION QUE PUSHEA 3 POKEMONES EN UN OBJETO Y UNA RESPUESTA CORRECTA */
    for (let index = 0; index < pokeInfo.length; index++) {
      aux.push(pokeInfo[index]) //auxiliar
      if ((index + 1) % 3 == 0 && index != 0) {
        randomIndex = Math.round(Math.random() * (2 - 0) + 0);
        correctA = pokeInfo[randomIndex].index //usaremos el index como respuesta correcta

        objToPush = { "answers": aux, "correctAnswer": correctA } //pusheamos ambos objetos
        pokemons.push(objToPush)
        aux = []
        correctA = ""
      }
    }

    /**FUNCION QUE GENERA 20 POKEMONES ALEATORIOS */
    aux = []
    let n = 0
    let pokemon 
    while (n < 20) {
      randomIndex = Math.round(Math.random() * (50 - 0) + 0);
      pokemon = pokemons[randomIndex]
      if (existe() === false) {
        aux.push(pokemon)
        n++
      }
    }

    function existe() {
      let answer = false
      for (let i = 0; i < aux.length; i++) {
        if (aux[i] === pokemon) {
          answer = true
          break
        }
      }
      return answer
    }

    this.pokeList = aux
    //console.log(this.pokeList);
    console.log("Desarrollado por gduarte2999@gmail.com");
    
  }

  async fetchByName(name) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`
      //const url = 'https://jsonplaceholder.typicode.com/posts/'+id 
      const response = await fetch(url)
      const json = await response.json()
      this.pokemon = await json
    } catch (error) {
      console.log(error);
    }
  }

}
export default PokeService