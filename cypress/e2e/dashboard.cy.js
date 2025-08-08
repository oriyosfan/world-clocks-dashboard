// Helpers to interact with the UI in a resilient, user-centric way
const selectors = {
  selectControl: '[data-cy="timezone-select-container"] .ant-select',
  selectSearchInput: '.ant-select-selection-search-input',
  optionList: '.ant-select-item-option',
  card: '[data-cy="clock-card"]',
  cardRemoveBtn: 'button[aria-label="Remove clock"]',
  modal: '[data-cy="tag-user-modal"]',
  modalOk: '[data-cy="tag-user-modal"] .ant-btn-primary',
  modalCancel: '[data-cy="tag-user-modal"] .ant-btn-default',
  modalInput: '[data-cy="tag-user-modal"] input[placeholder="Enter user name..."]',
};

const STORAGE_KEY = 'world-clocks-selected-clocks';

function clearAppState() {
  cy.clearLocalStorage();
  cy.window().then((w) => w.localStorage.removeItem(STORAGE_KEY));
}

describe('World Clocks Dashboard', () => {
  beforeEach(() => {
    clearAppState();
    cy.visit('/');
  });

  it('loads with empty dashboard and timezone selector visible', () => {
    cy.get(selectors.selectControl).should('be.visible');
    cy.get(selectors.card).should('have.length', 0);
  });

  it('adds a clock from the timezone selector', () => {
    cy.get(selectors.selectControl).click();
    cy.get(selectors.optionList).should('have.length.greaterThan', 5);
    cy.get(selectors.optionList).first().click();
    cy.get(selectors.card).should('have.length', 1);
    cy.get(selectors.card).first().should('exist');
  });

  it('prevents adding the same clock twice', () => {
    cy.get(selectors.selectControl).click();
    cy.get(selectors.optionList).first().as('firstOption');
    cy.get('@firstOption').invoke('text').as('selectedLabel');
    cy.get('@firstOption').click();
    cy.get(selectors.card).should('have.length', 1);

    // Try to add the exact same option again by searching for its label; it should not be available
    cy.get(selectors.selectControl).click();
    cy.get('@selectedLabel').then((label) => {
      const text = String(label).trim();
      if (text) {
        cy.get(selectors.selectSearchInput).clear().type(text);
      }
      cy.get(selectors.optionList).should('not.exist');
    });
    cy.get(selectors.card).should('have.length', 1);
  });

  it('persists clocks in localStorage across reloads', () => {
    cy.get(selectors.selectControl).click();
    cy.get(selectors.optionList).eq(1).click();
    cy.get(selectors.card).should('have.length', 1);

    cy.reload();
    cy.get(selectors.card).should('have.length', 1);
  });

  it('removes a clock via the close button', () => {
    cy.get(selectors.selectControl).click();
    cy.get(selectors.optionList).eq(0).click();
    cy.get(selectors.selectControl).click();
    cy.get(selectors.optionList).eq(1).click();
    cy.get(selectors.card).should('have.length', 2);

    cy.get(selectors.card)
      .first()
      .within(() => {
        cy.get(selectors.cardRemoveBtn).click();
      });

    cy.get(selectors.card).should('have.length', 1);
  });

  it('searches the timezone selector', () => {
    cy.get(selectors.selectControl).click();
    cy.get(selectors.selectSearchInput).type('uni');
    cy.get(selectors.optionList).should('exist');
  });
});
