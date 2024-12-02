import React, { useCallback, useEffect, useRef, useState } from "react";
// import Restaurant from './Components/Restaurant'

const App = () => {
  const [legth, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+=[]{}~`";

    for (let i = 1; i <= legth; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [legth, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    passwordGenerator()
  }, [legth, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md 
    rounded-lg px-4 my-8 text-orange-500 bg-gray-700"
      >
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex-shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={legth}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {legth}</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            className="cursor-pointer"
            onChange={(e) => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <input
          type="checkbox"
          id="characterInput"
          className="cursor-pointer"
          onChange={(e) => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </>
  );
};

export default App;
