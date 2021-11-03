import React from "react";
import { render, fireEvent, screen, waitForElement } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it("does not allow to submit with empty 'picture' field", async () => {
    render(<App/>)
    const fileInput = screen.getByLabelText("Picture")

    const submitButton = screen.getByText("Submit")
    expect(submitButton.type).toBe('submit')
    fireEvent.click(submitButton)

    await waitForElement(() =>
      expect(screen.getByText('You need to provide a file')).toBeInTheDocument()
    );
  })
})
