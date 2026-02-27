describe('Страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/orders', { body: [] }).as('getOrders');

    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearAuth();
  });

  const closeModalByTitle = (title: string) => {
    cy.contains('h3', title)
      .should('exist')
      .parent() // header div
      .find('button[type="button"] svg') // <-- ВАЖНО: кликаем по иконке
      .click({ force: true });
  };

  const closeAnyModal = () => {
    cy.get('h3.text_type_main-large')
      .should('exist')
      .parent()
      .find('button[type="button"] svg') // <-- ВАЖНО: кликаем по иконке
      .click({ force: true });
  };

  it('Добавление ингредиентов в конструктор (булка + начинка)', () => {
    cy.contains('Булка тестовая').parents('li').contains('Добавить').click();
    cy.contains('Начинка тестовая').parents('li').contains('Добавить').click();

    cy.contains('Булка тестовая').should('exist');
    cy.contains('Начинка тестовая').should('exist');
  });

  it('Модалка ингредиента: открытие и закрытие по крестику', () => {
    cy.contains('Булка тестовая').click();

    cy.url().should('include', '/ingredients/bun_1');
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Булка тестовая').should('exist');

    closeModalByTitle('Детали ингредиента');

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Модалка ингредиента: закрытие по оверлею', () => {
    cy.contains('Начинка тестовая').click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('body').click(10, 10);

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Создание заказа: токены, мок user, мок order, очистка конструктора', () => {
    cy.setAuth();

    cy.contains('Булка тестовая').parents('li').contains('Добавить').click();
    cy.contains('Начинка тестовая').parents('li').contains('Добавить').click();

    cy.contains('Оформить заказ').click();

    cy.wait('@postOrder');
    cy.contains('12345').should('exist');

    closeAnyModal();

    cy.contains('12345').should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});