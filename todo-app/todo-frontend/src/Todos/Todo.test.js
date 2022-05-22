import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Todo }  from './Todo'

test('renders todo', () => {
  const todo = {
    text: 'Have to go to store',
    done: false
  }

  render(<Todo todo={todo} completeTodo={() => {}} deleteTodo={() => {}} />)

  const todotext = screen.getByText('Have to go to store')
  expect(todotext).toBeDefined()

})
