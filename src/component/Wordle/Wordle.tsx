
import { useCallback, useEffect, useState } from 'react'

import HelpDialog from '../HelpDialog/HelpDialog';
import WordleTile from './WordleTile/WordleTile';
import './Wordle.scss'

const Wordle = ({ words }: { words?: string[] }) => {
    const [openDialog, setOpenDialog] = useState(true);
    const [word, setWord] = useState<string>('');
    const [guesses, setGuesses] = useState<string[]>(new Array(6).fill(''));
    const [currentGuess, setCurrentGuess] = useState<number>(0);
    const [correctGuess, setCorrectGuess] = useState<boolean>(false)
    const [endGame, setEndGame] = useState<boolean>(false);

    const checkIfCorrect = useCallback(() => {
        const guess = guesses[currentGuess];
        if (guess.toLocaleLowerCase() === word.toLocaleLowerCase()) {
            setTimeout(() => {setCorrectGuess(true)}, 500);
        }
        else if(currentGuess === 5) {
            setTimeout(() => {setEndGame(true)}, 500);
        }
    }, [guesses, currentGuess, word]);

    useEffect(() => {
        if (words) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setWord(words[randomIndex]);
        }
    }, [words]);

    useEffect(() => {

        const handleKeydown = (event: KeyboardEvent) => {

            if (correctGuess || endGame) return;
            setOpenDialog(false);

            if (event.key === 'Backspace') {
                setGuesses(prevGuesses => {
                    const newGuesses = [...prevGuesses];
                    newGuesses[currentGuess] = newGuesses[currentGuess].slice(0, -1)
                    return newGuesses
                });
            }
            else if (event.key === 'Enter' && guesses[currentGuess].length === 5) {
                checkIfCorrect();
                setCurrentGuess(prevCurrentGuess => prevCurrentGuess + 1);
                return;
            }
            else if (guesses[currentGuess].length <= 4 && event.key.match(/^[a-z]$/i)) {
                setGuesses(prevGuesses => {
                    const newGuesses = [...prevGuesses];
                    newGuesses[currentGuess] += event.key;
                    return newGuesses
                });
            }
        }

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }

    }, [guesses, currentGuess, correctGuess, endGame, checkIfCorrect])

    const playAgain = () => {
        if (words) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setWord(words[randomIndex]);
        }
        setGuesses(new Array(6).fill(''));
        setCurrentGuess(0);
        setCorrectGuess(false);
        setEndGame(false);
    }

    const GuessTiles = (guess: string, index: number) => {
        let letters = [];
        for (let i = 0; i < 5; i++) {
            letters.push(<WordleTile key={`${index}-${i}`} letter={guess[i]} index={i} validate={currentGuess > index} word={word} animate={(currentGuess - 1) >= index}/>)
        }
        return letters;
    }
  
    const handleClose = () => {
        setOpenDialog(false);
    }

    return (
        <div className="wordle">
            {
                guesses.map((guess, index) => {
                    return (
                        <div key={index} className="wordle__guess">
                            {
                                GuessTiles(guess, index)
                            }
                        </div>
                    )
                })
            }
            <div className={`wordle__correct-message ${correctGuess ? 'wordle__correct-message--show' : ''}`}>Well played!</div>
            {(correctGuess || endGame) && <button className="wordle__restart" onClick={playAgain}>Play Again?</button>}
            <HelpDialog open={openDialog} close={handleClose}/>
        </div>
    )



}

export default Wordle
