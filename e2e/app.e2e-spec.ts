import { CashburndownSitePage } from './app.po';

describe('cashburndown-site App', function() {
  let page: CashburndownSitePage;

  beforeEach(() => {
    page = new CashburndownSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
