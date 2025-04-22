describe("Lender Suggestions Step", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3001/api/loans/calculate-lenders", {
      statusCode: 200,
      body: [
        {
          id: "lender-a",
          name: "Lender A",
          interest: 5.5,
          fee: "$10 processing fee",
          monthly: 153,
        },
        {
          id: "lender-b",
          name: "Lender B",
          interest: 5,
          fee: "$15 application fee",
          monthly: 151,
        },
        {
          id: "lender-c",
          name: "Lender C",
          interest: 6,
          monthly: 155,
        },
      ],
    }).as("calculateLenders");

    cy.visit("http://localhost:3000");

    cy.get('[data-testid="input-first-name"]').type("Aldrin");
    cy.get('[data-testid="input-last-name"]').type("Cunanan");
    cy.get('[data-testid="input-email"]').type("aldrincunanan@example.com");

    cy.get('[data-testid="select-employment-status"]').click();
    cy.get("li").contains("Employed").click();
    cy.get('[data-testid="input-employer-name"]').type("Driva");

    cy.contains("Next").click();

    cy.contains("Amount to be loaned");
    cy.get('[data-testid="select-loan-purpose"]').click();
    cy.get("li").contains("Vehicle").click();
    cy.get('[data-testid="input-loan-amount"]').clear().type("10000");
    cy.get('[data-testid="input-deposit"]').clear().type("2000");
    cy.get('[data-testid="input-loan-term"]').clear().type("5");

    cy.contains("Submit").click();

    cy.wait("@calculateLenders").then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      expect(response?.body).to.have.length(3);
    });

    cy.contains("Loan Suggestions");
  });

  it("should display all lenders and check each lender", () => {
    cy.get('[data-testid="lender-list"]')
      .should("exist")
      .find('[data-testid^="lender-card-"]')
      .should("have.length", 3);

    cy.get('[data-testid="lender-card-lender-a"]')
      .should("exist")
      .contains("Lender A");

    cy.get('[data-testid="lender-card-lender-b"]')
      .should("exist")
      .contains("Lender B");

    cy.get('[data-testid="lender-card-lender-c"]')
      .should("exist")
      .contains("Lender C");
  });

  it("should go back to the loan form when clicking Back", () => {
    cy.contains("Back").click();
    cy.contains("Amount to be loaned").should("exist");

    cy.get('[data-testid="select-loan-purpose"]')
      .find("input")
      .should("have.value", "vehicle");
    cy.get('[data-testid="input-loan-amount"] input').should(
      "have.value",
      "10000"
    );
    cy.get('[data-testid="input-deposit"] input').should("have.value", "2000");
    cy.get('[data-testid="input-loan-term"] input').should("have.value", "5");
  });

  it("should reset and go back to the first step when clicking Again", () => {
    cy.contains("Again").click();
    cy.contains("User information").should("exist");
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
