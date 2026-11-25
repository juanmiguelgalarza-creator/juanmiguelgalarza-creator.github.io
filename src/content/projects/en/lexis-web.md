---
order: 2
slug: lexis-web
category: "Web & Design System"
title: "Lexis · Public Website"
thesis: "Five products, two brands, one system: redesigning Lexis's public website around answers you can verify."
role: "Product Designer · Full redesign. Development by the Lexis team"
dates: "Oct 2026 – Present · In development"
scope: "Design system, 18 pages, desktop / tablet / mobile"
heroImage: /images/lexis-web/home/hero.jpg
work:
  - section: "Design system"
    text: "Three typefaces, each with one job, a base-4 spacing scale, and a color system in two layers. The contrast table doesn't just list the pairings that pass WCAG 2.2 AA: it flags the ones that fail and spells out where they're still allowed, like large text, icons, or borders only."
    images:
      - src: /images/lexis-web/design-system/tipografia.jpg
        alt: "Typography scale: Newsreader, Geist and Geist Mono"
      - src: /images/lexis-web/design-system/color.jpg
        alt: "Color primitives: petrol, turquoise, terracotta, neutrals, Litigant+ and LEX"
      - src: /images/lexis-web/design-system/estructura.jpg
        alt: "Spacing, radius, elevation, and grids for desktop, tablet and mobile"
      - src: /images/lexis-web/design-system/contraste.jpg
        alt: "WCAG 2.2 AA contrast table with passing and failing pairs"
  - section: "One system, two brands"
    text: "Litigant+ needed to feel like software, not like a law firm, while still being backed by Lexis. Instead of a second design system, the semantic tokens have a Litigant+ mode: the same component and the same structure, with a different brand. That's what lets the Litigant+ landing go dark and electric without duplicating a single component."
    images:
      - src: /images/lexis-web/design-system/modos-lexis-litigant.jpg
        alt: "The same component in Lexis mode and in Litigant+ mode"
  - section: "Home"
    text: "The home leads with the argument instead of a feature list: an answer without its source is useless in court. The LEX interface sits next to three annotations on what every answer cites (the exact article, the Registro Oficial edition it was published in, and the date that wording remains in force), and the five lines of business follow as a single list over one documentary base."
    images:
      - src: /images/lexis-web/home/trazabilidad.jpg
        alt: "Home section: the LEX interface with three annotations on what every answer cites"
      - src: /images/lexis-web/home/lineas.jpg
        alt: "The five lines of business"
  - section: "Desktop, tablet, mobile"
    text: "Every page was designed at three breakpoints, on 12, 8, and 4 column grids. Running text never goes past 720px, the width where a line of legal text is still comfortable to read."
    images:
      - src: /images/lexis-web/home/responsive.jpg
        alt: "The home at desktop, tablet and mobile"
  - section: "Service landings"
    text: "Each product gets its own landing, built from the same components. LEX explains how a query travels, what every answer includes, where its limits are, and how professional secrecy covers what the user writes. Litigant+ switches to its own brand mode and opens with the problems it solves for law firms."
    images:
      - src: /images/lexis-web/landings/lex.jpg
        alt: "LEX landing"
      - src: /images/lexis-web/landings/litigant.jpg
        alt: "Litigant+ landing in its own brand mode"
  - section: "Online purchase"
    text: "The redesign adds a complete online purchase flow: plan, subscription period, billing details, and payment by card or bank transfer, along with the states that usually get left out: an empty cart, account creation, email verification, a confirmed payment, and a declined one with a clear way to retry."
    images:
      - src: /images/lexis-web/compra/facturacion.jpg
        alt: "Checkout: billing details"
      - src: /images/lexis-web/compra/pago.jpg
        alt: "Checkout: payment method"
      - src: /images/lexis-web/compra/exito.jpg
        alt: "Payment confirmed"
      - src: /images/lexis-web/compra/error.jpg
        alt: "Payment declined, with options to retry or write on WhatsApp"
result: "The site is being developed by the Lexis team and hasn't launched yet, so there are no metrics to report. What the team is building from: one set of components for five lines of business and two brands, accessibility decisions documented pair by pair, and every page specified at three breakpoints."
lesson: "In a sector built on precision, the design system is part of the argument. Reserving a typeface for verifiable data, so a citation always looks like a citation, earns more trust than any claim about AI."
nextSlug: heka
---

## Context

Lexis is no longer a single product. It grew into five lines of business that share one documentary base: legal research, the LEX AI agent, Litigant+ for case management, Academia LEXIS, and custom software development. The public website had to explain all five, sell them online, and do it in a sector where trust is earned slowly.

The challenge wasn't adding pages. It was building a system that could carry five products under one brand, let Litigant+ keep its own identity without splitting the components in two, and put what actually sets Lexis apart in front of the visitor first: answers you can trace back to the exact norm.

## Process / My Role

I designed the full redesign end to end, from the foundations to every page. The Lexis team is handling development.

I started with the system, not the homepage. Each typeface has one job: Newsreader for institutional and editorial moments, Geist for interface and reading, and Geist Mono reserved for verifiable data (Registro Oficial references, publication and validity dates), so a citation looks like a citation anywhere on the site. Color is split into raw primitives and semantic roles, and the structure collection has desktop, tablet, and mobile modes: switching a frame's mode recalculates margins, gutters, and spacing without rebuilding the layout.

On top of that system I designed 18 pages at three breakpoints: the home, the service landings, the online purchase flow, Academia, news, blog, authors, about, the help center, account, and 404.
