import React from 'react'
import { typeTodo } from '../../type/TypeTodo'
import './BulkAction.css'
interface BulkActionProps{
    item?:typeTodo,
    bulkDelete:() =>void 
}
function BulkAction(props: BulkActionProps) {
    const {item,bulkDelete} = props
  return (
    <div className="bulk-action">
           <p>Bulk Action</p>
            <div>
                <button className="btn btn-detail">Done</button>
                <button className="btn btn-delete" onClick={bulkDelete}>Remove</button>
            </div>

        </div>
  )
}

export default BulkAction