import React from 'react';

export const TableItemList = ({ tableItems, onToggleChecked, checkedItems}) => {

  return (
    <>
      { tableItems.map((tableItem) => {
        const {id, name, email, createdAt, loginDate, ban} = tableItem
        return (
          <tr key={id + 1}>
            <td>
              <label>
                <input 
                  type="checkbox" 
                  id={id} 
                  onChange={() => onToggleChecked(tableItem)} 
                  checked={checkedItems.includes(tableItem)}
                />
                <span></span>
              </label>
            </td>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{createdAt}</td>
            <td>{loginDate}</td>
            <td>{ban}</td>
          </tr>
        )
      })
      }
    </>
  )
}