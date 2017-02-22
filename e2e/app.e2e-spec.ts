import { RoutingFormPage } from './app.po';

describe('routing-form App', () => {
  let page: RoutingFormPage;

  beforeEach(() => {
    page = new RoutingFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rf works!');
  });
});
