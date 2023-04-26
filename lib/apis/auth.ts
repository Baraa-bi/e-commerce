import { request } from ".";
import { User, UserCredentials } from "../types";

export const authApi = {
  login: (user: UserCredentials) => {
    return request.post(`/api/v1/users/login`, user);
  },
  register: (user: User) => {
    return request.post(`/api/v1/users/register`, user);
  },
  users: () => {
    return request.get(`/api/v1/users`);
  },
  verifyVendor: (vendor_id: number) => {
    return request.put(`/api/v1/users/vendor/verify/${vendor_id}`, {});
  },
  fullyVerifyVendor: (vendor_id: number) => {
    return request.put(`/api/v1/users/vendor/fullyVerify/${vendor_id}`, {});
  },
  roles: () => {
    return request.get(`/api/v1/users/roles`);
  },
  userById: (userId: number) => {
    return request.get(`/api/v1/users/${userId}`);
  },
  updateUser: (userId: number, user: User) => {
    return request.put(`/api/v1/users/${userId}`, user);
  },
  deleteUser: (userId: number) => {
    return request.delete(`/api/v1/users/${userId}`);
  },
};
