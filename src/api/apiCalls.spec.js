import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
    describe('register', () => {
        it('calls /api/1.0/users', () => {
            const mockRegister = jest.fn();
            axios.post = mockRegister;
            apiCalls.register();

            const path = mockRegister.mock.calls[0][0];
            expect(path).toBe("/api/1.0/users");
        })
    })
    describe('login', () => {
        it('calls /api/1.0/login', () => {
            const mockLogin = jest.fn();
            axios.post = mockLogin;
            apiCalls.login({ username: 'test-username', password: 'P4ssword' });

            const path = mockLogin.mock.calls[0][0];
            expect(path).toBe("/api/1.0/login");
        })
    })
    describe('get user', () => {
        it('calls /api/1.0/users/user5 when user5 is provided for getUser', () => {
            const mockGetUser = jest.fn();
            axios.get = mockGetUser;
            apiCalls.getUser('user5');
            expect(mockGetUser).toBeCalledWith("/api/1.0/users/user5");
        })
    })
})