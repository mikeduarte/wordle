import { render, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import userEvent  from '@testing-library/user-event';
import Wordle from './Wordle';


const words = ['HELLO'];


describe('Testing Wordle', () => {

  it('Should have 30 tiles in the game board', () => {
    render(<Wordle/>);
    const tiles = screen.getAllByTestId('testWordleTile');
    expect(tiles.length).toEqual(30);
  })

  it('Typing the word "world" should display on the game board', () => {
    const { container } = render(<Wordle/>);
    const guess = 'world';
    fireEvent.type(container, guess);
    for (let i = 0; i < guess.length; i++) {
        expect(screen.getAllByText(guess[i])).toHaveLength(2);
    }
  })

  it('Typing the word "worlds" should not display the letter "s" on the game board', () => {
    const { container } = render(<Wordle/>);
    const guess = 'worlds';
    fireEvent.type(container, guess);
    const s = screen.queryByText('s');
    expect(s).not.toBeInTheDocument();
  })

  it('Typing the word "hello" should end the game', () => {
    const { container } = render(<Wordle words={words}/>);
    const guess = 'hello';
    fireEvent.type(container, guess);
    fireEvent.type(container, 'world');
    const w = screen.queryByText('w');
    expect(w).not.toBeInTheDocument();
  })

});