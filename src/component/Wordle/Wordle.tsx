import { useCallback, useEffect, useState, useRef } from 'react'

import HelpDialog from '../HelpDialog/HelpDialog';
import WordleTile from './WordleTile/WordleTile';
import Keyboard from '../Keyboard/Keyboard';
import './Wordle.scss'

export interface UsedLetters {
    [key: string]: string
}

const Wordle = ({ words }: { words?: string[] }) => {
    const [openDialog, setOpenDialog] = useState(true);
    const [word, setWord] = useState<string>('');
    const [guesses, setGuesses] = useState<string[]>(new Array(6).fill(''));
    const [currentGuess, setCurrentGuess] = useState<number>(0);
    const [correctGuess, setCorrectGuess] = useState<boolean>(false)
    const [endGame, setEndGame] = useState<boolean>(false);
    const usedLettersTemp = useRef<UsedLetters>({});
    const [usedLetters, setUsedLetters] = useState<UsedLetters>({});

    const checkIfCorrect = useCallback(() => {
        const guess = guesses[currentGuess];
        if (guess.toLocaleLowerCase() === word.toLocaleLowerCase()) {
            setTimeout(() => {setCorrectGuess(true)}, 500);
        }
        else if(currentGuess === 5) {
            setTimeout(() => {setEndGame(true)}, 500);
        }
    }, [guesses, currentGuess, word]);

    const onKeyboardEvent = useCallback((key: string) => {

        if (correctGuess || endGame) return;
        setOpenDialog(false);

        if (key === 'Backspace') {
            setGuesses(prevGuesses => {
                const newGuesses = [...prevGuesses];
                newGuesses[currentGuess] = newGuesses[currentGuess].slice(0, -1)
                return newGuesses
            });
        }
        else if (key === 'Enter' && guesses[currentGuess].length === 5) {
            checkIfCorrect();
            setCurrentGuess(prevCurrentGuess => prevCurrentGuess + 1);
            setTimeout(() => setUsedLetters({...usedLettersTemp.current}), 700);
            return;
        }
        else if (guesses[currentGuess].length <= 4 && key.match(/^[a-z]$/i)) {
            setGuesses(prevGuesses => {
                const newGuesses = [...prevGuesses];
                newGuesses[currentGuess] += key;
                return newGuesses
            });
        }
    }, [correctGuess, endGame, guesses, checkIfCorrect, currentGuess])

    useEffect(() => {
        if (words) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setWord(words[randomIndex]);
        }
    }, [words]);

    useEffect(() => {

        const handleKeydown = (event: KeyboardEvent) => {
            onKeyboardEvent(event.key);
        }

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }

    }, [guesses, currentGuess, correctGuess, endGame, checkIfCorrect, onKeyboardEvent])

    const playAgain = () => {
        if (words) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setWord(words[randomIndex]);
        }
        setGuesses(new Array(6).fill(''));
        setCurrentGuess(0);
        setCorrectGuess(false);
        setEndGame(false);
        usedLettersTemp.current = {};
        setUsedLetters({});
    }

    const GuessTiles = (guess: string, index: number) => {
        let letters = [];
        for (let i = 0; i < 5; i++) {
            const letter = guess[i];
            let validType = '';
            if (currentGuess > index) {
                if (word.split('').findIndex((char, idx) => letter === char.toLocaleLowerCase() && idx === i) === i) {
                    validType = 'correct';
                }
                else if (word.toLocaleLowerCase().includes(letter)) {
                    validType = 'close';
                }
                else {
                    validType = 'wrong';
                }
            }

            if (letter && !usedLettersTemp.current[letter]) usedLettersTemp.current[letter] = validType;
            else if (letter && usedLettersTemp.current[letter] && usedLettersTemp.current[letter] !== 'correct') usedLettersTemp.current[letter] = validType;

            letters.push(<WordleTile key={`${index}-${i}`} letter={letter} index={i} validType={validType} animate={(currentGuess - 1) >= index}/>)
        }
        return letters;
    }
  
    const handleClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <div className="wordle">
                <div className="wordle__gameboard">
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
                    <button className={`wordle__restart ${correctGuess || endGame ? 'wordle__restart--show' : ''}`} onClick={playAgain}>Play Again?</button>
                </div>
                
                <Keyboard usedLetters={usedLetters} callback={onKeyboardEvent}/>
            </div>
            <HelpDialog open={openDialog} close={handleClose}/>
        </>
    )



}

export default Wordle
