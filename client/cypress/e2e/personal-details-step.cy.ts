describe("Personal Details Step", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Shows validation errors when submitting empty form", () => {
    cy.contains("User information");
    cy.contains("Next").click();
    cy.contains("First name is required");
    cy.contains("Last name is required");
    cy.contains("Email is required");
    cy.contains("Employer name is required");
  });

  it("Fills personal details and navigates to loan step for non Employed", () => {
    cy.contains("User information");
    cy.get('[data-testid="input-first-name"]').type("Aldrin");
    cy.get('[data-testid="input-last-name"]').type("Cunanan");
    cy.get('[data-testid="input-email"]').type("aldrincunanan@example.com");

    cy.get('[data-testid="select-employment-status"]').click();
    cy.get("li").contains("Self-Employed").click();
    cy.contains("Next").click();
    cy.contains("Amount to be loaned");
  });

  it("Fills personal details and navigates to loan step for Employed", () => {
    cy.contains("User information");
    cy.get('[data-testid="input-first-name"]').type("Aldrin");
    cy.get('[data-testid="input-last-name"]').type("Cunanan");
    cy.get('[data-testid="input-email"]').type("aldrincunanan@example.com");

    cy.get('[data-testid="select-employment-status"]').click();
    cy.get("li").contains("Employed").click();
    cy.get('[data-testid="input-employer-name"]').type("Driva");
    cy.contains("Next").click();
    cy.contains("Amount to be loaned");
  });

  it("Resets form fields after clicking Reset", () => {
    cy.contains("User information");

    cy.get('[data-testid="input-first-name"]').type("Aldrin");
    cy.get('[data-testid="input-last-name"]').type("Cunanan");
    cy.get('[data-testid="input-email"]').type("aldrincunanan@example.com");
    cy.get('[data-testid="select-employment-status"]').click();
    cy.get("li").contains("Employed").click();
    cy.get('[data-testid="input-employer-name"]').type("Driva");

    cy.contains("Reset").click();

    cy.get('[data-testid="input-first-name"] input').should("have.value", "");
    cy.get('[data-testid="input-last-name"] input').should("have.value", "");
    cy.get('[data-testid="input-email"] input').should("have.value", "");
    cy.get('[data-testid="select-employment-status"]')
      .find("input")
      .should("have.value", "employed");
    cy.get('[data-testid="input-employer-name"] input').should(
      "have.value",
      ""
    );
  });
});
