import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {RegistrationPage} from './RegistrationPage';

describe('RegistrationPage', () => {
    describe('Layout', () => {
        it('has header of Register' , () => {
            const {container} = render(<RegistrationPage/>);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Register'); 
        })
        it("has input for Username", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage/>);
            const usernameInput = queryByPlaceholderText("Your name");
            expect(usernameInput).toBeInTheDocument();
          });
          it("has input for email", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const emailInput = queryByPlaceholderText("Your email");
            expect(emailInput).toBeInTheDocument();
          });
          it("has input for password", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const passwordInput = queryByPlaceholderText("Your password");
            expect(passwordInput).toBeInTheDocument();
          });
          it("has password type for password input", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const passwordInput = queryByPlaceholderText("Your password");
            expect(passwordInput.type).toBe("password");
          });
          it("has input for password repeat", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const passwordRepeat = queryByPlaceholderText("Repeat your password");
            expect(passwordRepeat).toBeInTheDocument();
          });
          it("has password type for password repeat input", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const passwordRepeat = queryByPlaceholderText("Repeat your password");
            expect(passwordRepeat).toBeInTheDocument();
          });
          it("has submit button", () => {
            const { container } = render(<RegistrationPage />);
            const button = container.querySelector("button");
            expect(button).toBeInTheDocument();
          });
    });
    describe("Interactions", () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        }

        const mockAsyncDelayed = () => { 
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                    resolve({});
                    }, 300)
                })
             })
        }
        let button, usernameInput, emailInput, passwordInput, passwordRepeat;

        const setupForSubmit = (props) => {
            const rendered = render(<RegistrationPage {...props} />);
            const { container, queryByPlaceholderText } = rendered;

            usernameInput = queryByPlaceholderText("Your name");
            emailInput = queryByPlaceholderText("Your email");
            passwordInput = queryByPlaceholderText("Your password");
            passwordRepeat = queryByPlaceholderText("Repeat your password");

            fireEvent.change(usernameInput, changeEvent("my-name"));
            fireEvent.change(emailInput, changeEvent("my-email"));
            fireEvent.change(passwordInput, changeEvent("P4ssword"));
            fireEvent.change(passwordRepeat, changeEvent("P4ssword"));

            button = container.querySelector("button");

            return rendered;
        }

        it("sets the displayName value into state", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const usernameInput = queryByPlaceholderText("Your name");
      
            fireEvent.change(usernameInput, changeEvent("my-name"));
            expect(usernameInput).toHaveValue("my-name");
          });
          it("sets the email value into state", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const usernameInput = queryByPlaceholderText("Your email");
      
            fireEvent.change(usernameInput, changeEvent("my-email"));
      
            expect(usernameInput).toHaveValue("my-email");
          });
          it("sets the password value into state", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const passwordInput = queryByPlaceholderText("Your password");
      
            fireEvent.change(passwordInput, changeEvent("P4ssword"));
      
            expect(passwordInput).toHaveValue("P4ssword");
          });
          it("sets the password repeat value into state", () => {
            const { queryByPlaceholderText } = render(<RegistrationPage />);
            const passwordRepeat = queryByPlaceholderText("Repeat your password");
      
            fireEvent.change(passwordRepeat, changeEvent("P4ssword"));
      
            expect(passwordRepeat).toHaveValue("P4ssword");
          });
          it("calls postRegister when the fields are valid and the actions are provided in props", () => {
            const actions = {
              postRegister: jest.fn().mockResolvedValueOnce({}),
            };
      
            setupForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postRegister).toHaveBeenCalledTimes(1);
          });

          it("does not throw exeptions when clicking the button when actions not provided in props", () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
          });

          it("calls post with user body when fields are valid", () => {
            const actions = {
              postRegister: jest.fn().mockResolvedValueOnce({}),
            };
      
            setupForSubmit({ actions });
            fireEvent.click(button);

            const expectedUserObject = {
                username: 'my-name',
                email: 'my-email',
                password: 'P4ssword'
            }
            expect(actions.postRegister).toHaveBeenCalledWith(expectedUserObject);
          });

          it("does not allow user to click the Sign Up button when there is an ongoing api call", () => {
            const actions = {
              postRegister: mockAsyncDelayed()
              
            };
      
            setupForSubmit({ actions });
            fireEvent.click(button);
            fireEvent.click(button);

            expect(actions.postRegister).toHaveBeenCalledTimes(1);

          });

          it("displays spinner when there is an ongoing api call", () => {
            const actions = {
              postRegister: mockAsyncDelayed(),
            };
      
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            const spinner = queryByText("Loading...");
            expect(spinner).toBeInTheDocument();
          });
      
          it("hides spinner after api call finishes successfully", async () => {
            const actions = {
                postRegister: mockAsyncDelayed(),
            };
      
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            await waitFor(() =>
              expect(queryByText("Loading...")).not.toBeInTheDocument()
            );
          });
      
          it("hides spinner after api call finishes with error", async () => {
            const actions = {
              postRegister: jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    reject({
                      response: { data: {} },
                    });
                  }, 300);
                });
              }),
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            await waitFor(() =>
              expect(queryByText("Loading...")).not.toBeInTheDocument()
            );
          });

          it("displays validation error for username when error is received for the field", async () => {
            const actions = {
              postRegister: jest.fn().mockRejectedValue({
                response: {
                  data: {
                    validationErrors: {
                      username: "Cannot be null",
                    },
                  },
                },
              }),
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            await waitFor(() => {
              errorMessage = queryByText("Cannot be null");
              expect(errorMessage).toBeInTheDocument();
            });
          });
          it("enables the signup button when password and repeat password have same value", () => {
            setupForSubmit();
            expect(button).not.toBeDisabled();
          });
          it("disables the signup button when password repeat does not match to password", () => {
            setupForSubmit();
            fireEvent.change(passwordRepeat, changeEvent("new-pass"));
            expect(button).toBeDisabled();
          });

          it("disables the signup button when password does not match to password repeat", () => {
            setupForSubmit();
            fireEvent.change(passwordInput, changeEvent("new-pass"));
            expect(button).toBeDisabled();
          });
          it("displays error style for password repeat input when password repeat mismatch", () => {
            const { queryByText } = setupForSubmit();
            fireEvent.change(passwordRepeat, changeEvent("new-pass"));
            const mismatchWarning = queryByText("Does not match to password");
            expect(mismatchWarning).toBeInTheDocument();
          });
      
          it("displays error style for password repeat input when password input mismatch", () => {
            const { queryByText } = setupForSubmit();
            fireEvent.change(passwordInput, changeEvent("new-pass"));
            const mismatchWarning = queryByText("Does not match to password");
            expect(mismatchWarning).toBeInTheDocument();
          });
          it("hides validation error when user changes the content of username", async () => {
            const actions = {
              postRegister: jest.fn().mockRejectedValue({
                response: {
                  data: {
                    validationErrors: {
                      username: "username cannot be null",
                    },
                  },
                },
              }),
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            await waitFor(() => queryByText("username cannot be null"));
            fireEvent.change(usernameInput, changeEvent("name updated"));
      
            const errorMessage = queryByText("Cannot be null");
            expect(errorMessage).not.toBeInTheDocument();
          });
      
          it("hides validation error when user changes the content of email", async () => {
            const actions = {
              postRegister: jest.fn().mockRejectedValue({
                response: {
                  data: {
                    validationErrors: {
                      email: "Email cannot be null",
                    },
                  },
                },
              }),
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            await waitFor(() => queryByText("Email cannot be null"));
            fireEvent.change(emailInput, changeEvent("email updated"));
      
            const errorMessage = queryByText("Cannot be null");
            expect(errorMessage).not.toBeInTheDocument();
          });
      
          it("hides validation error when user changes the content of password", async () => {
            const actions = {
              postRegister: jest.fn().mockRejectedValue({
                response: {
                  data: {
                    validationErrors: {
                      password: "Password cannot be null",
                    },
                  },
                },
              }),
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
      
            await waitFor(() => queryByText("Password cannot be null"));
            fireEvent.change(passwordInput, changeEvent("updated-password"));
      
            const errorMessage = queryByText("Cannot be null");
            expect(errorMessage).not.toBeInTheDocument();
          });
          it("redirects to homePage after successful registration", async () => {
            const actions = {
              postRegister: jest.fn().mockResolvedValue({}),
            };
    
            const history = {
              push: jest.fn(),
            };
    
            setupForSubmit({ actions, history });
            fireEvent.click(button);
    
            await waitFor(() => expect(history.push).toHaveBeenCalledWith("/"));
          });
    });
})

console.error = () => {};