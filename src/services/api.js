// frontend/src/services/api.js
/* API de producción usando Supabase Edge Functions

 * Este archivo conecta el frontend con las funciones serverless desplegadas en Supabase.
 * Las funciones están organizadas por entidad (about, experience, projects, skills, backend).

 * Se utiliza autenticación por token (Bearer) con la clave anónima de Supabase.
 * Los datos se guardan directamente en la base de datos de Supabase.
 * El mensaje de contacto NO se envía por correo, solo se guarda en la tabla 'mensajes'.
 * La verificación de administrador se hace contra el Auth de Supabase usando email y contraseña.
 
 */
// ─── CONFIGURACIÓN GENERAL ──────────────────────────────
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5raWpwcm1iZHpnbWh2cXZzaG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDQwNDYsImV4cCI6MjA3MzAyMDA0Nn0.8DyxVeGWGQ2eZ5vnzpK1k-bObV0Xmre0auwHItmmP3g'
};

const BASE_BACKEND = 'https://nkijprmbdzgmhvqvshmv.supabase.co/functions/v1/backend'
const BASE_ABOUT = 'https://nkijprmbdzgmhvqvshmv.supabase.co/functions/v1/about'
const BASE_EXPERIENCE = 'https://nkijprmbdzgmhvqvshmv.supabase.co/functions/v1/experience'
const BASE_PROJECTS = 'https://nkijprmbdzgmhvqvshmv.supabase.co/functions/v1/projects'
const BASE_SKILLS = 'https://nkijprmbdzgmhvqvshmv.supabase.co/functions/v1/skills'

// ─── ABOUT ──────────────────────────────────────────────
export async function fetchAbout() {
  const res = await fetch(BASE_ABOUT, { headers });
  return await res.json();
}

export async function updateAbout(id, texto) {
  const res = await fetch(`${BASE_ABOUT}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ texto })
  });
  return await res.json();
}

// ─── EXPERIENCE ─────────────────────────────────────────
export async function fetchExperience() {
  const res = await fetch(BASE_EXPERIENCE, { headers });
  return await res.json();
}

export async function addExperience(data) {
  const res = await fetch(BASE_EXPERIENCE, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateExperience(id, data) {
  const res = await fetch(`${BASE_EXPERIENCE}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteExperience(id) {
  const res = await fetch(`${BASE_EXPERIENCE}/${id}`, {
    method: 'DELETE',
    headers
  });
  return await res.json();
}

// ─── PROJECTS ───────────────────────────────────────────
export async function fetchProjects() {
  const res = await fetch(BASE_PROJECTS, { headers });
  return await res.json();
}

export async function addProject(data) {
  const res = await fetch(BASE_PROJECTS, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${BASE_PROJECTS}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE_PROJECTS}/${id}`, {
    method: 'DELETE',
    headers
  });
  return await res.json();
}

// ─── SKILLS ─────────────────────────────────────────────
export async function fetchSkills() {
  const res = await fetch(BASE_SKILLS, { headers });
  return await res.json();
}

export async function addSkill(data) {
  const res = await fetch(BASE_SKILLS, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateSkill(id, data) {
  const res = await fetch(`${BASE_SKILLS}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteSkill(id) {
  const res = await fetch(`${BASE_SKILLS}/${id}`, {
    method: 'DELETE',
    headers
  });
  return await res.json();
}

// ─── CONTACT ────────────────────────────────────────────
export async function sendMessage(data) {
  const res = await fetch(`${BASE_BACKEND}/contact/mensaje`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ─── ADMIN ────────────────────────────────────────────
export async function verificarAdmin(password) {
  const res = await fetch(`${BASE_BACKEND}/admin/verificar`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: 'moyanomatias743@gmail.com',
      password
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}