/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: yahya osman Student ID: 179264239 Date: 04/11/2025
*
* Vercel App (Deployed) Link: "https://web422-user-api-ashy.vercel.app/api/user"
*                             "https://web422-assignment3-six.vercel.app/login"
*
********************************************************************************/

import { getToken } from './authenticate';
async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'content-type': 'application/json',
      Authorization: `JWT ${getToken()}`,
    },
  });
  if (res.status === 200) {
    return res.json();
  } else {
    
    return [];
  }
}
export async function addToFavourites(id) {
  return apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'PUT',
  });
}
export async function removeFromFavourites(id) {
  return apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'DELETE',
  });
}
export async function getFavourites() {
  return apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: 'GET',
  });
}
