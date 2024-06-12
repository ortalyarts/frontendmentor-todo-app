import React, { useState } from 'react';
// import "./Input.css"

// export const Input = ({onSubmit}) => {
//     const [input, setInput] = useState("");

//     const handleSubmit = () => {
//         if(!input) return;

//         onSubmit(input);

//         setInput("");
//     }
//     return (
//         <div className="container">
//             <input type="text" className="input"
//             value={input}
//             placeholder="Create a new todo…"
//             onChange={(e) => setInput(e.target.value)} />
//             <button className="button" onClick={handleSubmit}>Add</button>
//         </div>
//     )
// }

export const Input = ({submit}) => {

    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!input) return;

        submit(input);

        setInput("");
    }
    return (
        <form className="new-task" onSubmit={handleSubmit}>
            <input type="text" className="input-new-task"
            value={input}
            placeholder="Create a new todo…"
            onChange={(e) => setInput(e.target.value)} />
            {/* <button className="button" onClick={handleSubmit}>Add</button> */}
        </form>
    )
}