/**
 * 🎂 Birthday Surprise Website - Personalization Config
 * Edit these values to customize the experience for your special person!
 */

export const config = {
  // 👤 Recipient & Sender Info
  recipientName: "Vaibhavi",      // The birthday person's name
  senderName: "Dipak",            // Your name
  
  // 📅 Birthday Date (optional - for countdown)
  birthdayDate: "2009-10-25",     // Format: YYYY-MM-DD (set to null to disable)
  
  // 💕 Relationship Type
  relationship: "partner",        // Options: "partner", "crush", "best-friend", "special-person"
  
  // 🎨 Favorite Colors (used for accents)
  favoriteColors: {
    primary: "#ec4899",           // Pink/Rose
    secondary: "#f43f5e",         // Rose
    accent: "#a855f7",            // Purple
    background: ["#fce7f3", "#ffedd5", "#e9d5ff"], // Gradient stops
  },
  
  // 💌 Personal Message (optional - overrides default final message)
  personalMessage: null,          // Set to a string to override the default birthday wish
  
  // 📸 Photo Gallery (optional)
  photos: [
    // Add photo URLs here - they'll be displayed in a gallery
    // Example:
    // { url: "https://example.com/photo1.jpg", caption: "Our first date ❤️" },
    // { url: "https://example.com/photo2.jpg", caption: "So many memories 💕" },
  ],
  
  // 🎵 Background Music (optional)
  backgroundMusic: {
    enabled: false,               // Set to true to enable
    url: "",                      // Direct link to MP3/OGG file
    autoplay: false,              // Browser policies prevent autoplay with sound
    loop: true,
    volume: 0.3,
  },
  
  // ✨ Animation Preferences
  animations: {
    reducedMotion: false,         // Respects prefers-reduced-motion automatically
    particleCount: 30,            // Number of floating particles
    heartExplosionCount: 50,      // Hearts in explosion animation
  },
  
  // 🌟 Social Sharing
  share: {
    enabled: true,
    title: "A Special Birthday Surprise for You! ❤️",
    text: "I made something magical for your birthday... 🎂✨",
    url: window.location.href,
  },
  
  // 🎁 Step Configuration (which steps to show)
  steps: {
    opening: true,
    question: true,
    heartfelt: true,
    loveButton: true,
    challenge: true,
    giftReveal: true,
    finalWish: true,
  },
};

// Relationship type labels
export const relationshipLabels = {
  "partner": "My Love",
  "crush": "My Crush",
  "best-friend": "My Best Friend",
  "special-person": "My Special Person",
};

// Love messages for the viral button
export const loveMessages = [
  "One click, a million feelings. 💗",
  "Sending you unlimited hugs! 🤗",
  "Warning: You're being loved excessively! ❤️‍🔥",
  "My heart just did a little happy dance! 💓",
  "If love were a button, I'd never stop clicking. 🥹",
  "You deserve all the love in this universe. 🌎❤️",
  "Every click = one more reason to smile. 😊",
  "Love level: EXCEEDED MAXIMUM CAPACITY! 💕",
  "My heart is doing cartwheels right now! 🤸‍♀️❤️",
  "You're the notification I never want to swipe away. 📱💖",
];

// Challenge options
export const challengeOptions = [
  { id: "hugs", text: "A thousand hugs 🤗", emoji: "🤗" },
  { id: "kisses", text: "A million kisses 😘", emoji: "😘" },
  { id: "happiness", text: "All the happiness in the universe 🌎", emoji: "🌎" },
];

// Default final birthday message
export const defaultBirthdayMessage = `Today is all about you. 🥹💖

I hope your life is filled with the kind of happiness that makes your heart smile, the kind of love that makes you feel safe, and the kind of beautiful moments that you wish would last forever.

May every dream you hold close to your heart slowly become your reality. May you always find reasons to laugh, people who genuinely care about you, and little moments that remind you how precious you are.

You deserve happiness, peace, success, endless love, and all the beautiful things this world has to offer.

Thank you for being YOU. Never forget how special you are.

Keep smiling, keep shining, and keep being the wonderful person you are.

And one last thing...

I LOVE YOU MORE THAN WORDS CAN SAY. ❤️🥹

Happy Birthday, My Special Person! 🎂💗✨`;