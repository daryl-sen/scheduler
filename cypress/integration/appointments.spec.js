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
    // cy.get("[data-testid=appointment]")
    //   .eq(1)
    //   .get('main')
    //   .first()
    //   .should("have.class", ".appointment__card--show");
    //   // .contains('Lydia Miller-Jones')
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

});