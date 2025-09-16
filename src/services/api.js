// frontend/src/services/api.js
const BASE_URL = 'https://backend-portfolio-piaq.onrender.com/api';

// ─── ABOUT ──────────────────────────────────────────────
export async function fetchAbout() {
  const res = await fetch(`${BASE_URL}/about`);
  return await res.json();
}

export async function updateAbout(id, texto) {
  const res = await fetch(`${BASE_URL}/about/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });
  return await res.json();
}

// ─── EXPERIENCE ─────────────────────────────────────────
export async function fetchExperience() {
  const res = await fetch(`${BASE_URL}/experience`);
  return await res.json();
}

export async function addExperience(data) {
  const res = await fetch(`${BASE_URL}/experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateExperience(id, data) {
  const res = await fetch(`${BASE_URL}/experience/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteExperience(id) {
  const res = await fetch(`${BASE_URL}/experience/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
}

// ─── PROJECTS ───────────────────────────────────────────
export async function fetchProjects() {
  const res = await fetch(`${BASE_URL}/projects`);
  return await res.json();
}

export async function addProject(data) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
}

// ─── SKILLS ─────────────────────────────────────────────
export async function fetchSkills() {
  const res = await fetch(`${BASE_URL}/skills`);
  return await res.json();
}

export async function addSkill(data) {
  const res = await fetch(`${BASE_URL}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateSkill(id, data) {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteSkill(id) {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
}

// ─── CONTACT ────────────────────────────────────────────
export async function sendMessage(data) {
  const res = await fetch(`${BASE_URL}/contact/mensaje`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ─── ADMIN ────────────────────────────────────────────
export async function verificarAdmin(password) {
  const res = await fetch(`${BASE_URL}/admin/verificar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}