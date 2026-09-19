import type { ExperienceData } from '../types';

// High quality embedded romantic polaroid visuals for default state
const DEFAULT_PHOTO_1 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect width="600" height="450" fill="%23FFE2E2"/><circle cx="300" cy="200" r="120" fill="%23F5CBCB" opacity="0.6"/><path d="M300 130 C270 90, 210 110, 210 160 C210 220, 300 270, 300 290 C300 270, 390 220, 390 160 C390 110, 330 90, 300 130 Z" fill="%23C5B3D3"/><text x="300" y="360" font-family="serif" font-size="28" fill="%234A353B" text-anchor="middle">Precious Moments ❤️</text></svg>`;

const DEFAULT_PHOTO_2 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect width="600" height="450" fill="%23FBEFEF"/><circle cx="200" cy="220" r="90" fill="%23FFE2E2"/><circle cx="400" cy="180" r="110" fill="%23C5B3D3" opacity="0.5"/><text x="300" y="240" font-family="sans-serif" font-size="32" font-weight="bold" fill="%234A353B" text-anchor="middle">Vedant &amp; Me ✨</text><text x="300" y="360" font-family="serif" font-size="24" fill="%236E525A" text-anchor="middle">Laughs &amp; Endless Memories</text></svg>`;

const DEFAULT_PHOTO_3 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect width="600" height="450" fill="%23FFE2E2"/><path d="M300 80 A120 120 0 1 0 420 200 A90 90 0 1 1 300 80 Z" fill="%23C5B3D3"/><text x="300" y="370" font-family="serif" font-size="26" fill="%234A353B" text-anchor="middle">Under The Stars 🌙</text></svg>`;

export const DEFAULT_EXPERIENCE_DATA: ExperienceData = {
  recipientName: "Vedant Shukla",
  nickname: "Lottychoco Pie",
  dateOfBirth: "19 September 2005",
  formattedDob: "19 • 09 • 2005",
  introGreeting: "Hey Lottychoco Pie…",
  introSubtext: "I made something for you.",
  birthdayLetter: `Happy Birthday, Vedant Shukla! ❤️

Sach bolu toh, apne birthday se zyada mujhe tumhare birthday ki excitement hoti hai. 🥹

Tumhe bahut saare gifts dena chahti hoon… but kya karun, har baar mera budget hi fail ho jaata hai. 😭😂

Isliye iss baar socha… gift thoda alag de deti hoon.
Shayad mehenga nahi hai, but bahut dil se banaya hai. ❤️

Happy Birthday, Lottychoco Pie. 🎂🍫🥧`,
  fightQuestion: "Who starts the fights?",
  fightOptions: ["Me 😇", "Vedant 😤", "Both of us 💀"],
  fightReconciliationIntro: "But jokes apart…",
  fightReconciliationBody: "For all the silly fights, random arguments, and times we annoy each other…",
  fightReconciliationOutro: "I wouldn't trade any of it. ❤️",
  careMessages: [
    {
      id: 1,
      numberStr: "01",
      title: "The way you care",
      message: "Tum meri har time care karte ho… but gusse mein main us care ko dekhte hue bhi nahi dekhna chahti, kyunki pata hai… mera gussa shant ho jayega. 🥹❤️"
    },
    {
      id: 2,
      numberStr: "02",
      title: "Your laugh",
      message: "Jab tum meri baat sunke haste ho, tab mujhe sabse zyada khushi hoti hai. ❤️"
    },
    {
      id: 3,
      numberStr: "03",
      title: "The way I see you",
      message: "Tum bahut good-looking ho… every time, achhe lagte ho. Tumhe dekhte hi main aise khush hoti hoon jaise chaand se woh bachahua daag bhi hat gaya ho. 🌙❤️"
    },
    {
      id: 4,
      numberStr: "04",
      title: "The trust I have in you",
      message: "Tum kabhi mujhe dhoka nahi doge… na hi kisi aur ke kaaran mujhe hurt karoge. ❤️"
    },
    {
      id: 5,
      numberStr: "05",
      title: "Just because…",
      message: "Just because you are Vedant Shukla. ❤️"
    }
  ],
  gifts: [
    {
      id: 1,
      title: "Open when you miss me 🥹",
      subtitle: "Surprise #1",
      message: "Whenever you miss me, close your eyes for 5 seconds and remember how much I adore you. Distance or busy days don't matter — I'm always right here with you! ❤️",
      animationType: "glowing"
    },
    {
      id: 2,
      title: "Open when you're angry with me 😤",
      subtitle: "Surprise #2",
      message: "Before you get super mad... remember my cute face when I try to make it up to you! Take a deep breath, call me, and let's solve everything over your favorite treat. 🍫❤️",
      animationType: "ribbon"
    },
    {
      id: 3,
      title: "Open when you need a smile 😂",
      subtitle: "Surprise #3",
      message: "Remember all our silly jokes, random arguments, and uncontrollable laughs? Here is your official un-expirable coupon for infinite warm hugs and endless laughs! 🤭✨",
      animationType: "particles"
    },
    {
      id: 4,
      title: "The last one… ❤️",
      subtitle: "Surprise #4",
      message: "You are the sweetest, most special person in my life. Thank you for being my Vedant, my comfort zone, and my Lottychoco Pie forever. 👑❤️",
      animationType: "cardPopup"
    }
  ],
  finalRomanticLines: [
    "One last thing, Lottychoco Pie…",
    "Tum toh jaan ho meri…",
    "Tumhare bin main hoon kya?",
    "Tum toh pyaar ho, aakhiri… ❤️"
  ],
  finalLikesLines: [
    "Tum jaante ho mujhe kya pasand hai?",
    "Cake. 🎂",
    "Moon. 🌙",
    "Kitab. 📖",
    "Gaane. 🎵",
    "Tumhara sheher… mera ghar. 🏡"
  ],
  finalClosingLine: "Pehla sabd. ❤️",
  creatorSignature: "Made specially for Vedant Shukla ❤️",
  photos: [
    {
      id: "photo_default_1",
      url: DEFAULT_PHOTO_1,
      caption: "Precious Moments ❤️",
    },
    {
      id: "photo_default_2",
      url: DEFAULT_PHOTO_2,
      caption: "Vedant & Me ✨",
    },
    {
      id: "photo_default_3",
      url: DEFAULT_PHOTO_3,
      caption: "Under The Stars 🌙",
    }
  ],
  music1: {
    id: "music1",
    name: "Soft Romantic Prelude.mp3",
    startTime: 0,
    endTime: 180,
    duration: 180,
    volume: 0.8
  },
  music2: {
    id: "music2",
    name: "Cinematic Birthday Melody.mp3",
    startTime: 0,
    endTime: 180,
    duration: 180,
    volume: 0.85
  }
};
