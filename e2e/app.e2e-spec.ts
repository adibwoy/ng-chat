import { NgChatPage } from './app.po';

describe('ng-chat App', () => {
  let page: NgChatPage;

  beforeEach(() => {
    page = new NgChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
