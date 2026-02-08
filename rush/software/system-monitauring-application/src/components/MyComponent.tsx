import React, {useState} from "react";

function MyComponent() {
    const [name, setName] = useState<String>("Guest");
    const [age, setAge] = useState<number>(0);
    const updateName = () => {
        setName("ryan");
    }

    const updateAge = () => {
        setAge(age + 1);
    }
    return (
    <div>
        <p>age: {age}</p>
        <button onClick={updateAge}>Set Name</button>
        </div>)
}

export default MyComponent