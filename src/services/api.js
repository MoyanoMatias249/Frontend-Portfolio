// frontend/src/services/api.js
const BASE_URL = 'https://backend-portfolio-piaq.onrender.com/api';

export async function fetchAbout() {
    const res = await fetch(`${BASE_URL}/about`);
    return await res.json();
}

export async function fetchExperience() {
    const res = await fetch(`${BASE_URL}/experience`);
    return await res.json();
}

export async function fetchSkills() {
  const res = await fetch(`${BASE_URL}/skills`);
  return await res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${BASE_URL}/projects`);
  return await res.json();
}

export async function sendMessage(data) {
  const res = await fetch(`${BASE_URL}/contact/mensaje`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}
