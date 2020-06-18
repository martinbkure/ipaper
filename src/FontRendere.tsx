import React, { useState } from 'react';

function FontRenderer() {

  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);
  const [ text, setText ] = useState('');
  const [ font, setFont ] = useState('');

  const [ displayedWidth, setDisplayWidth ] = useState(0);
  const [ displayedHeight, setDisplayHeight ] = useState(0);
  const [ displayedText, setDisplayText ] = useState('');
  const [ displayedFont, setDisplayFont ] = useState('');

  function renderText() {
    setDisplayWidth(width);
    setDisplayHeight(height);
    setDisplayText(text);
    setDisplayFont(font);
  }

  return (
    <div>
      <input type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWidth(Number(event.target.value)) } placeholder="width"></input>
      <input type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHeight(Number(event.target.value)) } placeholder="height"></input>
      <input type="text" placeholder="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value) }></input>
      <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFont(event.target.value) }>
        <option value="Verdana">Verdana</option>
        <option value="Ariel">Ariel</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
      <button onClick={renderText}>Render text</button>
      <div style={{ width: displayedWidth, 
                    display: 'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    fontSize: `${ ((displayedWidth/window.innerWidth)* 100) / displayedText.length }vw`,
                    height: displayedHeight, 
                    fontFamily: displayedFont }}>
        <p>{ displayedText }</p>
      </div>

    </div>
  );
}

export default FontRenderer;
