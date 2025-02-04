// 👇 YOUR WORK STARTS ON LINE 19
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../../backend/mock-server'
import App from '../App'

describe('Stranger Things App', () => {
  let user
  afterEach(() => {
    server.resetHandlers()
  })
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })
  beforeEach(() => {
    render(<App />)
    user = userEvent.setup()
  })

  test('App mounts without crashing', () => {
    // 👉 TASK: print the simulated DOM using screen.debug
    screen.debug()
  })

  test('App renders the correct texts', async () => {
    // 👉 TASK: click on the button that displays "Press to Get Show Data"
    const fetchButton = screen.getByRole('button', { name: /Press to Get Show Data/i })
    await user.click(fetchButton)

    // 👉 TASK: create a waitFor and await for the following to be true:
    await waitFor(() => {
      expect(screen.queryByText(/Press to Get Show Data/i)).not.toBeInTheDocument()
      expect(screen.getByText(/Stranger Things/i)).toBeInTheDocument()
      expect(
        screen.getByText(/A love letter to the '80s classics that captivated a generation/i, { exact: false })
      ).toBeInTheDocument()
      expect(screen.getByText(/Select A Season/i)).toBeInTheDocument()
    })

    const seasonDropdown = screen.getByRole('combobox') // Gets the dropdown
    await user.selectOptions(seasonDropdown, '2') // Selects Season 2

    // 👉 TASK: create the following assertions:
    await waitFor(() => {
      // ❗ Ensure Season 2, Episode 1 appears
      expect(screen.getByText(/Season 2, Episode 1/i)).toBeInTheDocument()
      // ❗ Ensure the first episode's name appears
      expect(screen.getByText(/Chapter One: MADMAX/i)).toBeInTheDocument()
      // ❗ Ensure episode summary is displayed
      expect(
        screen.getByText(/One year after the events with the Upside Down and the Demogorgon/i, { exact: false })
      ).toBeInTheDocument()
    })
  })
})
