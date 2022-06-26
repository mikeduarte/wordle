
import './WordleTile.scss';

interface WordleTileProps {
    letter: string
    validType: string | null
    index: number
    animate: boolean
}

const WordleTile = ({letter, validType, index, animate} : WordleTileProps) => {
    let className = 'wordleTile__back';
    let animateLetter = false;
    const style = {
        transitionDelay : '0s'
    }

    if (animate && letter) {
        animateLetter = true;
        style.transitionDelay = `${.1 * index}s`;
    }

    if (validType) {
        if (validType === 'correct') {
            className += ' wordleTile__back--correct';
        }
        else if (validType === 'close') {
            className += ' wordleTile__back--close';
        }
        else {
            className += ' wordleTile__back--wrong';
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