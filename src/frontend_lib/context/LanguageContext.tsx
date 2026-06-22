'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'AR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    // splash
    tapToOpen: "TAP TO OPEN",
    // intro
    togetherWith: "Together with their families",
    ebram: "Ebram",
    marina: "Marina",
    date: "SEPTEMBER 3, 2026",
    celebrating: "Celebrating our special day",
    // main
    wereGettingMarried: "WE'RE GETTING MARRIED",
    confirmAttendance: "CONFIRM YOUR ATTENDANCE",
    // countdown
    countdownTitle: "Countdown",
    countdownSubtitle: "To the big day",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
    // location
    churchCeremony: "Church Ceremony",
    churchVenue: "We joyfully invite you to the Divine Liturgy at St. Ruwis and virgin Mary church, gate 4, pyramids gardens, Giza",
    churchTime: "Starts from 6:00 PM",
    openInMaps: "Open in Maps",
    weddingVenue: "Wedding Venue",
    receptionVenue: "Diamond Hall at Jewel Sports City Resort & Spa",
    receptionTime: "From 8:30 PM to 12:00 AM",
    addToCalendar: "Add to calendar",
    // rsvp
    rsvpTitle: "Confirm your attendance",
    rsvpSubtitle: "We hope to count on you",
    nameLabel: "Full name *",
    namePlaceholder: "Your name",
    attendanceLabel: "Will you attend?",
    yes: "Yes, I'll be there! 🎉",
    no: "Sorry, I can't make it 😢",
    guestsLabel: "How many people will come with you?",
    guests0: "Just me",
    guests1: "1 guest",
    guests2: "2 guests",
    guests3: "3 guests",
    guests4: "4 guests",
    guests5: "5 guests",
    messageLabel: "Message for the couple",
    messagePlaceholder: "Write a message...",
    signatureLabel: "Signature *",
    signaturePlaceholder: "Sign your name",
    signatureHint: "Type your name to sign the guestbook",
    submit: "Send confirmation",
    sending: "Sending...",
    successMessage: "Thank you!",
    successDesc: "Your RSVP has been successfully received.",
    errorMessage: "Something went wrong. Please try again.",
    fillRequired: "Please fill out all required fields.",
    letUsKnow: "Please let us know if you will attend."
  },
  AR: {
    tapToOpen: "اضغط للفتح",
    togetherWith: "مع عائلاتهم",
    ebram: "إبرام",
    marina: "مارينا",
    date: "٣ سبتمبر ٢٠٢٦",
    celebrating: "نحتفل بيومنا الخاص",
    wereGettingMarried: "نحن نتزوج",
    confirmAttendance: "أكد حضورك",
    countdownTitle: "العد التنازلي",
    countdownSubtitle: "لليوم الكبير",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    churchCeremony: "مراسم الكنيسة",
    churchVenue: "ندعوكم بفرح لحضور القداس الإلهي في كنيسة القديس رويس والسيدة العذراء، البوابة ٤، حدائق الأهرام، الجيزة",
    churchTime: "يبدأ من ٦:٠٠ مساءً",
    openInMaps: "افتح في الخرائط",
    weddingVenue: "قاعة الزفاف",
    receptionVenue: "قاعة الماسة في منتجع وسبا جويل سبورتس سيتي",
    receptionTime: "من ٨:٣٠ مساءً إلى ١٢:٠٠ منتصف الليل",
    addToCalendar: "أضف إلى التقويم",
    rsvpTitle: "تأكيد الحضور",
    rsvpSubtitle: "نأمل في حضورك",
    nameLabel: "الاسم الكامل *",
    namePlaceholder: "اسمك",
    attendanceLabel: "هل ستحضر؟",
    yes: "نعم، سأحضر! 🎉",
    no: "عذراً، لا أستطيع الحضور 😢",
    guestsLabel: "كم عدد الأشخاص الذين سيأتون معك؟",
    guests0: "أنا فقط",
    guests1: "ضيف واحد",
    guests2: "ضيفان",
    guests3: "٣ ضيوف",
    guests4: "٤ ضيوف",
    guests5: "٥ ضيوف",
    messageLabel: "رسالة للعروسين",
    messagePlaceholder: "اكتب رسالة...",
    signatureLabel: "التوقيع *",
    signaturePlaceholder: "وقع باسمك",
    signatureHint: "اكتب اسمك لتوقيع سجل الزوار",
    submit: "إرسال التأكيد",
    sending: "جاري الإرسال...",
    successMessage: "شكراً لك!",
    successDesc: "تم استلام تأكيد حضورك بنجاح.",
    errorMessage: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    fillRequired: "يرجى ملء جميع الحقول المطلوبة.",
    letUsKnow: "يرجى إعلامنا إذا كنت ستحضر."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  useEffect(() => {
    document.documentElement.lang = language === 'AR' ? 'ar' : 'en';
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
