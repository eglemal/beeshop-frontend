import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import axios from 'axios';
import configureStore from './redux/configureStore';

beforeEach(() => {
  localStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
})

const setup = (path) => {
  const store = configureStore(false);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

const changeEvent = (content) => {
  return {
    target: {
      value: content,
    },
  };
};

describe('App', () => {
  it('displays homepage when url is /', () => {
    const { queryByTestId } = setup('/');
    expect(queryByTestId('homepage')).toBeInTheDocument();
  })
  it('displays loginPage when url is /login', () => {
    const { container } = setup('/login');
    const header = container.querySelector('h1');
    expect(header).toHaveTextContent('Login');
  })
  it("displays only LoginPage when url is /login", () => {
    const { queryByTestId } = setup("/login");
    expect(queryByTestId("homepage")).not.toBeInTheDocument();
  });
  it("displays RegistrationPage when url is /register", () => {
    const { container } = setup("/register");
    const header = container.querySelector("h1");
    expect(header).toHaveTextContent("Register");
  });
  it("displays My Cart on TopBar after login success", async () => {
    const { queryByPlaceholderText, container, queryByText } = setup("/login");
    const usernameInput = queryByPlaceholderText("Your username");
    fireEvent.change(usernameInput, changeEvent("user1"));
    const passwordInput = queryByPlaceholderText("Your password");
    fireEvent.change(passwordInput, changeEvent("P4ssword"));
    const button = container.querySelector("button");
    axios.post = jest.fn().mockResolvedValue({
      data: {
        id: 1,
        username: "user1",
        email: "test@email",
      },
    });
    fireEvent.click(button);

    await waitFor(() => expect(queryByText("My Cart")).toBeInTheDocument());
  });
  it("displays My Cart on TopBar after register success", async () => {
    const { queryByPlaceholderText, container, queryByText } = setup("/register");
    const usernameInput = queryByPlaceholderText("Your name");
    const emailInput = queryByPlaceholderText("Your email");
    const passwordInput = queryByPlaceholderText("Your password");
    const passwordRepeat = queryByPlaceholderText("Repeat your password");

    fireEvent.change(usernameInput, changeEvent("user1"));
    fireEvent.change(emailInput, changeEvent("test@email"));
    fireEvent.change(passwordInput, changeEvent("P4ssword"));
    fireEvent.change(passwordRepeat, changeEvent("P4ssword"));

    const button = container.querySelector("button");
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          message: "User saved",
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 1,
          username: "user1",
          email: "test@email",
        },
      });
    fireEvent.click(button);

    await waitFor(() => expect(queryByText("My Cart")).toBeInTheDocument());
  });
  it("saves logged in user data to localStorage after login success", async () => {
    const { queryByPlaceholderText, container, queryByText } = setup("/login");
    const usernameInput = queryByPlaceholderText("Your username");
    fireEvent.change(usernameInput, changeEvent("user1"));
    const passwordInput = queryByPlaceholderText("Your password");
    fireEvent.change(passwordInput, changeEvent("P4ssword"));
    const button = container.querySelector("button");
    axios.post = jest.fn().mockResolvedValue({
      data: {
        id: 1,
        username: "user1",
        email: "test@email",
      },
    });
    fireEvent.click(button);

    await waitFor(() => queryByText("My Cart"));

    const dataInStorage = JSON.parse(localStorage.getItem("user-info"));
    expect(dataInStorage).toEqual({
      id: 1,
      username: "user1",
      email: "test@email",
      password: "P4ssword",
      isLoggedIn: true,
    });
  });
  // it("displays logged in topBar when storage has logged in user data", () => {
  //     localStorage.setItem(
  //       "user-info",
  //       JSON.stringify({
  //             id: 1,
  //             username: "user1",
  //             email: "test@email",
  //             password: "P4ssword",
  //             isLoggedIn: true,
  //       })
  //     );
  //     const { queryByText } = setup("/");
  //     const myCartLink = queryByText("My Cart");
  //     expect(myCartLink).toBeInTheDocument();
  //   });
  it("sets axios authorization with base64 encoded user credentials after login success", async () => {
    const { queryByPlaceholderText, container, queryByText } = setup("/login");
    const usernameInput = queryByPlaceholderText("Your username");
    fireEvent.change(usernameInput, changeEvent("user1"));
    const passwordInput = queryByPlaceholderText("Your password");
    fireEvent.change(passwordInput, changeEvent("P4ssword"));
    const button = container.querySelector("button");
    axios.post = jest.fn().mockResolvedValue({
      data: {
        id: 1,
        username: "user1",
        email: "test@email",
      },
    });
    fireEvent.click(button);

    await waitFor(() => queryByText("My Cart"));

    const axiosAuthorization = axios.defaults.headers.common['Authorization'];
    const encoded = btoa('user1:P4ssword');
    const expectedAuthorization = `Basic ${encoded}`;
    expect(axiosAuthorization).toBe(expectedAuthorization);
  });
  // it("sets axios authorization with base64 encoded user credentials when storage has logged in user data", () => {
  //   localStorage.setItem(
  //     "user-info",
  //     JSON.stringify({
  //       id: 1,
  //       username: "user1",
  //       email: "test@email",
  //       password: "P4ssword",
  //       isLoggedIn: true,
  //     })
  //   );
  //   setup("/");
  //   const axiosAuthorization = axios.defaults.headers.common['Authorization'];
  //   const encoded = btoa('user1:P4ssword');
  //   const expectedAuthorization = `Basic ${encoded}`;
  //   expect(axiosAuthorization).toBe(expectedAuthorization);
  // });
  // it("removes axios authorization header when user logout", () => {
  //   localStorage.setItem(
  //     "user-info",
  //     JSON.stringify({
  //       id: 1,
  //       username: "user1",
  //       email: "test@email",
  //       password: "P4ssword",
  //       isLoggedIn: true,
  //     })
  //   );
  //   const { queryBytext } = setup("/");
  //   fireEvent.click(queryBytext("Logout"));
  //   const axiosAuthorization = axios.defaults.headers.common['Authorization'];
  //   expect(axiosAuthorization).toBeFalsy();
  // });
})