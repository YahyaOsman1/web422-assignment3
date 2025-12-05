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
*
********************************************************************************/

import { jwtDecode } from 'jwt-decode'
const TOKEN_KEY = 'access_token'

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (err) {
    return null
  }
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
export function readToken() {
  try {
    const token = getToken()
    return token ? jwtDecode(token) : null
  } catch (err) {
    return null
  }
}
export function isAuthenticated() {
  const token = readToken()
  return token ? true : false
}
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password }),
    headers: {
      'content-type': 'application/json'
    }
  })
  const data = await res.json()
  if (res.status === 200) {
    setToken(data.token)
    return true
  } else {
    throw new Error(data.message)
  }
}
export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password, password2 }),
    headers: {
      'content-type': 'application/json'
    }
  })
  const data = await res.json()
  if (res.status === 200) {
    return true
  } else {
    throw new Error(data.message)
  }
}
