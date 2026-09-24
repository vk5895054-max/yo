"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "en" | "es" | "de" | "fr" | "ja";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  name: string;
  flag?: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "EN", name: "English", flag: "🇺🇸" },
  { code: "es", label: "ES", name: "Español", flag: "🇪🇸" },
  { code: "de", label: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "FR", name: "Français", flag: "🇫🇷" },
  { code: "ja", label: "JA", name: "日本語", flag: "🇯🇵" },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav Items
    "nav.services": "Services",
    "nav.products": "Products",
    "nav.industries": "Industries",
    "nav.velocityAi": "Vexus VelocityAI",
    "nav.insights": "Insights",
    "nav.aboutUs": "About Us",
    "nav.careers": "Careers",
    "nav.contact": "Contact",
    "nav.selectLanguage": "Select Language",

    // Industries
    "ind.privateEquity": "Private Equity",
    "ind.privateEquity.desc": "Value creation, tech due diligence, and post-merger digital acceleration.",
    "ind.financialServices": "Financial Services",
    "ind.financialServices.desc": "Core banking modernization, algorithmic trading platforms, and secure fintech APIs.",
    "ind.industrialEnergy": "Industrial & Energy",
    "ind.industrialEnergy.desc": "Smart factories, IIoT predictive maintenance, and renewable energy grid software.",
    "ind.mobility": "Mobility",
    "ind.mobility.desc": "Connected vehicle OS, EV charging infrastructure, and intelligent fleet management.",
    "ind.technology": "Technology",
    "ind.technology.desc": "SaaS platform scale, multi-tenant engineering, and developer ecosystem tooling.",
    "ind.communications": "Communications & Network Providers",
    "ind.communications.desc": "5G network slicing, virtualized telecom core, and SDN orchestration.",
    "ind.healthcare": "Healthcare & Life Sciences",
    "ind.healthcare.desc": "HIPAA-compliant telehealth, clinical trials analytics, and medtech device software.",
    "ind.media": "Media & Entertainment",
    "ind.media.desc": "Low-latency streaming architectures, DRM licensing, and immersive content delivery.",
    "ind.retail": "Retail & Consumer",
    "ind.retail.desc": "Omnichannel commerce engines, hyper-personalized AI recommendations, and supply chain.",
    "ind.aerospace": "Aerospace & Advanced Defense",
    "ind.aerospace.desc": "Mission-critical avionics software, geospatial analytics, and rugged edge computing.",

    // Services
    "srv.digitalArch": "Digital Product Architecture",
    "srv.digitalArch.desc": "Lorem ipsum dolor sit amet. Enterprise microservices, event-driven systems, and cloud blueprints.",
    "srv.cloudDevops": "Cloud & DevOps Engineering",
    "srv.cloudDevops.desc": "Automated multi-cloud CI/CD pipelines, Kubernetes orchestration, and infrastructure-as-code.",
    "srv.dataAi": "Data & Enterprise AI",
    "srv.dataAi.desc": "Modern data lakehouses, real-time analytics streaming, and enterprise ML pipelines.",
    "srv.cybersecurity": "Cybersecurity & Compliance",
    "srv.cybersecurity.desc": "Zero-trust architectures, end-to-end cryptographic defense, and regulatory SOC2/HIPAA compliance.",
    "srv.qualityEng": "Quality Engineering & Automation",
    "srv.qualityEng.desc": "Continuous shift-left test automation, performance profiling, and reliability assurance.",
    "srv.genAi": "Generative AI & LLM Solutions",
    "srv.genAi.desc": "Custom fine-tuned foundation models, RAG vector architectures, and autonomous AI agents.",
    "srv.experienceDesign": "Experience & Interface Design",
    "srv.experienceDesign.desc": "Human-centered digital design systems, rapid prototyping, and accessibility-first UX/UI.",
    "srv.embeddedIot": "Embedded Systems & IoT",
    "srv.embeddedIot.desc": "Real-time edge telemetry, connected hardware firmware, and smart device ecosystems.",
    "srv.legacyModern": "Legacy Modernization",
    "srv.legacyModern.desc": "Monolith-to-microservices decomposition, cloud migration, and tech-debt remediation.",
    "srv.sre": "Site Reliability & Performance",
    "srv.sre.desc": "High-availability 99.999% SLAs, fault-tolerant systems, observability, and chaos testing.",

    // Hero Section (Software Development Startup)
    "hero.badge": "Next-Gen Software Development Studio",
    "hero.title": "Building high-velocity software for ambitious startups & scale-ups.",
    "hero.subtitle": "From zero-to-one MVPs to enterprise-grade web applications, cloud backbones, and autonomous AI agents. We combine elite engineering with modern stacks to ship production code 10x faster.",
    "hero.explore": "Start Your Project",
    "hero.viewTokens": "Explore Our Stack",
    "hero.stat.equal": "< 14 Days",
    "hero.stat.equalDesc": "Average Sprint to Production MVP",
    "hero.stat.wcag": "10x",
    "hero.stat.wcagDesc": "Faster Engineering Velocity",
    "hero.stat.variants": "99.999%",
    "hero.stat.variantsDesc": "High-Availability Cloud Uptime",
    "hero.stat.lang": "Zero",
    "hero.stat.langDesc": "Technical Debt Architecture",

    // Startup Sections
    "services.badge": "Full-Cycle Engineering",
    "services.heading": "What We Build For High-Growth Startups",
    "services.subheading": "Enterprise-grade architecture paired with startup velocity. We engineer every layer with precision.",
    
    "process.badge": "How We Ship",
    "process.heading": "From Napkin Idea to Production in 14 Days",
    "process.subheading": "No bureaucracy. No junior handoffs. Direct collaboration with principal architects.",

    "work.badge": "Recent Ships",
    "work.heading": "Engineered for Scale, Built to Last",
    "work.subheading": "Explore real-world software platforms shipped for ambitious tech companies.",

    "calc.badge": "Interactive Estimator",
    "calc.heading": "Estimate Your Sprint & Architecture",
    "calc.subheading": "Select your parameters to get an instant engineering scope and team configuration.",

    "testim.badge": "Founder Proof",
    "testim.heading": "Trusted by Tech Founders & CTOs",
    "testim.subheading": "Hear from venture-backed teams that scaled their products with Vexus Lab.",

    "cta.heading": "Ready to build software that scales to millions?",
    "cta.subheading": "Skip the 6-month recruitment cycle. Partner with our senior engineering studio and ship your production product in 14 days.",
    "cta.primary": "Book 30-Min Technical Call",
    "cta.secondary": "Explore Case Studies",
  },
  es: {
    // Nav Items
    "nav.services": "Servicios",
    "nav.products": "Productos",
    "nav.industries": "Industrias",
    "nav.velocityAi": "Vexus VelocityAI",
    "nav.insights": "Perspectivas",
    "nav.aboutUs": "Nosotros",
    "nav.careers": "Carreras",
    "nav.contact": "Contacto",
    "nav.selectLanguage": "Seleccionar Idioma",

    // Industries
    "ind.privateEquity": "Capital Privado",
    "ind.privateEquity.desc": "Creación de valor, diligencia debida técnica y aceleración digital posterior a la fusión.",
    "ind.financialServices": "Servicios Financieros",
    "ind.financialServices.desc": "Modernización de banca central, plataformas de negociación algorítmica y APIs fintech.",
    "ind.industrialEnergy": "Industrial y Energía",
    "ind.industrialEnergy.desc": "Fábricas inteligentes, mantenimiento predictivo IIoT y software de redes renovables.",
    "ind.mobility": "Movilidad",
    "ind.mobility.desc": "SO para vehículos conectados, infraestructura de carga de vehículos eléctricos y flotas.",
    "ind.technology": "Tecnología",
    "ind.technology.desc": "Escalabilidad de plataformas SaaS, ingeniería multi-inquilino y herramientas para desarrolladores.",
    "ind.communications": "Comunicaciones y Redes",
    "ind.communications.desc": "Segmentación de redes 5G, núcleo de telecomunicaciones virtualizado y orquestación SDN.",
    "ind.healthcare": "Salud y Ciencias Biológicas",
    "ind.healthcare.desc": "Telemedicina compatible con HIPAA, análisis de ensayos clínicos y software médico.",
    "ind.media": "Medios y Entretenimiento",
    "ind.media.desc": "Arquitecturas de transmisión de baja latencia, licencias DRM y entrega de contenido inmersivo.",
    "ind.retail": "Comercio Minorista y Consumo",
    "ind.retail.desc": "Motores de comercio omnicanal, recomendaciones de IA hiperpersonalizadas y cadena de suministro.",
    "ind.aerospace": "Aeroespacial y Defensa Avanzada",
    "ind.aerospace.desc": "Software de aviónica de misión crítica, análisis geoespacial y computación rugerizada.",

    // Services
    "srv.digitalArch": "Arquitectura de Producto Digital",
    "srv.digitalArch.desc": "Microservicios empresariales, sistemas basados en eventos y modelos en la nube.",
    "srv.cloudDevops": "Ingeniería en la Nube y DevOps",
    "srv.cloudDevops.desc": "Pipelines de CI/CD multinube automatizados, Kubernetes e infraestructura como código.",
    "srv.dataAi": "Datos e Inteligencia Artificial",
    "srv.dataAi.desc": "Modernos data lakehouses, transmisión analítica en tiempo real y pipelines de ML.",
    "srv.cybersecurity": "Ciberseguridad y Cumplimiento",
    "srv.cybersecurity.desc": "Arquitecturas de confianza cero, defensa criptográfica y certificaciones SOC2/HIPAA.",
    "srv.qualityEng": "Ingeniería de Calidad y Pruebas",
    "srv.qualityEng.desc": "Automatización continua de pruebas 'shift-left', perfiles de rendimiento y fiabilidad.",
    "srv.genAi": "IA Generativa y Soluciones LLM",
    "srv.genAi.desc": "Modelos fundacionales optimizados, arquitecturas vectoriales RAG y agentes autónomos.",
    "srv.experienceDesign": "Diseño de Experiencia e Interfaz",
    "srv.experienceDesign.desc": "Sistemas de diseño centrados en el usuario, creación de prototipos y accesibilidad.",
    "srv.embeddedIot": "Sistemas Embebidos e IoT",
    "srv.embeddedIot.desc": "Telemetría perimetral en tiempo real, firmware conectado y ecosistemas inteligentes.",
    "srv.legacyModern": "Modernización de Sistemas Legados",
    "srv.legacyModern.desc": "Descomposición de monolitos en microservicios, migración a la nube y saneamiento de código.",
    "srv.sre": "Fiabilidad del Sitio y Rendimiento",
    "srv.sre.desc": "SLAs de 99.999% de disponibilidad, arquitecturas tolerantes a fallos y observabilidad.",

    // Hero Section (Software Development Startup)
    "hero.badge": "Estudio de Desarrollo de Software de Próxima Generación",
    "hero.title": "Construyendo software de alta velocidad para startups y empresas ambiciosas.",
    "hero.subtitle": "Desde MVPs iniciales hasta aplicaciones web empresariales, infraestructura en la nube y agentes de IA. Combinamos ingeniería de élite con stacks modernos para entregar código de producción 10x más rápido.",
    "hero.explore": "Inicia tu Proyecto",
    "hero.viewTokens": "Explorar Nuestro Stack",
    "hero.stat.equal": "< 14 Días",
    "hero.stat.equalDesc": "Tiempo Promedio a MVP en Producción",
    "hero.stat.wcag": "10x",
    "hero.stat.wcagDesc": "Mayor Velocidad de Ingeniería",
    "hero.stat.variants": "99.999%",
    "hero.stat.variantsDesc": "Disponibilidad de Nube sin Caídas",
    "hero.stat.lang": "Cero",
    "hero.stat.langDesc": "Deuda Técnica Garantizada",

    // Startup Sections
    "services.badge": "Ingeniería de Ciclo Completo",
    "services.heading": "Lo Que Construimos Para Startups de Alto Crecimiento",
    "services.subheading": "Arquitectura de nivel empresarial combinada con velocidad de startup. Diseñamos cada capa con precisión.",
    
    "process.badge": "Cómo Desarrollamos",
    "process.heading": "De la Idea en Servilleta a Producción en 14 Días",
    "process.subheading": "Sin burocracia. Sin traspasos a juniors. Colaboración directa con arquitectos principales.",

    "work.badge": "Lanzamientos Recientes",
    "work.heading": "Diseñado para Escalar, Construido para Perdurar",
    "work.subheading": "Explora plataformas de software reales creadas para empresas tecnológicas ambiciosas.",

    "calc.badge": "Estimador Interactivo",
    "calc.heading": "Calcula tu Sprint y Arquitectura",
    "calc.subheading": "Selecciona tus parámetros para obtener un alcance de ingeniería inmediato y estructura de equipo.",

    "testim.badge": "Prueba de Fundadores",
    "testim.heading": "Confiado por Fundadores y CTOs Tecnológicos",
    "testim.subheading": "Escucha a equipos respaldados por capital de riesgo que escalaron sus productos con Vexus Lab.",

    "cta.heading": "¿Listo para construir software que escale a millones?",
    "cta.subheading": "Omite el ciclo de contratación de 6 meses. Asóciate con nuestro estudio de ingeniería senior y lanza en 14 días.",
    "cta.primary": "Reservar Llamada Técnica de 30 Min",
    "cta.secondary": "Explorar Casos de Estudio",
  },
  de: {
    // Nav Items
    "nav.services": "Dienstleistungen",
    "nav.products": "Produkte",
    "nav.industries": "Branchen",
    "nav.velocityAi": "Vexus VelocityAI",
    "nav.insights": "Einblicke",
    "nav.aboutUs": "Über Uns",
    "nav.careers": "Karriere",
    "nav.contact": "Kontakt",
    "nav.selectLanguage": "Sprache Wählen",

    // Industries
    "ind.privateEquity": "Private Equity",
    "ind.privateEquity.desc": "Wertschöpfung, technische Due Diligence und digitale Beschleunigung nach Fusionen.",
    "ind.financialServices": "Finanzdienstleistungen",
    "ind.financialServices.desc": "Modernisierung des Kernbankgeschäfts, algorithmische Handelsplattformen und Fintech-APIs.",
    "ind.industrialEnergy": "Industrie & Energie",
    "ind.industrialEnergy.desc": "Intelligente Fabriken, vorausschauende IIoT-Wartung und Software für erneuerbare Energien.",
    "ind.mobility": "Mobilität",
    "ind.mobility.desc": "Betriebssysteme für vernetzte Fahrzeuge, Ladeinfrastruktur für E-Fahrzeuge und Fuhrparkmanagement.",
    "ind.technology": "Technologie",
    "ind.technology.desc": "SaaS-Plattformskalierung, mandantenfähige Architektur und Entwickler-Tools.",
    "ind.communications": "Telekommunikation & Netzwerke",
    "ind.communications.desc": "5G-Netzwerk-Slicing, virtualisierter Core und SDN-Orchestrierung.",
    "ind.healthcare": "Gesundheitswesen & Biowissenschaften",
    "ind.healthcare.desc": "HIPAA-konforme Telemedizin, klinische Studienanalytik und Medizintechnik-Software.",
    "ind.media": "Medien & Unterhaltung",
    "ind.media.desc": "Streaming-Architekturen mit extrem geringer Latenz, DRM-Lizenzierung und Immersive Media.",
    "ind.retail": "Handel & Konsumgüter",
    "ind.retail.desc": "Omnichannel-Commerce-Engines, hyperpersonalisierte KI-Empfehlungen und Logistik.",
    "ind.aerospace": "Luft- und Raumfahrt & Verteidigung",
    "ind.aerospace.desc": "Missionskritische Avionik-Software, Geodatenanalyse und gehärtetes Edge-Computing.",

    // Services
    "srv.digitalArch": "Digitale Produktarchitektur",
    "srv.digitalArch.desc": "Unternehmens-Mikroservices, ereignisgesteuerte Systeme und Cloud-Pläne.",
    "srv.cloudDevops": "Cloud & DevOps Engineering",
    "srv.cloudDevops.desc": "Automatisierte Multi-Cloud-CI/CD-Pipelines, Kubernetes und Infrastructure-as-Code.",
    "srv.dataAi": "Daten & Unternehmens-KI",
    "srv.dataAi.desc": "Moderne Data Lakehouses, Echtzeitanalysen und ML-Pipelines für Großunternehmen.",
    "srv.cybersecurity": "Cybersicherheit & Compliance",
    "srv.cybersecurity.desc": "Zero-Trust-Architekturen, kryptografischer Schutz und SOC2/HIPAA-Zertifizierungen.",
    "srv.qualityEng": "Qualitäts- & Testautomatisierung",
    "srv.qualityEng.desc": "Kontinuierliche Testautomatisierung, Leistungsprofile und Zuverlässigkeitssicherung.",
    "srv.genAi": "Generative KI & LLM-Lösungen",
    "srv.genAi.desc": "Kundenspezifische Basismodelle, RAG-Vektorarchitekturen und autonome KI-Agenten.",
    "srv.experienceDesign": "Erlebnis- & Schnittstellendesign",
    "srv.experienceDesign.desc": "Nutzerzentrierte Designsysteme, schnelles Prototyping und barrierefreie UI/UX.",
    "srv.embeddedIot": "Eingebettete Systeme & IoT",
    "srv.embeddedIot.desc": "Echtzeit-Edge-Telemetrie, Firmware für vernetzte Hardware und Smart-Devices.",
    "srv.legacyModern": "Modernisierung von Altsystemen",
    "srv.legacyModern.desc": "Monolith-zu-Mikroservices-Transformation, Cloud-Migration und Refactoring.",
    "srv.sre": "Zuverlässigkeit & Performance",
    "srv.sre.desc": "Hochverfügbarkeits-SLAs (99,999%), fehlertolerante Architekturen und Observability.",

    // Hero Section (Software Development Startup)
    "hero.badge": "Next-Gen Softwareentwicklungs-Studio",
    "hero.title": "Entwicklung von High-Velocity Software für ambitionierte Startups.",
    "hero.subtitle": "Von 0-zu-1 MVPs bis hin zu hochskalierbaren Web-Apps, Cloud-Plattformen und KI-Agenten. Wir kombinieren erstklassiges Engineering mit modernen Stacks, um 10x schneller produktionsreifen Code zu liefern.",
    "hero.explore": "Projekt Starten",
    "hero.viewTokens": "Modernen Stack Entdecken",
    "hero.stat.equal": "< 14 Tage",
    "hero.stat.equalDesc": "Durchschnittliche Zeit zum MVP",
    "hero.stat.wcag": "10x",
    "hero.stat.wcagDesc": "Höhere Entwicklungsgeschwindigkeit",
    "hero.stat.variants": "99.999%",
    "hero.stat.variantsDesc": "Cloud-Verfügbarkeit im Betrieb",
    "hero.stat.lang": "Null",
    "hero.stat.langDesc": "Garantierte Technische Schulden",

    // Startup Sections
    "services.badge": "Full-Cycle Engineering",
    "services.heading": "Was Wir Für High-Growth Startups Bauen",
    "services.subheading": "Enterprise-Architektur kombiniert mit Startup-Geschwindigkeit. Präzision auf jeder Ebene.",
    
    "process.badge": "Wie Wir Liefern",
    "process.heading": "Von der Servietten-Idee zur Produktion in 14 Tagen",
    "process.subheading": "Keine Bürokratie. Keine Junior-Entwickler. Direkte Arbeit mit Principal Architects.",

    "work.badge": "Aktuelle Projekte",
    "work.heading": "Gebaut Für Skalierung, Ausgelegt Auf Dauer",
    "work.subheading": "Entdecken Sie reale Software-Plattformen, die für ambitionierte Tech-Unternehmen entwickelt wurden.",

    "calc.badge": "Interaktiver Schätzer",
    "calc.heading": "Schätzen Sie Ihren Sprint & Ihre Architektur",
    "calc.subheading": "Wählen Sie Ihre Parameter für eine sofortige Projektübersicht und Teamstruktur.",

    "testim.badge": "Gründer-Feedback",
    "testim.heading": "Von Tech-Gründern & CTOs Geschätzt",
    "testim.subheading": "Erfahren Sie, wie VC-finanzierte Teams ihre Produkte mit Vexus Lab skaliert haben.",

    "cta.heading": "Bereit für Software, die auf Millionen Nutzer skaliert?",
    "cta.subheading": "Sparen Sie sich monatelange Einstellungen. Entwickeln Sie ab nächster Woche mit Senior Engineers.",
    "cta.primary": "30-Minuten-Gespräch Buchen",
    "cta.secondary": "Fallstudien Ansehen",
  },
  fr: {
    // Nav Items
    "nav.services": "Services",
    "nav.products": "Produits",
    "nav.industries": "Industries",
    "nav.velocityAi": "Vexus VelocityAI",
    "nav.insights": "Perspectives",
    "nav.aboutUs": "À Propos",
    "nav.careers": "Carrières",
    "nav.contact": "Contact",
    "nav.selectLanguage": "Choisir la Langue",

    // Industries
    "ind.privateEquity": "Capital-Investissement",
    "ind.privateEquity.desc": "Création de valeur, due diligence technologique et accélération post-fusion.",
    "ind.financialServices": "Services Financiers",
    "ind.financialServices.desc": "Modernisation bancaire, plateformes de trading algorithmique et APIs fintech.",
    "ind.industrialEnergy": "Industrie & Énergie",
    "ind.industrialEnergy.desc": "Usines intelligentes, maintenance prédictive IIoT et réseaux d'énergie renouvelable.",
    "ind.mobility": "Mobilité",
    "ind.mobility.desc": "Système d'exploitation véhicule connecté, recharge électrique et gestion de flotte.",
    "ind.technology": "Technologie",
    "ind.technology.desc": "Mise à l'échelle SaaS, ingénierie multi-tenant et outils pour développeurs.",
    "ind.communications": "Opérateurs Télécoms & Réseaux",
    "ind.communications.desc": "Découpage de réseau 5G, cœur de réseau virtualisé et orchestration SDN.",
    "ind.healthcare": "Santé & Sciences de la Vie",
    "ind.healthcare.desc": "Télésanté conforme HIPAA, analyse d'essais cliniques et logiciels médicaux.",
    "ind.media": "Médias & Divertissement",
    "ind.media.desc": "Architectures streaming ultra-faible latence, gestion des droits DRM et multimédia.",
    "ind.retail": "Commerce & Grande Consommation",
    "ind.retail.desc": "Moteurs e-commerce omnicanal, recommandations IA personnalisées et logistique.",
    "ind.aerospace": "Aérospatiale & Défense",
    "ind.aerospace.desc": "Logiciels avioniques critiques, analyse géospatiale et informatique renforcée.",

    // Services
    "srv.digitalArch": "Architecture de Produits Digitaux",
    "srv.digitalArch.desc": "Microservices d'entreprise, architectures événementielles et plans cloud.",
    "srv.cloudDevops": "Ingénierie Cloud & DevOps",
    "srv.cloudDevops.desc": "Pipelines CI/CD multi-cloud automatisés, orchestration Kubernetes et IaC.",
    "srv.dataAi": "Données & IA d'Entreprise",
    "srv.dataAi.desc": "Data lakehouses modernes, streaming analytique en temps réel et pipelines ML.",
    "srv.cybersecurity": "Cybersécurité & Conformité",
    "srv.cybersecurity.desc": "Architectures Zero-Trust, cryptographie de bout en bout et normes SOC2/HIPAA.",
    "srv.qualityEng": "Ingénierie Qualité & Automatisation",
    "srv.qualityEng.desc": "Automatisation des tests shift-left, profilage de performance et fiabilité.",
    "srv.genAi": "IA Générative & Solutions LLM",
    "srv.genAi.desc": "Modèles de fondation sur mesure, architectures vectorielles RAG et agents autonomes.",
    "srv.experienceDesign": "Design d'Expérience & Interface",
    "srv.experienceDesign.desc": "Systèmes de design centrés sur l'humain, prototypage rapide et accessibilité.",
    "srv.embeddedIot": "Systèmes Embarqués & IoT",
    "srv.embeddedIot.desc": "Télémétrie edge temps réel, firmware d'appareils connectés et sécurité IoT.",
    "srv.legacyModern": "Modernisation des Systèmes Anciens",
    "srv.legacyModern.desc": "Décomposition monolithe vers microservices, migration cloud et refactorisation.",
    "srv.sre": "Fiabilité & Performance du Site",
    "srv.sre.desc": "SLAs de disponibilité à 99,999%, architectures tolérantes aux pannes et observabilité.",

    // Hero Section (Software Development Startup)
    "hero.badge": "Studio de Développement Logiciel Nouvelle Génération",
    "hero.title": "Développer des logiciels haute vélocité pour startups ambitieuses.",
    "hero.subtitle": "Du MVP 0-à-1 aux applications web d'entreprise, infrastructures cloud et agents IA autonomes. Nous allions ingénierie d'élite et stacks modernes pour livrer du code de production 10x plus vite.",
    "hero.explore": "Démarrer Votre Projet",
    "hero.viewTokens": "Explorer Notre Stack",
    "hero.stat.equal": "< 14 Jours",
    "hero.stat.equalDesc": "Délai Moyen vers un MVP en Production",
    "hero.stat.wcag": "10x",
    "hero.stat.wcagDesc": "Vélocité de Développement Accrue",
    "hero.stat.variants": "99.999%",
    "hero.stat.variantsDesc": "Disponibilité Cloud Haute Résilience",
    "hero.stat.lang": "Zéro",
    "hero.stat.langDesc": "Dette Technique Garantie",

    // Startup Sections
    "services.badge": "Ingénierie de Cycle Complet",
    "services.heading": "Ce Que Nous Construisons Pour Les Startups",
    "services.subheading": "Une architecture de niveau entreprise alliée à la vélocité des startups.",
    
    "process.badge": "Notre Méthode",
    "process.heading": "De l'Idée sur Papier à la Production en 14 Jours",
    "process.subheading": "Aucune bureaucratie. Aucun développeur junior. Collaboration directe avec des architectes chevronnés.",

    "work.badge": "Projets Récents",
    "work.heading": "Conçu Pour Évoluer, Bâti Pour Durer",
    "work.subheading": "Découvrez des plateformes logicielles réelles développées pour des entreprises ambitieuses.",

    "calc.badge": "Estimateur Interactif",
    "calc.heading": "Estimez Votre Sprint & Architecture",
    "calc.subheading": "Sélectionnez vos critères pour obtenir un cadrage technique immédiat.",

    "testim.badge": "Témoignages",
    "testim.heading": "Recommandé par des Fondateurs et CTOs",
    "testim.subheading": "Découvrez comment des startups financées ont accéléré leur croissance avec Vexus Lab.",

    "cta.heading": "Prêt à créer un logiciel capable d'atteindre des millions d'utilisateurs ?",
    "cta.subheading": "Évitez 6 mois de recrutement. Démarrez la semaine prochaine avec notre équipe senior.",
    "cta.primary": "Réserver un Appel Technique de 30 Min",
    "cta.secondary": "Découvrir les Études de Cas",
  },
  ja: {
    // Nav Items
    "nav.services": "サービス",
    "nav.products": "プロダクト・実績",
    "nav.industries": "業界別ソリューション",
    "nav.velocityAi": "Vexus VelocityAI",
    "nav.insights": "インサイト",
    "nav.aboutUs": "企業情報",
    "nav.careers": "採用情報",
    "nav.contact": "お問い合わせ",
    "nav.selectLanguage": "言語を選択",

    // Industries
    "ind.privateEquity": "プライベート・エクイティ",
    "ind.privateEquity.desc": "投資先企業の価値創造、技術デューデリジェンス、統合後のデジタル加速。",
    "ind.financialServices": "金融サービス",
    "ind.financialServices.desc": "勘定系システムのモダナイゼーション、アルゴリズム取引、セキュアなFinTech API。",
    "ind.industrialEnergy": "産業・エネルギー",
    "ind.industrialEnergy.desc": "スマートファクトリー、IIoT予知保全、再生可能エネルギープラットフォーム。",
    "ind.mobility": "モビリティ",
    "ind.mobility.desc": "コネクテッドカーOS、EV充電インフラ、インテリジェント運行管理ソフトウェア。",
    "ind.technology": "テクノロジー",
    "ind.technology.desc": "SaaSプラットフォーム拡張、マルチテナント設計、開発者エコシステム構築。",
    "ind.communications": "通信・ネットワークプロバイダー",
    "ind.communications.desc": "5Gネットワークスライシング、仮想化テレコムコア、SDNオーケストレーション。",
    "ind.healthcare": "ヘルスケア・ライフサイエンス",
    "ind.healthcare.desc": "HIPAA準拠遠隔医療、治験データ分析、医療機器向け組込みソフトウェア。",
    "ind.media": "メディア・エンターテインメント",
    "ind.media.desc": "超低遅延ストリーミング、DRM著作権管理、没入型コンテンツ配信基盤。",
    "ind.retail": "小売・消費財",
    "ind.retail.desc": "オムニチャネルコマースエンジン、高度パーソナライズAI、サプライチェーン最適化。",
    "ind.aerospace": "航空宇宙・防衛",
    "ind.aerospace.desc": "ミッションクリティカルなアビオニクス、地理空間データ分析、堅牢エッジAI。",

    // Services
    "srv.digitalArch": "デジタル製品アーキテクチャ",
    "srv.digitalArch.desc": "エンタープライズマイクロサービス、イベント駆動型システム、クラウドブループリント。",
    "srv.cloudDevops": "クラウド & DevOpsエンジニアリング",
    "srv.cloudDevops.desc": "マルチクラウドCI/CDパイプライン自動化、Kubernetes、IaCコード化基盤。",
    "srv.dataAi": "データ & エンタープライズAI",
    "srv.dataAi.desc": "モダンデータレイクハウス、リアルタイムストリーミング分析、企業向けML基盤。",
    "srv.cybersecurity": "サイバーセキュリティ & コンプライアンス",
    "srv.cybersecurity.desc": "ゼロトラストアーキテクチャ、暗号化防御、SOC2/HIPAA規制コンプライアンス保証。",
    "srv.qualityEng": "品質エンジニアリング & 自動化",
    "srv.qualityEng.desc": "シフトレフトテスト自動化、パフォーマンスプロファイリング、高信頼性エンジニアリング。",
    "srv.genAi": "生成AI & LLMソリューション",
    "srv.genAi.desc": "カスタムファインチューニング基盤モデル、RAGベクトル検索、自律型AIエージェント。",
    "srv.experienceDesign": "エクスペリエンス & UI/UXデザイン",
    "srv.experienceDesign.desc": "人間中心設計、ラピッドプロトタイピング、アクセシビリティ優先のデジタル体験。",
    "srv.embeddedIot": "組込みシステム & IoT",
    "srv.embeddedIot.desc": "リアルタイムエッジテレメトリ、コネクテッドハードウェアファームウェア開発。",
    "srv.legacyModern": "レガシーシステム刷新",
    "srv.legacyModern.desc": "モノリスからマイクロサービスへの移行、クラウドマイグレーション、技術負債解消。",
    "srv.sre": "サイト信頼性エンジニアリング (SRE)",
    "srv.sre.desc": "99.999%高可用性SLA、フォールトトレラント設計、オブザーバビリティ、カオス工学。",

    // Hero Section (Software Development Startup)
    "hero.badge": "次世代ソフトウェア開発スタジオ",
    "hero.title": "成長企業のための超高速ソフトウェアエンジニアリング。",
    "hero.subtitle": "ゼロからのMVP開発からエンタープライズ規模のWebアプリ、クラウド基盤、自律型AIエージェントまで。最新技術スタックと卓越した設計力で、本番コードを10倍の速度で提供します。",
    "hero.explore": "プロジェクトを開始する",
    "hero.viewTokens": "技術スタックを見る",
    "hero.stat.equal": "< 14日",
    "hero.stat.equalDesc": "本番MVPローンチまでの平均期間",
    "hero.stat.wcag": "10倍",
    "hero.stat.wcagDesc": "圧倒的なエンジニアリング速度",
    "hero.stat.variants": "99.999%",
    "hero.stat.variantsDesc": "高可用性クラウド稼働率",
    "hero.stat.lang": "ゼロ",
    "hero.stat.langDesc": "技術的負債ゼロの設計",

    // Startup Sections
    "services.badge": "フルサイクル・エンジニアリング",
    "services.heading": "急成長スタートアップのための開発領域",
    "services.subheading": "エンタープライズ品質のアーキテクチャとスタートアップの圧倒的開発スピードを両立。",
    
    "process.badge": "開発プロセス",
    "process.heading": "アイデアから14日で本番ローンチへ",
    "process.subheading": "無駄な官僚主義なし。ジュニアへの丸投げなし。リードアーキテクトと直接開発。",

    "work.badge": "開発実績",
    "work.heading": "スケールを見据えた堅牢な設計",
    "work.subheading": "急成長テック企業向けに本番稼働させた実際のソフトウェアプラットフォーム。",

    "calc.badge": "インタラクティブ見積もり",
    "calc.heading": "スプリント＆アーキテクチャ試算",
    "calc.subheading": "要件を選択して、即座に開発スコープと推奨チーム体制を算出します。",

    "testim.badge": "創業者の声",
    "testim.heading": "テック創業者・CTOからの高い信頼",
    "testim.subheading": "Vexus Labとともにプロダクトを急成長させたVC出資企業のリアルな評価。",

    "cta.heading": "数百万人のユーザーにスケールするソフトウェアを作りませんか？",
    "cta.subheading": "数ヶ月の採用待ちをスキップ。今すぐシニアエンジニアチームと開発を開始できます。",
    "cta.primary": "30分間の技術相談を予約する",
    "cta.secondary": "開発実績を見る",
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  // Load persisted language from localStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("vexus_language") as LanguageCode;
      if (savedLang && TRANSLATIONS[savedLang]) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("vexus_language", lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage errors
    }
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
