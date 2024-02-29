import { useEffect,useState } from 'react'
import './App.css'
// import DisableDevtool from 'disable-devtool';

// DisableDevtool();


function App() {

    const [wordText,setWordText]=useState('')
    const [hintText,setHintText]=useState('')
    const [timer,setTimer]=useState((5));
    const [inputValue, setInputValue] = useState('');
    const [correctWord,setCorrectWord]= useState('');
    const [score,setScore]=useState(0);
    const [questionno,setquestionno]=useState(0);
    
    //let mp;
    

    let leng

    const words=[
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "garden",
        hint: "Space for planting flower and plant"
    }
    ];


    leng=words.length

    useEffect(() => {
      initGame();

    }, []);

    useEffect(()=>{
      if(timer==0){ 
        initGame()
      }
      const interval=setInterval(()=>{
        setTimer((prev)=>prev-1);
      },1000);

      return() => clearInterval(interval);
    },[timer]);

  

    const initGame =() =>{
      setTimer(10);

          setquestionno(questionno+1)
          console.log(questionno)
          //console.log(conq)
          if(questionno>=leng){
            console.log("Stop")
          }
          else{
              let randomObj = words[questionno];
              let wordArray = randomObj.word.split("");
              for (let i = wordArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
              }
              setWordText(wordArray.join(""));
              setHintText(randomObj.hint);
              setCorrectWord(randomObj.word.toLowerCase());
              setInputValue("");
          }
    };

    const checkWord = () => {
      let userWord = inputValue.toLowerCase();
      if (!userWord) return alert("Please enter the word to check!");
      if (userWord !== correctWord)
        return alert(`Oops! ${userWord} is not a correct word`);

      alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
      setScore((score=>score+10));
      // console.log(score);
      initGame();
    };

return(
  <div className="container">
  <h2>Word Scramble</h2>
  <div className="content">
    <p className="word">{wordText}</p>
    <div className="details">
      <p className="hint">Hint: <span>{hintText}</span></p>
      <p className="time">Time Left: <span><b>{timer}</b>s</span></p>
    </div>
    <input type="text" spellCheck={false} placeholder="Enter a valid word" value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    <div className="buttons">
      <button className="refresh-word" onClick={initGame}>Refresh Word</button>
      <button className="check-word" onClick={checkWord}>Check Word</button>
    </div>
  </div>
</div>
)
}
export default App;

