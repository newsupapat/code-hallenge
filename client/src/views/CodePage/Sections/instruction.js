import React from 'react'
import { Table, Header, Label } from 'semantic-ui-react'
import { max } from 'moment'

const Ins = ({ des, input, output }) => {
  return (
    <>
      <Label as='a' color='red' ribbon>
        GOAL
      </Label>
      <Header as='h3' style={{ textIndent: '50px' }}>
        {des}
      </Header>
      <Table
        celled
        inverted
        selectable
        style={{
          fontSize: '10px',
          fontFamily: `"Press Start 2P", cursive`
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Input</Table.HeaderCell>
            <Table.HeaderCell>Output</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {[...Array(input.length)].map((_, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>{input[i] || null}</Table.Cell>
                <Table.Cell>{output[i] || null}</Table.Cell>
                <Table.Cell textAlign='right'>None</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default Ins
