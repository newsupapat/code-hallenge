import React from 'react'
import { Table, Header, Label } from 'semantic-ui-react'

const Ins = () => {
  return (
    <>
      <Label as='a' color='red' ribbon>
        GOAL
      </Label>
      <Header as='h3' style={{ textIndent: '50px' }}>
        You are given a string representing a website's address. To calculate
        the IP address you must convert all the characters into ASCII code, then
        calculate the sum of the values. Example: abc -> 97+98+99 -> 294 The
        first IP number will be the result mod 256. Because there is no IP
        number bigger than 256. The second IP number will be the double of the
        sum mod 256, the third will be the triple of the sum mod 256 and the
        fourth will be quadruple of the sum, mod 256. This is not a real
        algorithm, this is only a adaptation to Clash of Code.
      </Header>
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Input</Table.HeaderCell>
            <Table.HeaderCell>Output</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>[1,2,3,4,5]</Table.Cell>
            <Table.Cell>[1,2,6,24,120]</Table.Cell>
            <Table.Cell textAlign='right'>None</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell textAlign='right'>None</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>120</Table.Cell>
            <Table.Cell textAlign='right'>None</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  )
}

export default Ins
