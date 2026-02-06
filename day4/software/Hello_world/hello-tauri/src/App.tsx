import { ReactNode} from 'react';
import { invoke } from "@tauri-apps/api/core";

function Composant({children}: {children: ReactNode})
{
  return <h1>{children}</h1>
}

async function greetFunction() {
  try {
    const res = await invoke<string>("greet", { name: "Test" });
    const content = document.getElementById("message")!;
    content.textContent = res;
  }
  catch (err) {
    console.log("Err");
  }
}
 
function App() {
  return (
    <main>
      <h1>Hello Tauri!</h1>
      <button id="greet-button" onClick={() =>{greetFunction()}}>
        Click me
      </button>
      <div id="message">
      </div>
      <Composant >
        <div>test</div>
        </Composant>
    </main>
  );
}

export default App;
