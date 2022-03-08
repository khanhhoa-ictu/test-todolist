  import React, { useState } from 'react';
  import { v4 as uuid4 } from 'uuid';
  import AddTodo from './components/AddTodo/AddTodo';
  import TodoList from './components/TodoList/TodoList';
  import { typeTodo } from './type/TypeTodo';
  function App() {
    const initData = JSON.parse(localStorage.getItem('todo') || '[]')
  
    const [data, setData] = useState<typeTodo[]>(initData);
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState(data);
    
    const handleAddTodo = (newTodo: typeTodo) => {
      const newData = [...data]
      newData.push(newTodo);
      setData(newData)
      localStorage.setItem('todo',JSON.stringify(newData))
    
    }

    const handleDelete = (id: string) => {
      const index = data.findIndex((item: { id: string; }) => item.id === id);
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      localStorage.setItem('todo',JSON.stringify(newData))
    }

    const handleUpdateTodo = (newTodo: typeTodo) => {
      const index = data.findIndex((item: { id: string; }) => item.id === newTodo.id);
      const newData = [...data];
      newData[index] = newTodo;
      setData(newData);
      localStorage.setItem('todo',JSON.stringify(newData))
    }

    const handleSearch = (value: string) => {
      setSearch(value)
      const newData = [...data]
      if (value) {
        let filterData = newData.filter((item) =>
          item.taskName.trim().toLowerCase().includes(value.trim().toLowerCase())
        )
        setSearchResult(filterData)
      } else {
        setSearchResult(data)
      }
    }

    const deleteItemSelect = (CheckedId: string[])=> {
      const  updateData = [...data].filter((item) => !CheckedId.includes(item.id))
      setData(updateData)
      localStorage.setItem('todo',JSON.stringify(updateData))

    }
    
    return (
      <div className='container'>
        <div className='new-task'>
          <h3>New Task</h3>
          <AddTodo handleAddTodo={handleAddTodo} />
        </div>
        <div className='todo-list'>
          <h3>To Do List</h3>
          <TodoList
            data={!search ? data : searchResult}
            handleDelete={handleDelete}
            handleUpdateTodo={handleUpdateTodo}
            handleSearch={handleSearch}
            deleteItemSelect={deleteItemSelect}
            handleAddTodo={handleAddTodo}
          />
        </div>

      </div>
    );
  }

  export default App;
