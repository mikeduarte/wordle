import { memo } from 'react';

import './Keyboard.scss';
import { UsedLetters } from '../Wordle/Wordle';

interface KeyboardProps {
    usedLetters: UsedLetters
    callback: (key: string) => void
}

const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], 
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
]

const Keyboard = ({ usedLetters, callback } : KeyboardProps) => {

  return (
    <div className="keyboard">
            {
                keys.map((row: string[], index: number) => {
                    return (
                        <div key={index} className="keyboard__row">
                            {
                                row.map((key: string, keyIndex: number) => {
                                    let className = 'keyboard__key';
                                    const validType = usedLetters[key];
                                    if (validType) {
                                        if (validType === 'correct') {
                                            className += ' keyboard__key--correct';
                                        }
                                        else if (validType === 'close') {
                                            className += ' keyboard__key--close';
                                        }
                                        else {
                                            className += ' keyboard__key--wrong';
                                        }
                                    }
                                    return (
                                        <button 
                                            key={`${index}-${keyIndex}`}
                                            className={`keyboard__key ${className} ${key === 'Backspace' || key === 'Enter' ? 'keyboard__key--large' : ''}`} 
                                            onClick={() => callback(key)}>
                                                {key !== 'Backspace' && key}
                                                {key === 'Backspace' && <span className="keyboard__bksp"></span>}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
    </div>
    )

}

export default memo(Keyboard)