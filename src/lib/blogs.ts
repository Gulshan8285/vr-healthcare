export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  summary: string;
  content: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "essential-elderly-care-guide-at-home",
    title: "The Complete Guide to Arranging In-Home Elderly Care",
    category: "Elderly Care",
    readTime: "5 min read",
    publishDate: "October 18, 2026",
    author: "VR Healthcare Advisory Team",
    summary:
      "Practical advice for families on supporting aging parents at home with dignity, routine consistency, and respectful attendant support.",
    content: `Caring for an aging parent or relative at home is an emotional and delicate responsibility. As loved ones advance in years, familiar domestic surroundings offer a profound sense of comfort, security, and emotional peace.

### 1. Establish Predictable Daily Routines
Older adults thrive when there is a gentle, dependable rhythm to each day. Maintaining fixed hours for waking, morning tea, assisted personal hygiene, gentle walks, and meals reduces disorientation and anxiety.

### 2. Prioritize Dignity in Personal Care
Accepting help with bathing, dressing, or mobility can be difficult for seniors who have been self-reliant all their lives. A compassionate caregiver listens patiently, respects personal boundaries, and encourages the senior to do what they safely can on their own.

### 3. Medication Tracking and Reminders
Keeping an up-to-date printed medicine chart and organizing daily pill organizers eliminates the danger of missed or double doses. Attendants provide timely hydration checks and reminders according to the physician's prescription.

### 4. Continuous Caregiver Coordination
Family members frequently face stress trying to balance professional commitments and caregiving. Engaging a dedicated daytime or night home care attendant brings peace of mind and ensures that senior family members are never left unattended.`,
  },
  {
    slug: "post-hospitalization-recovery-at-home",
    title: "Safe Post-Hospitalization Recovery: What Families Need to Know",
    category: "Recovery Care",
    readTime: "4 min read",
    publishDate: "October 12, 2026",
    author: "VR Healthcare Coordination Desk",
    summary:
      "How to prepare the home environment, support bed transfers, and coordinate convalescence smoothly after hospital discharge.",
    content: `The transition from a hospital bed back to the home is a critical period in a patient's healing process. Convalescence requires rest, emotional reassurance, and careful everyday physical assistance.

### 1. Preparing the Recovery Room
Before discharge, make sure the recovery room is clean, airy, and free of clutter. The bed should be positioned at an accessible height with non-slip rugs removed and emergency call bells or buzzers kept within reach.

### 2. Gentle Mobility & Convalescence Support
Patients recovering from surgeries or prolonged bed rest often experience dizziness or muscle weakness. An attendant helps with safe positioning, sitting up gradually, and using walkers or walking sticks safely.

### 3. Clear Separation of Clinical and Everyday Care
It is important to remember that non-clinical attendants handle daily living tasks, meal assistance, comfort, and companion observation. Prescription modifications, sterile dressing changes, and clinical injections must strictly be supervised by hospital doctors or visiting registered nurses.`,
  },
  {
    slug: "home-safety-fall-prevention-seniors",
    title: "Home Safety & Fall Prevention Checklist for Senior Citizens",
    category: "Home Safety",
    readTime: "6 min read",
    publishDate: "October 5, 2026",
    author: "VR Healthcare Safety Desk",
    summary:
      "Crucial environmental adaptations to make living rooms, bathrooms, and corridors safe, slip-resistant, and comfortable.",
    content: `According to global healthcare surveys, accidental slips and falls are among the leading causes of injury among adults aged 65 and above. Fortunately, the vast majority of domestic falls can be prevented through simple modifications.

### Bathroom Safety
- Install sturdy grab bars near the toilet seat and shower area.
- Place anti-skid rubber mats inside the bathing stall.
- Ensure the floor is dried immediately after showers.
- Provide a sturdy shower stool so the elder can bathe seated safely.

### Corridor and Bedroom Lighting
- Install soft night-lights in hallways and between the bedroom and bathroom.
- Keep light switches accessible from the bedside.
- Clear trailing extension cords, low coffee tables, and loose footmats.

### Footwear & Mobility
- Ensure comfortable, closed-heel slippers with rubber grip soles are worn indoors instead of smooth socks.
- Regular accompaniment during morning walking routines significantly lowers anxiety and prevents sudden loss of balance.`,
  },
  {
    slug: "role-of-patient-attendants-caregiver-relief",
    title: "How Patient Attendants Provide Dedicated Support & Family Relief",
    category: "Patient Attendants",
    readTime: "4 min read",
    publishDate: "September 28, 2026",
    author: "VR Healthcare Coordination Desk",
    summary:
      "Understanding the role of non-clinical patient attendants and how they relieve family burnout while keeping loved ones comfortable.",
    content: `When a loved one experiences chronic illness or declining mobility, family members naturally step up. However, balancing full-time employment, childcare, and 24-hour bedside care frequently leads to caregiver fatigue.

### What Does a Patient Attendant Do?
- Assistance with daily personal hygiene, bathing, and grooming.
- Support with mobility, gentle walking, and transferring between bed and wheelchair.
- Serving meals, encouraging timely fluid intake, and tracking general comfort.
- Keeping the patient's immediate room and bedding sanitized and fresh.
- Providing warm, respectful companionship and attentive presence throughout shifts.

### Bringing Balance to Families
By delegating everyday physical support to a dedicated home care attendant, family members can return to their primary emotional role as loving sons, daughters, and spouses without burnout.`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
