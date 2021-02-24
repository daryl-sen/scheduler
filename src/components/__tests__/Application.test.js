import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, toBeInTheDocument } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe('Application Tests', () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, 'Add'));
    
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    
    debug();

    
    // // Wait until the text "Archie Cohen" is displayed.
    // await waitForElement(() => getByText('Archie Cohen'));


    
    // // Click the first interviewer in the list.
    // fireEvent.click(getByAltText('Sylvia Palmer'));

    // // Click the "Save" button on that same appointment.
    // fireEvent.click(getByText('Save'))

    // Check that the element with the text "Saving" is displayed.
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".


  });
});
