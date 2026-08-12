/* ==========================================================================
   EvoGames — Shared Navbar Behavior (mobile menu dropdown)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-action="toggle-mobile-menu"]');
  const dropdown = document.getElementById('mobileMenuDropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });

  dropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => dropdown.classList.remove('open'));
  });
});
