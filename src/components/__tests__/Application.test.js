import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, toBeInTheDocument, queryByText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe('Application Tests', () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it.only("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);
    
    // wait for an element with the name archie cohen to appear
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // look for the first appointment, which is empty
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, 'Add'));
    
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // save the appointment
    fireEvent.click(getByText(appointment, "Save"));

    // check for the saving status
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    // check for the new appointment
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // debug();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // console.log(prettyDOM(day));

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
    // how?? It started with 3 spots available, we're adding one more appointment, and now it's down to zero??
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1" , async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    console.log(prettyDOM(prettyDOM(container)));

    // hover over the appointment and click on delete

    // check that the delete confirmation appears

    // click on the delete button

    // check that the status with 'deleting' appears

    // check that the same appointment is now empty
  
    // check that one more spot has opened up
  });
});
