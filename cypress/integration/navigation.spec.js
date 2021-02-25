describe("Navigation", () => {

  xit("should visit root", () => {
    cy.visit("/");
  });

  it('should navigate to Tuesday', () => {
    // 1. Visit root of webserver
    cy.visit('/');

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});