describe('Appointments', () => {

  beforeEach(() => {
    // reset DB
    const method = 'GET';
    const url = 'http://localhost:8001/api/debug/reset';
    cy.request(method, url);
    
    cy.visit('/')

    cy.contains("[data-testid=day]", 'Monday');
  });
  
  it('should book an interview', () => {
        
    // Clicks on the "Add" button in the second appointment
    cy.get("[data-testid=appointment]")
      .eq(1)
      .get('[alt="Add"]')
      .first()
      .click();
    
    // Enters their name
    cy.get('[data-testid="student-name-input"]')
      .type('Lydia Miller-Jones');

    // Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click();

    // Clicks the save button
    cy.contains('Save')
      .click();

    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    // Go to the target appointment
    cy.get('[alt="Edit"]')
      .click({force: true})

    // Change appointment name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones")
    
    // Changes the name and interviewer
      .get('[alt="Tori Malcolm"]')
      .click()

    // Clicks the save button
    cy.contains('Save')
      .click();
    
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains("Tori Malcolm");
  });

  it('should cancel an interview', () => {
    // Clicks the delete button for the existing appointment
    cy.get('[alt="Delete"]')
      .click({force: true})
    
    // Checks for the confirmation message
    cy.contains('Are you sure you want to delete this appointment?')
    
    // Clicks the confirm button
    cy.contains('button', 'Confirm')  
      .click()
    
    // Checks for the deleting status
    cy.contains('DELETING...')
      .should('exist');
    
    cy.contains("Deleting").should("not.exist");
    
    // Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
    
  });

});