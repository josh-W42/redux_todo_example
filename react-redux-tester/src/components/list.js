import React from 'react';

const List = props => {
  return (
    <ul>
      {props.items.map((data) => (
        <li key={data.id}>
          <span
            onClick={() => props.toggle && props.toggle(data.id)}
            style={{ textDecoration: data.complete ? 'line-through' : 'none' }}
          >
            {data.name}
          </span>
          <button onClick={() => props.remove(data)}>X</button>
        </li>
      ))}
    </ul>
  )
}

export default List;