/**
 * config.js — Site configuration
 *
 * HOW TO USE:
 *  - For LOCAL development: edit the values below directly (do NOT commit real keys).
 *  - For PRODUCTION / GitHub Pages: set the real key on the Web3Forms dashboard
 *    with a Domain Restriction so it only works on your domain.
 *
 * WHY this file is NOT a secret:
 *  Static sites cannot truly hide keys from the browser.
 *  Security for Web3Forms comes from DOMAIN RESTRICTION on their dashboard:
 *  https://web3forms.com/dashboard → Manage Keys → Allowed Domains
 *  Add: storiesideascreator.com (or your GitHub Pages domain)
 *  With domain restriction ON, this key is useless from any other origin.
 *
 * The ntfy.sh topic below — keep it long and unguessable.
 */
const SITE_CONFIG = {
  // Web3Forms access key — domain-restricted on web3forms.com dashboard
  WEB3FORMS_ACCESS_KEY: "48ed920e-e96f-4af0-8768-c2750db279fe",

  // ntfy.sh topic — keep this private and hard-to-guess
  NTFY_TOPIC: "stories_ideas_creator_leads_x7Kp2mNqR9bW",
};
