import  React ,{ useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  // useCallback hook
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += " ! @ # $ % ^ & * ( ) - _ = + | [ ] { } ; : / ? . ";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, char]);

  // useRef hook  
  const PasswordRef = useRef(null);

  const CopyPasswordToClipboard = useCallback(() => {
    PasswordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    PasswordRef.current?.setSelectionRange(0,100) 
  
  }, [password]);

  // useEffect 
  useEffect(() => {
    PasswordGenerator();
  }, [length, number, char, PasswordGenerator]);

  return (
    <>
      <h1>Random Password Generator</h1>
      <div>
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={PasswordRef}
        />
        <button onClick={CopyPasswordToClipboard}>Copy</button>
      </div>
      <div>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label>Length: {length}</label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber((prev) => !prev)}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={char}
            onChange={() => setChar((prev) => !prev)}
          />
          Include Special Characters
        </label>
      </div>
    </>
  );
}

export default App;
