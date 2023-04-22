import { request } from ".";
import { AUTH_URL } from "../constants";
import { User, UserCredentials } from "../types";

export const authApi = {
  login: (user: UserCredentials) => {
    return request.post(`${AUTH_URL}/api/v1/users/login`, user);
  },
  register: (user: User) => {
    return request.post(`${AUTH_URL}/api/v1/users/register`, user);
  },
  users: () => {
    return request.get(`${AUTH_URL}/api/v1/users`);
  },
  verifyVendor: (vendor_id: number) => {
    return request.put(
      `${AUTH_URL}/api/v1/users/vendor/verify/${vendor_id}`,
      {}
    );
  },
  fullyVerifyVendor: (vendor_id: number) => {
    return request.put(
      `${AUTH_URL}/api/v1/users/vendor/fullyVerify/${vendor_id}`,
      {}
    );
  },
  roles: () => {
    return request.get(`${AUTH_URL}/api/v1/users/roles`);
  },
  userById: (userId: number) => {
    return request.get(`${AUTH_URL}/api/v1/users/${userId}`);
  },
  updateUser: (userId: number, user: User) => {
    return request.put(`${AUTH_URL}/api/v1/users/${userId}`, user);
  },
  deleteUser: (userId: number) => {
    return request.delete(`${AUTH_URL}/api/v1/users/${userId}`);
  },
};
