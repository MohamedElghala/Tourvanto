// =========================================================================
// Tourvanto - Traveler Authentication & Identity Manager
// Supports: Google (Gmail), Apple ID (iCloud), Microsoft (Outlook), Phone, Email
// Pre-configured to hook into Supabase / Firebase Auth via db-config.js
// =========================================================================

const TourvantoAuth = {
  currentUser: null,

  init() {
    try {
      const stored = localStorage.getItem('tourvanto_current_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch (e) {
      this.currentUser = null;
    }
    this.updateAuthUI();
    this.bindEvents();
  },

  bindEvents() {
    // Open modal button in header
    const openBtn = document.getElementById('openAuthModalBtn');
    if (openBtn) {
      openBtn.addEventListener('click', () => this.openModal());
    }

    // Close modal button
    const closeBtn = document.getElementById('closeAuthModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Logout button
    const logoutBtn = document.getElementById('authLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Email login form
    const form = document.getElementById('directEmailAuthForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmailInput')?.value.trim();
        const name = document.getElementById('authNameInput')?.value.trim();
        if (email) {
          this.loginWithEmail(email, name);
        }
      });
    }
  },

  openModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('hidden');
  },

  closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('hidden');
  },

  async loginWithProvider(provider) {
    // When official cloud DB is connected via Tourvanto Gmail:
    if (window.TOURVANTO_DB_CONFIG?.isCloudConnected && window.supabase) {
      const client = window.supabase.createClient(
        window.TOURVANTO_DB_CONFIG.supabaseUrl,
        window.TOURVANTO_DB_CONFIG.supabaseAnonKey
      );
      return client.auth.signInWithOAuth({ provider: provider });
    }

    // Client-side instant preview & simulation
    let mockProfile = {
      id: 'usr_' + Date.now().toString(36),
      name: provider === 'google' ? 'Traveler (Google)' : provider === 'apple' ? 'Traveler (Apple)' : provider === 'microsoft' ? 'Traveler (Outlook)' : 'VIP Traveler',
      email: `traveler@${provider === 'google' ? 'gmail.com' : provider === 'apple' ? 'icloud.com' : provider === 'microsoft' ? 'outlook.com' : 'tourvanto.com'}`,
      provider: provider,
      avatar: provider === 'google' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      created_at: new Date().toISOString()
    };

    this.setCurrentUser(mockProfile);
    this.closeModal();
    if (window.showToast) window.showToast(`Signed in with ${provider.toUpperCase()}`);
  },

  loginWithEmail(email, name) {
    const profile = {
      id: 'usr_' + Date.now().toString(36),
      name: name || email.split('@')[0],
      email: email,
      provider: 'email',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      created_at: new Date().toISOString()
    };
    this.setCurrentUser(profile);
    this.closeModal();
  },

  setCurrentUser(user) {
    this.currentUser = user;
    localStorage.setItem('tourvanto_current_user', JSON.stringify(user));
    this.updateAuthUI();
    this.prefillCheckoutForm();
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem('tourvanto_current_user');
    this.updateAuthUI();
  },

  updateAuthUI() {
    const guestEl = document.getElementById('authGuestState');
    const loggedInEl = document.getElementById('authLoggedInState');
    const userNameEl = document.getElementById('authUserNameDisplay');
    const userAvatarEl = document.getElementById('authUserAvatar');

    if (this.currentUser) {
      if (guestEl) guestEl.classList.add('hidden');
      if (loggedInEl) loggedInEl.classList.remove('hidden');
      if (userNameEl) userNameEl.textContent = this.currentUser.name;
      if (userAvatarEl && this.currentUser.avatar) userAvatarEl.src = this.currentUser.avatar;
    } else {
      if (guestEl) guestEl.classList.remove('hidden');
      if (loggedInEl) loggedInEl.classList.add('hidden');
    }
  },

  prefillCheckoutForm() {
    if (!this.currentUser) return;
    const nameInput = document.getElementById('bookingName');
    if (nameInput && !nameInput.value) {
      nameInput.value = this.currentUser.name;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TourvantoAuth.init();
});
