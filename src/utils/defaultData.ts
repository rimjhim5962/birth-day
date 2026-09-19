import type { ExperienceData } from '../types';
import photo01 from '../../pic/file_000000004d0861fd9936c81e7fc14043.png';
import photo02 from '../../pic/IMG-20250131-WA0003.jpg';
import photo03 from '../../pic/IMG-20250208-WA0002.jpg';
import photo04 from '../../pic/IMG-20250208-WA0006.jpg';
import photo05 from '../../pic/IMG-20250208-WA0008.jpg';
import photo06 from '../../pic/IMG-20250516-WA0001.jpg';
import photo07 from '../../pic/IMG-20250516-WA0002.jpg';
import photo08 from '../../pic/IMG-20250516-WA0005.jpg';
import photo09 from '../../pic/Snapchat-1122101428.jpg';
import photo10 from '../../pic/Snapchat-40878349.jpg';
import music1Url from '../../song/Vaaroon Forever Mirzapur 320 Kbps.mp3';
import music2Url from '../../song/dil-tu-jaan-tu-gurnazar-320-kbps_G1miEwC4.mp3';

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
      id: "photo_default_01",
      url: photo01,
      caption: "Our precious memory ❤️",
    },
    {
      id: "photo_default_02",
      url: photo02,
      caption: "Together ✨",
    },
    {
      id: "photo_default_03",
      url: photo03,
      caption: "A beautiful day",
    },
    {
      id: "photo_default_04",
      url: photo04,
      caption: "Just us ❤️",
    },
    {
      id: "photo_default_05",
      url: photo05,
      caption: "Sweet moments",
    },
    {
      id: "photo_default_06",
      url: photo06,
      caption: "Always together",
    },
    {
      id: "photo_default_07",
      url: photo07,
      caption: "Our little world",
    },
    {
      id: "photo_default_08",
      url: photo08,
      caption: "Making memories",
    },
    {
      id: "photo_default_09",
      url: photo09,
      caption: "Forever us",
    },
    {
      id: "photo_default_10",
      url: photo10,
      caption: "Under the stars 🌙",
    },
  ],
  music1: {
    id: "music1",
    name: "Vaaroon Forever Mirzapur 320 Kbps.mp3",
    url: music1Url,
    startTime: 0,
    endTime: 180,
    duration: 180,
    volume: 0.8
  },
  music2: {
    id: "music2",
    name: "dil-tu-jaan-tu-gurnazar-320-kbps.mp3",
    url: music2Url,
    startTime: 0,
    endTime: 180,
    duration: 180,
    volume: 0.85
  }
};
