/** Business constants — edit here instead of PDF/layout components. */

export const company = {
  legalName: 'Wadhwa Enterprises',
  brandName: 'Windal',
  tagline: 'Premium Architectural Glass & Aluminium Systems',

  address: {
    line1: '11, Gumti Gurudwara Building, GT Road',
    line2: 'Kanpur — 208012, Uttar Pradesh',
  },

  phone: '+91 98390 36334',
  email: 'samir.w@windal.in',
  website: 'windal.in',
  gstin: '09AABPW2030P1ZD',

  /** Supply location for GST: intrastate (UP) → CGST+SGST, else IGST */
  registeredState: 'Uttar Pradesh',
  registeredStateAliases: ['uttar pradesh', 'u.p.', ' uttar pradesh', 'up ', ' up', 'kanpur'],

  bank: {
    accountName: 'WADHWA ENTERPRISES',
    accountNo: '09410400008722',
    bankName: 'Bank of Baroda, Sisamau, Kanpur',
    ifsc: 'BARB0SISAMA',
  },

  upi: {
    vpa: '09410400008722@barodampay',
    payeeName: 'WADHWA ENTERPRISES',
  },

  defaults: {
    preparedBy: 'Samir Wadhwa',
    quotePrefix: 'WIN-QT',
    quoteValidityDays: 15,
  },

  signatory: {
    name: 'Samir Wadhwa',
    title: 'Director, Wadhwa Enterprises',
  },

  footerLine: 'windal.in  ·  samir.w@windal.in  ·  +91 98390 36334',

  pricingFootnote:
    'AluK — globally certified European aluminium systems brand used across India.',

  termsIntro:
    'Please read all terms carefully. Signing or emailing approval of this document constitutes full acceptance.',

  termsSections: [
    {
      num: '01',
      title: 'PRODUCT & SPECIFICATIONS',
      bullets: [
        'All specifications, colours, and hardware are final upon sign-off. Minor visual variations from showroom samples may occur due to scale.',
        'Systems are custom-manufactured; no two units are identical.',
        'Signed document or email approval constitutes a binding contract.',
      ],
    },
    {
      num: '02',
      title: 'ORDER CONFIRMATION & PAYMENT',
      bullets: [
        'Quotation valid for 15 days from date of issue.',
        'Orders confirmed only on receipt of advance. No cancellations or refunds post-confirmation.',
        'Schedule: 50% Advance · 40% Before Dispatch · 10% Post Installation.',
        'Site must be ready within 3 months of order, else subject to price revision.',
      ],
    },
    {
      num: '03',
      title: 'SITE READINESS (CUSTOMER SCOPE)',
      bullets: [
        'Civil structure with plaster / POP complete. Jambs, soffits, and sills must be smooth, level, and finished.',
        'Scaffolding, electricity, and water to be provided by the customer at site.',
        'Aperture tapering or unevenness must be corrected prior to installation.',
      ],
    },
    {
      num: '04',
      title: 'SURVEY & TECHNICAL REVIEW',
      bullets: [
        'Survey is scheduled only after site readiness confirmation and advance receipt.',
        'Any post-sign-off specification change (size, colour, glass type) requires a revised quotation and may incur charges.',
      ],
    },
    {
      num: '05',
      title: 'PRODUCTION & DISPATCH',
      bullets: [
        'Production commences after survey sign-off. Lead time: 45 to 60 days for standard finishes.',
        "On delivery, material must be stored upright in a dry, protected area. Customer's responsibility.",
      ],
    },
    {
      num: '06',
      title: 'INSTALLATION & WARRANTY',
      bullets: [
        'Installation scheduled once major civil and interior work is complete.',
        'Protection tape must be removed within 30 days of installation.',
        'Warranty on hardware and profile integrity is valid only upon quality check, signed handover, and 100% payment clearance.',
      ],
    },
  ],

  introLetter: {
    greeting: (clientName) => `Dear ${clientName},`,
    paragraphs: [
      'Thank you for considering Windal Systems for your project. It is a privilege to present this quotation, and we look forward to being a trusted part of your space from start to finish.',
      'Every system we supply is custom-fabricated to your exact openings using AluK aluminium profiles, a globally certified European brand used in landmark residential and commercial projects across India. Our systems are built and tested for thermal comfort, sound control, wind resistance, and long-term structural strength.',
      'We are confident the solution below will enhance both the beauty and functionality of your space for decades to come. Our team is available at every step — from survey to installation and beyond.',
    ],
    closingLine:
      'We value this opportunity and look forward to a long-standing association with you.',
  },
};
