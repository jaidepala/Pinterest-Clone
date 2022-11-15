// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

window.gapi = {auth2: {}, client: {}};
window.gapi.auth2.getAuthInstance = () => {return new function() {
  this.isSignedIn = new function() {
    this.signedIn = false;
    this.get = () => this.signedIn;
    this.listen = (f) => f();
  };
  this.signIn = () => Promise.resolve(this.isSignedIn.signedIn = true);
  this.signOut = () => Promise.resolve(this.isSignedIn.signedIn = false);
  this.currentUser = new function() {
    this.get = () => new function() {
      this.getId = () => "XYZ";
      this.getAuthResponse = () => new function() {
        this.id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      };
      this.getBasicProfile = () => new function() {
        this.getName = () => "Mr Test";
        this.getEmail = () => "test@email.com";
        this.getImageUrl = () => "http://email.com/image";
      };
    };
  };
};}
window.gapi.auth2.init = () => {return Promise.resolve({});}
window.gapi.client.init = (v) => true;
window.gapi.load = (a, f) => f();
