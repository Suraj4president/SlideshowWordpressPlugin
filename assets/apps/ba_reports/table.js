import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`

const Table_ = styled.table`

  td {
    border: 1px solid #ccc;
    background: #eee;
    cursor: pointer;
  }
`

const getId = (index) => JSON.stringify(index)

const Table = ({ list }) => {
  return (
    <Wrapper>
      <Table_ className="widefat">
        <thead>
          <tr>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
        {list.map((item, index) => (
          <tr key={getId(index)}>
            <td><pre>{JSON.stringify(item, ['username', '2', '3', '4', '5', '6'], 4)}</pre></td>
          </tr>
        ))}
        {list.length === 0 && <tr><td>No answers found</td></tr>}
        </tbody>
        <tfoot>
          <tr>
            <th>The End</th>
          </tr>
        </tfoot>
      </Table_>
  </Wrapper>
  )
}

export default Table
