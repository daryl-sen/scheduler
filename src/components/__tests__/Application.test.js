import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  toBeInTheDocument,
  queryByText,
  queryByAltText
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe('Application Tests', () => {

  xit("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
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
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // console.log(prettyDOM(appointment));

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));
    // console.log(prettyDOM(appointment));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // console.log(prettyDOM(container));
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();

    // debug();
  });
});
