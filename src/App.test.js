import React from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it("does not allow to submit with empty 'picture' field", async () => {
    render(<App/>)
    
    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText('You need to provide a file')).toBeInTheDocument()
    );
  })

  it("does not allow to submit a file bigger than 2mb", async () => {
    render(<App/>)
    let file = new File(['(⌐□_□)'], 'picture.jpeg', { type: 'image/jpeg' });
    file = Object.defineProperty(file, 'size', {value: 3000000})

    const fileInput = screen.getByLabelText("Picture")
    fireEvent.change(fileInput, { target: { files: [file] } })

    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText('The file is too large')).toBeInTheDocument()
    );
  })

  it("only allows *.jpeg images", async () => {
    render(<App/>)
    let file = new File(['(⌐□_□)'], 'picture.png', { type: 'image/png' });

    const fileInput = screen.getByLabelText("Picture")
    fireEvent.change(fileInput, { target: { files: [file] } })

    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText('We only support jpeg')).toBeInTheDocument()
    );
  })
})
