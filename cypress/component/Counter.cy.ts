import Counter from "../../components/Counter.vue";

describe("Counter.cy.ts", () => {
  it("Mounts", () => {
    cy.mount(Counter, {
      props: {
        modelValue: 1,
      },
    });
  });

  it("Increments and decrements", () => {
    cy.mount(Counter, {
      props: {
        modelValue: 0,
      },
    });

    cy.get('[data-cy="decrement"]').click(); // 0 - 1 = -1
    cy.get('[data-cy="increment"]').click(); // -1 + 1 = 0
    cy.get('[data-cy="increment"]').click(); // 0 + 1 = 1
    cy.get('[data-cy="decrement"]').click(); // 1 - 1 = 0
    cy.get('[data-cy="decrement"]').click();
    cy.get('[data-cy="decrement"]').click();
    cy.get('[data-cy="decrement"]').click();

    cy.get(`[data-cy="model-value"]`).should("have.text", "-3");
  });

  it("doesn't decrement below min prop", () => {
    const NEGATIVE_VALUE_THRESHHOLD = 5; // -5

    cy.mount(Counter, {
      props: {
        modelValue: 0,
        min: 0 - NEGATIVE_VALUE_THRESHHOLD,
      },
    });

    for (let i = 0; i < NEGATIVE_VALUE_THRESHHOLD + 5; i++) {
      cy.get('[data-cy="decrement"]').then(($button) => {
        if (!$button.is(":disabled")) {
          cy.wrap($button).click();
        } else {
          cy.log("Button is disabled, skipping click.");
        }
      });
    }

    cy.get('[data-cy="decrement"]').should("be.disabled");

    cy.get(`[data-cy="model-value"]`).should(
      "have.text",
      0 - NEGATIVE_VALUE_THRESHHOLD
    );
  });

  it("doesn't decrement below max prop", () => {
    const POSITIVE_VALUE_THRESHHOLD = 5; // 5

    cy.mount(Counter, {
      props: {
        modelValue: 0,
        max: POSITIVE_VALUE_THRESHHOLD,
      },
    });

    for (let i = 0; i < POSITIVE_VALUE_THRESHHOLD + 5; i++) {
      cy.get('[data-cy="increment"]').then(($button) => {
        if (!$button.is(":disabled")) {
          cy.wrap($button).click();
        } else {
          cy.log("Button is disabled, skipping click.");
        }
      });
    }

    cy.get('[data-cy="increment"]').should("be.disabled");

    cy.get(`[data-cy="model-value"]`).should(
      "have.text",
      POSITIVE_VALUE_THRESHHOLD
    );

    // cy.screenshot("final");
  });
});
