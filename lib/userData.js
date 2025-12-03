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
