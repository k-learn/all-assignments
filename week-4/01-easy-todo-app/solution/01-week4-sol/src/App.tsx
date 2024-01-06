import { FormEvent, useEffect, useState } from 'react'
import './App.css'

type Ttodo = {
    title: string,
    description: string,
    completed: boolean,
    id: string
}

function useTodos() {

    const arr: Ttodo[] = []
    const [todos, setTodos] = useState(arr)

    useEffect(() => {
        setInterval(() => {
            fetch("http://localhost:3000/todos", {
                method: "GET"
            }).then(response => {
                    response.json().then(data => setTodos(data))
                })        
        }, 5000)
    }, [])

    return todos
}

function App() {
   
    const todos = useTodos()

    const finishOff = (id: string) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE"
        }).then(respone => console.log(respone))
    }

    console.log(todos)
    return (
        <div>
            <div>
                <TodoForm />
            </div>
            <div>
                {todos.map(todo => <Todo title={todo.title} description={todo.description} clicked={() => finishOff(todo.id)} key={todo.id}/>)}
            </div>
        </div>
    )
}

function TodoForm() {

    const createIt = (e : FormEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & { title: {value: string}, description: { value: string } }
        const title = target.title.value
        const description = target.description.value

        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, description: description, completed: false })
        }).then(response => console.log(response))
    }

    return (
        <form onSubmit={createIt}>
            <div>
                <label>
                    Title: 
                    <input type="text" name='title' />
                </label>
            </div>
            <div>
                <label>
                    Description: 
                    <input type="text" name='description'/>
                </label>
            </div>
            <button type='submit'>Click me!</button>
        </form>
    )
}

function Todo({ title, description, clicked }: { title: string, description: string, clicked: () => void }) {

    return (
        <div>
            Title: {title}
            <br />
            Description : {description}
            <br />
            <button onClick={clicked}>Don't touch me</button>
        </div>
    )
}

export default App
