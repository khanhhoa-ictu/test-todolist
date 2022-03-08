import React, { ChangeEvent, useEffect, useState } from 'react'
import { typeTodo } from '../../type/TypeTodo'
import BulkAction from '../BulkAction/BulkAction';
import ModalAddTodo from '../ModalAddTodo/ModalAddTodo';
import Todo from '../Todo/Todo'
import './TodoList.css'
interface TodoListProps {
  data: typeTodo[],
  handleDelete: (id: string) => void,
  handleUpdateTodo: (newTodo: typeTodo) => void,
  handleSearch: (value: string) => void,
  deleteItemSelect: (checkedId: string[]) => void
  handleAddTodo?: (newTodo: typeTodo) => void
}

function TodoList(props: TodoListProps) {
  const { data, handleDelete, handleUpdateTodo, handleSearch, deleteItemSelect, handleAddTodo = () => { } } = props;
  const [checked, setChecked] = useState<string[]>([]);
  const [sortData, setSortData] = useState<typeTodo[]>(data);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const handleCheck = (id: string) => {
    if (id) {
      setChecked((prev) => {
        const isChecked = checked.includes(id);
        if (isChecked) {
          return checked.filter(item => item !== id)
        } else {
          return [...prev, id]
        }
      })
    }


  }
  const bulkDelete = () => {
    deleteItemSelect(checked);
    setChecked([]);
  }
  useEffect(() => {
    const newData = data.sort((a, b) => {
      const timea = new Date(a.date)
      const timeb = new Date(b.date)
      return timea.getTime() - timeb.getTime()
    })
    setSortData(newData)
  }, [data])
  return (
    <div className="todo-container">
      <div className="btn-hidden">
        <div className="header-todo">
          <div className="add-todo" onClick={() => setIsOpenModalAdd(true)}>
            + New Todo
          </div>
        </div>
      </div>


      <input 
        type='text' 
        placeholder='Search' 
        className='search' 
        onChange={(e:ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)} 
      />
      <div>
        {sortData.map((item, key) => {
          return <Todo
            item={item}
            key={key}
            handleDelete={handleDelete}
            handleUpdateTodo={handleUpdateTodo}
            handleCheck={handleCheck}
            checked={checked}
          />
        })}

      </div>
      {checked.length > 0 && <BulkAction bulkDelete={bulkDelete} />}
      <ModalAddTodo isOpen={isOpenModalAdd} handleAddTodo={handleAddTodo} onClose={() => setIsOpenModalAdd(false)} />
    </div>
  )
}

export default TodoList