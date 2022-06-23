
import './WordleTile.scss';

interface WordleTileProps {
    letter: string
    validate: boolean
    word: string
    index: number
    animate: boolean
}

const WordleTile = ({letter, validate, word, index, animate} : WordleTileProps) => {
    let className = 'wordleTile__back';
    let animateLetter = false;
    let style = {
        transitionDelay : '0s'
    }

    if (animate && letter) {
        animateLetter = true;
        style.transitionDelay = `${.1 * index}s`
    }

    if (validate) {
        if (word.split('').findIndex((char, idx) => letter === char.toLocaleLowerCase() && idx === index) === index) {
            className += ' wordleTile__back--correct'
        }
        else if (word.toLocaleLowerCase().includes(letter)) {
            className += ' wordleTile__back--close'
        }
        else {
            className += ' wordleTile__back--wrong'
        }
    }

    return (
        <div className="wordleTile" data-testid="testWordleTile">
            <div className={`wordleTile__inner ${animateLetter ? 'wordleTile__inner--flip' : ''}`} style={style}>
                <div className="wordleTile__front">
                    {letter}
                </div>
                <div className={className}>
                    {letter}
                </div>
            </div>
        </div>
    )
}

export default WordleTile;