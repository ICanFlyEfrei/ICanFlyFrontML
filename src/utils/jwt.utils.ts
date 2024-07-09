import {jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  exp: number;
  iat: number;
  // Define known properties here
  userId?: string; // Example: subject
  role?: string; // Example: user role
  // Add other known properties as needed
}

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};