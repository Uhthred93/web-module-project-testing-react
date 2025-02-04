import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Episode from "../Episode"

const exampleEpisodeData = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary: "A young boy mysteriously disappears, and his panicked mother \
  demands that the police find him. Meanwhile, the boy's friends conduct \
  their own search, and meet a mysterious girl in the forest.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
}

describe('Episode component', () => {
  test("renders without error", () => {
    render(<Episode episode={exampleEpisodeData} />)
    screen.debug() // Debugging to inspect the DOM
  })

  test("renders texts and alt texts correctly", () => {
    const { rerender } = render(<Episode episode={exampleEpisodeData} />)

    // ✅ Check that the summary is displayed
    expect(screen.getByText(/A young boy mysteriously disappears/i)).toBeInTheDocument()

    // ✅ Check that an image with an alt text containing "episode image" is present
    expect(screen.getByAltText(/episode image/i)).toBeInTheDocument()

    // ✅ Rerender with missing image to test default placeholder
    rerender(<Episode episode={{ ...exampleEpisodeData, image: null }} />)

    // ✅ Ensure the default image placeholder is used
    const defaultImage = screen.getByRole("img")
    expect(defaultImage).toHaveAttribute("src", "https://via.placeholder.com/210x295")

    // ✅ Check that the image still exists in the DOM
    expect(screen.getByRole("img")).toBeInTheDocument()

    // ✅ Rerender with no episode prop at all
    rerender(<Episode episode={null} />)

    // ✅ Ensure the "Loading episode..." text appears
    expect(screen.getByText(/Loading episode.../i)).toBeInTheDocument()
  })
})