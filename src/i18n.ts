import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Propose your project to Miralys',
      description: 'Entrust your project to Miralys for expertise and innovation.',
      openSource: 'Open Source',
      closedSource: 'Closed Source',
      githubLink: 'GitHub Link',
      discordUsername: 'Discord Username (optional)',
      email: 'Email (optional)',
      projectDescription: 'Project Description',
      technologiesUsed: 'Technologies Used',
      submit: 'Submit',
      advantages: 'Advantages of Miralys',
      advantage1: 'Expertise in modern web technologies',
      advantage2: 'Secure and scalable solutions',
      advantage3: 'Transparent communication',
      advantage4: 'Fast maintenance',
      advantage5: 'French/English support',
      // ...more fields
    },
  },
  fr: {
    translation: {
      title: 'Proposez votre projet à Miralys',
      description: 'Confiez votre projet à Miralys pour expertise et innovation.',
      openSource: 'Open Source',
      closedSource: 'Fermé (Closed Source)',
      githubLink: 'Lien GitHub',
      discordUsername: 'Nom d’utilisateur Discord (optionnel)',
      email: 'Email (optionnel)',
      projectDescription: 'Description du projet',
      technologiesUsed: 'Technologies utilisées',
      submit: 'Envoyer',
      advantages: 'Avantages de Miralys',
      advantage1: 'Expertise des technologies web modernes',
      advantage2: 'Solutions sécurisées et évolutives',
      advantage3: 'Communication transparente',
      advantage4: 'Maintenance rapide',
      advantage5: 'Support français/anglais',
      // ...more fields
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
