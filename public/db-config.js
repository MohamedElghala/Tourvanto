// =========================================================================
// Tourvanto - Official Cloud Database Adapter & Configuration
// Designed for seamless connection to Supabase or Firebase once registered
// with your official Tourvanto Gmail account.
// =========================================================================

window.TOURVANTO_DB_CONFIG = {
  // Provider: 'supabase' (Recommended) or 'firebase'
  provider: 'supabase',

  // Official Project Credentials (Leave blank until registered with your Tourvanto Gmail)
  supabaseUrl: '',      // e.g. https://your-project-id.supabase.co
  supabaseAnonKey: '',  // e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

  // Database Table Names
  tables: {
    bookings: 'tourvanto_bookings',
    reviews: 'tourvanto_reviews',
    tours: 'tourvanto_tours',
    users: 'tourvanto_users'
  },

  // State: 'standby' (stores in local storage) -> 'cloud' (syncs with cloud DB)
  get isCloudConnected() {
    return Boolean(this.supabaseUrl && this.supabaseAnonKey && this.supabaseUrl.startsWith('http'));
  }
};

const TourvantoDB = {
  // Bookings DAL
  async saveBooking(booking) {
    if (window.TOURVANTO_DB_CONFIG.isCloudConnected && window.supabase) {
      try {
        const client = window.supabase.createClient(window.TOURVANTO_DB_CONFIG.supabaseUrl, window.TOURVANTO_DB_CONFIG.supabaseAnonKey);
        const { data, error } = await client.from(window.TOURVANTO_DB_CONFIG.tables.bookings).insert([booking]);
        if (error) console.warn('[Tourvanto DB Cloud] Save booking warning:', error);
        else console.log('[Tourvanto DB Cloud] Booking saved to cloud database:', data);
      } catch (err) {
        console.warn('[Tourvanto DB Cloud] Error saving to cloud:', err);
      }
    }
    // Always persist to local cache for instant zero-latency UI
    let localBookings = JSON.parse(localStorage.getItem('tourvanto_bookings')) || [];
    localBookings.unshift(booking);
    localStorage.setItem('tourvanto_bookings', JSON.stringify(localBookings));
    return booking;
  },

  // Reviews DAL
  async saveReview(review) {
    if (window.TOURVANTO_DB_CONFIG.isCloudConnected && window.supabase) {
      try {
        const client = window.supabase.createClient(window.TOURVANTO_DB_CONFIG.supabaseUrl, window.TOURVANTO_DB_CONFIG.supabaseAnonKey);
        const { data, error } = await client.from(window.TOURVANTO_DB_CONFIG.tables.reviews).insert([review]);
        if (error) console.warn('[Tourvanto DB Cloud] Save review warning:', error);
        else console.log('[Tourvanto DB Cloud] Review saved to cloud database:', data);
      } catch (err) {
        console.warn('[Tourvanto DB Cloud] Error saving review to cloud:', err);
      }
    }
    // Always persist to local cache
    let localReviews = JSON.parse(localStorage.getItem('tourvanto_reviews')) || [];
    localReviews.unshift(review);
    localStorage.setItem('tourvanto_reviews', JSON.stringify(localReviews));
    return review;
  }
};
