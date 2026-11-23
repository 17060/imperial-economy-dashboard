/* Rebel Counter-Briefing — data, rendering, and interactions.
   Standalone page logic. Reuses DASHBOARD_DATA for Imperial-Control reference
   numbers (inverted into resilience deltas) but does not mutate it. */

(function () {
  const D = window.DASHBOARD_DATA || {};
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /* ── Counter-briefing data (Rebel framing) ──────────────────────────── */
  const REBEL = {
    meta: {
      callsign: 'BURNING SUN',
      cell: 'Coordinated Resistance · Sector 001',
      transmission: 'Counter-briefing · current to 23 November 2026',
      morale: 56,
      moraleTier: 'CAUTIOUS HOLD',
    },

    rebelKPIs: [
      { label: 'Cells Reporting',       value: '308',    delta: '▲ 12 since last cycle',   tone: 'up' },
      { label: 'Free Polities',         value: '88',     delta: '▲ holding (FH 2026)',     tone: 'flat' },
      { label: 'SSA received value: personal-wallet / cross-border P2P shares', value: '32.3% / 70.9%', delta: 'Chainalysis regional data · Jul 2025–Jun 2026', tone: 'up' },
      { label: 'Open-Weight Models',    value: '63%',    delta: '▲ frontier-adjacent share',  tone: 'up' },
    ],

    theatreReadiness: [
      { label: 'Distributed Liquidity', value: 57 },
      { label: 'Civic Institutions',    value: 58 },
      { label: 'Open Information',      value: 47 },
      { label: 'Demand-Side Energy',    value: 41 },
      { label: 'Self-Custody Surface',  value: 63 },
      { label: 'Federated Compute',     value: 44 },
    ],

    directives: [
      'Diversify settlement: maintain non-custodial, multi-chain, multi-jurisdiction posture.',
      'Reinforce subnational governance and independent judiciaries.',
      'Distribute generation: rooftop solar, behind-the-meter storage, community microgrids.',
      'Preserve open-weight model ecosystem and on-device inference paths.',
      'Document and publish — sunlight is a structural defense.',
      'Coordinate across jurisdictions without centralizing command.',
    ],

    /* Decentralization resilience — parallels the Imperial RRI domains.
       Higher score = more resilient. */
    resilience: [
      {
        id: 'energy',
        name: 'Energy',
        score: 12,
        imperial: 100,
        blurb:
          'EIA (19 Nov) reports Q3 oil flows through the three main Middle East chokepoints rose 19%, with Bab el-Mandeb down; Reuters (23 Nov) reports Hormuz flows slowed to about 9.5 mb/d over 10 days through 19 Nov from 12.2 mb/d in October as attacks continued. ' +
          'Routes remain pressured, not closed; scores remain Rebel Resistance 12 / Imperial Control 100.',
        mech: [
          'Rooftop solar + behind-the-meter storage erode single-point dependence',
          'Community microgrids and regional renewables blunt pipeline coercion',
          'Cape of Good Hope reroute institutionalized; pipeline diversion (Yanbu, Fujairah, Ceyhan) preserves partial flow',
        ],
      },
      {
        id: 'debt',
        name: 'Debt',
        score: 26,
        imperial: 89,
        blurb:
          'The IMF’s 23 Nov U.S. Article IV flags persistent deficits, rising debt, and shorter maturities; S&P (19 Nov) describes elevated sovereign yields and heavy issuance. ' +
          'No distinct new distress event or broad repricing step-change is established; resilience remains 26 / Imperial Control 89.',
        mech: [
          'G20 Common Framework + IMF/Paris Club preserve sovereign optionality',
          'EM local-currency debt markets push back on dollar-only architecture',
          'Uncoordinated creditor politics slow unified enforcement across jurisdictions',
        ],
      },
      {
        id: 'governance',
        name: 'Governance',
        score: 69,
        imperial: 79,
        blurb:
          'Reuters (18 Nov) reports Ethiopian and Eritrean forces massing near Badme. ACLED reports EDF forces retook the town and moved toward Tigray, plus an unattributed 19 Nov drone strike; its 20 Nov troop-movement update reported no active fighting. This is escalation risk, not confirmed renewed war. Reuters (19–23 Nov) also reports Bangladesh protest violence amid a political-return standoff. ' +
          'Imperial Control rises 78 → 79 and Rebel Resistance 68 → 69 on a cautious directional reading of fragmented governance.',
        mech: [
          'Federalism diffuses compliance burdens across thousands of subnational units',
          'Independent judiciaries, free press, civil society maintain legitimacy alternatives',
          'Treaty pluralism — no single body commands universal extraterritorial reach',
          '88 Free polities still cluster as legitimacy anchors',
        ],
      },
      {
        id: 'crypto',
        name: 'Crypto',
        score: 40,
        imperial: 100,
        blurb:
          'FinCEN’s MEXC measure takes effect 10 Dec. The SEC’s 19 Nov complaint alleges eight entities used fake crypto platforms to defraud investors of more than $37M; the allegations are unadjudicated and are not a new sanctions or stablecoin action. ' +
          'Imperial Control remains at 100 and Rebel Resistance at 40 because no broad weekly change in self-custody/P2P capacity is established.',
        mech: [
          'Hardware self-custody + multisig reduce custodial seizure surface',
          'Conditional DLT-venue relief creates a narrow tokenized-stock pathway; it is not a general crypto exemption',
          'Peer-to-peer settlement remains a measured alternative subject to applicable rules and service boundaries',
          'Jurisdictional arbitrage (UAE ADGM, Switzerland, Singapore, El Salvador) preserves optionality',
        ],
      },
      {
        id: 'ai',
        name: 'AI / Digital',
        score: 23,
        imperial: 94,
        blurb:
          'Reuters (16 Nov) reports tighter U.S. restrictions aimed at limiting Chinese firms’ access to advanced AI chips through overseas data centers, adding a compute-supply control signal but not a surveillance deployment. Freedom House documents internet controls while satellite connectivity remains a resilience channel. ' +
          'Imperial Control rises 93 → 94; Rebel Resistance stays 23 because no newly scaled resilience system is verified.',
        mech: [
          'Open-weight models + permissive licenses enable independent audit and local fine-tuning',
          'Edge and on-device inference reduces dependence on centralized API gatekeepers',
          'Federated learning + differential privacy limit population-scale data capture',
        ],
      },
    ],

    /* Crypto-as-rebel-finance mechanisms. Analytical, not operational. */
    cryptoMechanisms: [
      {
        id: 'self-custody',
        symbol: '◆',
        title: 'Self-Custody',
        category: 'custody',
        body:
          'Self-custody separates ownership from a single custodian and can reduce dependence on one service provider. ' +
          'Applicable laws, public-ledger visibility, and regulated on-ramps still matter.',
        pills: [
          { text: 'no third-party hold', kind: '' },
          { text: 'multisig quorum', kind: 'green' },
        ],
      },
      {
        id: 'stablecoin-rails',
        symbol: '$',
        title: 'Stablecoin Rails',
        category: 'rails',
        body:
          'Dollar-denominated tokens on public ledgers provide around-the-clock settlement and remittance. ' +
          'Issuer concentration and compliance obligations create a strong control perimeter. FinCEN’s MEXC order and the EU task force show new exchange/sanctions pressure; Chainalysis’ regional wallet/P2P measures remain mixed and retrospective, not evidence of a one-week surge.',
        pills: [
          { text: 'high pressure', kind: 'warn' },
          { text: 'genius act perimeter', kind: 'warn' },
        ],
      },
      {
        id: 'p2p-liquidity',
        symbol: '↔',
        title: 'P2P Liquidity',
        category: 'rails',
        body:
          'Peer-to-peer settlement and decentralized venues preserve alternative pathways at the margin. A 29 October regional report records sizable wallet/P2P activity in Sub-Saharan Africa but also declines in Nigerian DEX and cross-border P2P activity; the data are regional and retrospective. The new MEXC order targets a centralized exchange and does not itself demonstrate reduced self-custody or P2P capacity.',
        pills: [
          { text: 'non-custodial', kind: 'green' },
          { text: 'thin-margin', kind: '' },
        ],
      },
      {
        id: 'cross-border',
        symbol: '⇌',
        title: 'Cross-Border Settlement',
        category: 'rails',
        body:
          'Public blockchains provide cross-border settlement alongside traditional systems. Their open records and issuer, exchange, and sanctions rules mean the rails are visible and subject to changing compliance boundaries.',
        pills: [
          { text: 'jurisdiction-neutral', kind: 'blue' },
          { text: 'minute-scale', kind: '' },
        ],
      },
      {
        id: 'juris-arbitrage',
        symbol: '⊕',
        title: 'Jurisdictional Arbitrage',
        category: 'juris',
        body:
          'UAE ADGM, Switzerland, Singapore, and El Salvador maintain crypto-friendly frameworks. ' +
          'Multi-domicile structuring preserves optionality even as US/EU perimeters tighten.',
        pills: [
          { text: 'multi-domicile', kind: 'blue' },
          { text: 'policy hedge', kind: 'green' },
        ],
      },
      {
        id: 'on-chain-audit',
        symbol: '◈',
        title: 'On-Chain Auditability',
        category: 'custody',
        body:
          'Public ledgers double as forensic surfaces. Independent analysts can corroborate or contest Imperial narratives on flows, exposures, and freezes.',
        pills: [
          { text: 'open-record', kind: 'green' },
          { text: 'dual-use', kind: '' },
        ],
      },
    ],

    /* Polycentric governance nodes — schematic, not geographic. */
    polyNodes: [
      {
        id: 'fed',
        x: 50, y: 50,
        label: 'Federalism',
        body:
          'Subnational authority diffuses compliance burdens across thousands of units. ' +
          'Any single Imperial directive must clear dozens of independent jurisdictions before becoming operative.',
      },
      {
        id: 'jud',
        x: 18, y: 30,
        label: 'Independent Judiciaries',
        body:
          'Courts that retain procedural independence raise the cost of centralized override. ' +
          'Where rule-of-law metrics hold (V-Dem, FH FIW 2026), enforcement asymmetries favor the periphery.',
      },
      {
        id: 'press',
        x: 82, y: 30,
        label: 'Free Press / Civil Society',
        body:
          '88 Free polities (FH 2026) still cluster around independent media and NGO ecosystems. ' +
          'Counter-narrative latency shrinks when reporting capacity is plural and distributed.',
      },
      {
        id: 'plural',
        x: 18, y: 75,
        label: 'Legal Pluralism',
        body:
          'Treaty pluralism, regional courts, and overlapping jurisdictional claims fragment extraterritorial reach. ' +
          'No single tribunal commands universal authority.',
      },
      {
        id: 'legit',
        x: 82, y: 75,
        label: 'Contested Legitimacy',
        body:
          'Coups (Madagascar, Guinea-Bissau) and active theatres expose limits of centralized control. ' +
          'Fragmentation cuts both ways but blocks consolidation in the medium term.',
      },
    ],

    sources: [
      {
        label: 'UKMTO/JMIC · Advisory 110: Hormuz attacks and Red Sea transit conditions (1 Nov 2026)',
        url: 'https://www.ukmto.org/-/media/ukmto/products/jmic_advisory_update_110_01-nov-1.pdf?rev=d2be223caff04f09bbf58d94c9aa8e0a',
      },
      {
        label: 'IEA · Global Gas Security Review 2026: Hormuz LNG vessel crossings',
        url: 'https://www.iea.org/files/42bb838f-d20d-4815-8554-32146033967d/GlobalGasSecurityReview2026.pdf',
      },
      {
        label: 'International Crisis Group · CrisisWatch November 2026 alerts / October deteriorations',
        url: 'https://www.crisisgroup.org/sites/default/files/crisiswatch/crisiswatch-october-2026-global-overview.pdf',
      },
      {
        label: 'ACLED · Gulf infrastructure risk analysis (4 Nov 2026; contingent scenario)',
        url: 'https://acleddata.com/report/threat-infrastructure-war-looms-us-iran-confrontation-enters-critical-phase',
      },
      {
        label: 'ACLED · Myanmar–Thailand spillover analysis (5 Nov 2026; 29 Oct shelling and further-risk assessment)',
        url: 'https://acleddata.com/expert-comment/will-violent-spillover-myanmar-thailand-escalate',
      },
      {
        label: 'SEC · BG Wealth and DSJ Exchange crypto-investment fraud complaint (29 Oct; allegations only)',
        url: 'https://www.sec.gov/enforcement-litigation/litigation-releases/lr-26679',
      },
      {
        label: 'Chainalysis · Sub-Saharan Africa crypto adoption and P2P report (29 Oct; Jul 2025–Jun 2026 data)',
        url: 'https://www.chainalysis.com/blog/sub-saharan-africa-crypto-adoption-2026/',
      },
      {
        label: 'OCC · Final permitted payment stablecoin issuer rule (21 Oct; effective 18 Jan 2027)',
        url: 'https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html',
      },
      {
        label: 'FinCEN · MEXC order under Operation Economic Outcast (6 Nov; agency findings, not a court ruling)',
        url: 'https://www.fincen.gov/news/news-releases/operation-economic-outcast-severs-mexc-globals-access-us-financial-system',
      },
      {
        label: 'FinCEN · Original MEXC order text (6 Nov; subsequently published in the Federal Register on 10 Nov, effective 10 Dec)',
        url: 'https://www.fincen.gov/system/files/2026-11/MEXC-Section-9714.pdf',
      },
      {
        label: 'European Commission · EU Crypto Sanctions Task Force launch (6 Nov 2026)',
        url: 'https://finance.ec.europa.eu/news/statement-commissioner-albuquerque-outcomes-tenth-meeting-high-level-meeting-sanctions-2026-11-06_en',
      },
      {
        label: 'Human Rights Foundation · AI for Individual Rights newsletter 24: Belarus AI-linked cameras and Vietnam plans (30 Oct 2026)',
        url: 'https://hrf.org/latest/hrfs-ai-for-individual-rights-newsletter-24/',
      },
      {
        label: 'Human Rights Foundation · AI-rights newsletter archive (6 Nov 2026; AI misuse reporting, not a new surveillance deployment)',
        url: 'https://hrf.org/latest-category/ai-for-individual-rights/',
      },
      {
        label: 'Voice of Nigeria · INEC AI safeguards and human oversight',
        url: 'https://von.gov.ng/inec-unveils-ai-safeguards-ahead-of-2027-elections/',
      },
      {
        label: 'IEA · Oil Market Report October 2026 (15 Oct)',
        url: 'https://www.iea.org/reports/oil-market-report-october-2026',
      },
      {
        label: 'U.S. EIA · October Short-Term Energy Outlook, updated 21 Oct 2026',
        url: 'https://www.eia.gov/outlooks/steo/report/global_oil.php',
      },
      {
        label: 'ACLED · Saudi Arabia, Somalia, and Syria flashpoints (23 Oct 2026)',
        url: 'https://acleddata.com/global-analysis',
      },
      {
        label: 'SEC · FAQs on conditional innovation exemption for tokenized NMS-stock venues (20 Oct 2026)',
        url: 'https://www.sec.gov/featured-topics/crypto-task-force/cryptosec',
      },
      {
        label: 'U.S. DOJ · Crypto-fraud prosecution (23 Oct 2026; allegations only)',
        url: 'https://www.justice.gov/usao-cdca/pr/chinese-national-extradited-alleged-role-multimillion-dollar-cryptocurrency-scam',
      },
      {
        label: 'Freedom House · Freedom on the Net 2026 (published 22 Oct; coverage Jun 2025–May 2026)',
        url: 'https://freedomhouse.org/article/new-report-authoritarian-internet-controls-drive-16th-consecutive-year-decline-global',
      },
      {
        label: 'IMF · Fiscal Monitor briefing on rising fiscal risks (14 Oct 2026)',
        url: 'https://mediacenter.imf.org/news/imf---fiscal-monitor-report-annual-meetings--2026/s/1b05cec6-cde8-4b75-80ec-2b29f9fb5d19',
      },
      {
        label: 'ACLED · New Tigray caretaker administration and Pretoria agreement (16 Oct 2026)',
        url: 'https://acleddata.com/expert-comment/does-ethiopias-new-caretaker-administration-signal-end-pretoria-peace-agreement',
      },
      {
        label: 'FinCEN · A7 Network alert (1 Oct 2026)',
        url: 'https://www.fincen.gov/system/files/2026-10/FinCEN-Alert-A7-Network.pdf',
      },
      {
        label: 'Chainalysis · 2026 Global Crypto Adoption Index',
        url: 'https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/',
      },
      {
        label: 'CFTC · CTX/CAM advance notice of proposed crypto market-structure rules (5 Oct 2026)',
        url: 'https://www.cftc.gov/PressRoom/PressReleases/9307-26',
      },
      {
        label: 'SEC · Regulation Crypto Assets public comment file (comments posted through 16 Oct 2026)',
        url: 'https://www.sec.gov/rules-regulations/public-comments/s7-2026-27',
      },
      {
        label: 'U.S. DOE · Genesis Mission integrated AI platform (updated 16 Oct 2026)',
        url: 'https://www.energy.gov/undersecretaryforscience/genesis-mission/genesis-mission',
      },
      {
        label: 'Stanford HAI · 2026 AI Index research and development',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development',
      },
      {
        label: 'Freedom House · Freedom on the Net 2026 (Jun 2025–May 2026 reporting period)',
        url: 'https://freedomhouse.org/report/freedom-net/2026/seismic-shifts-global-internet',
      },
      {
        label: 'U.S. EIA · Short-Term Energy Outlook (6 Oct 2026)',
        url: 'https://www.eia.gov/outlooks/steo/',
      },
      {
        label: 'IMF · Annual Meetings curtain-raiser on debt, energy, and AI (7 Oct 2026)',
        url: 'https://www.imf.org/en/news/articles/2026/10/07/sp100726-2026-annual-meetings-curtain-raiser',
      },
      {
        label: 'ACLED · Eritrean forces cross into Tigray (7 Oct 2026)',
        url: 'https://acleddata.com/expert-comment/what-main-reason-eritrean-forces-crossed-border-fight-within-ethiopias-tigray-region',
      },
      {
        label: 'ACLED · Militant spillover in Guinea (8 Oct 2026)',
        url: 'https://acleddata.com/report/militant-spillover-mali-raises-mining-related-security-risks-guinea',
      },
      {
        label: 'Human Rights Watch and partners · Türkiye: End Internet Censorship (12 Oct 2026)',
        url: 'https://www.bignewsnetwork.com/news/279367980/trkiye-end-internet-censorship',
      },
      {
        label: 'FinCEN · Withdrawal of proposed unhosted-wallet and mixing rules (5 Oct 2026)',
        url: 'https://www.fincen.gov/news/news-releases/fincen-announces-withdrawals-proposed-digital-asset-related-rules',
      },
      {
        label: 'ESMA · Supervisory expectations for services involving non-MiCA stablecoins (8 Oct 2026)',
        url: 'https://www.esma.europa.eu/press-news/esma-news/esma-sets-out-supervisory-expectations-services-related-unauthorised',
      },
      {
        label: 'SEC · Adviser and regulated-fund crypto custody proposal (1 Oct 2026)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-100-sec-proposal-would-address-how-investment-advisers-funds-can-custody-crypto-assets-under-federal',
      },
      {
        label: 'CLEAR · VA.gov optional biometric identity pilot (7 Oct 2026)',
        url: 'https://ir.clearme.com/news-events/press-releases/detail/197/u-s-department-of-veterans-affairs-selects-clear-for-new',
      },
      {
        label: 'Anthropic · Detecting and countering misuse of AI: September 2026',
        url: 'https://www.anthropic.com/threat-intelligence-report-september-2026',
      },
      {
        label: 'Reuters/Kpler · Hormuz traffic below 10-day average (18 Sep 2026)',
        url: 'https://www.reuters.com/world/middle-east/shipping-traffic-via-strait-hormuz-stays-below-10-day-average-data-shows-2026-09-18/',
      },
      {
        label: 'IEA · Oil Market Report September 2026',
        url: 'https://www.iea.org/reports/oil-market-report-september-2026',
      },
      {
        label: 'Thailand SEC · Travel Rule for Digital Assets (2 Sep 2026)',
        url: 'https://www.sec.or.th/EN/Pages/News_Detail.aspx?SECID=13277',
      },
      {
        label: 'ACLED · Mozambique Conflict Monitor Update (September 2026)',
        url: 'https://acleddata.com/update/mozambique-conflict-monitor-update-september-2026',
      },
      {
        label: 'Reuters · Hormuz traffic below 10-day average (2 Sep 2026)',
        url: 'https://www.reuters.com/business/energy/shipping-traffic-via-strait-hormuz-stays-below-10-day-average-data-shows-2026-09-02/',
      },
      {
        label: 'Fitch Ratings · Sovereign bond-yield spike (26 Aug 2026)',
        url: 'https://www.fitchratings.com/research/sovereigns/sovereign-bond-yield-spike-highlights-persistent-fiscal-challenges-26-08-2026',
      },
      {
        label: 'Singapore MAS · Stablecoin consultation (1 Sep 2026)',
        url: 'https://www.mas.gov.sg/news/media-releases/2026/mas-consults-on-legislative-amendments-to-implement-stablecoin-regulatory-framework',
      },
      {
        label: 'U.S. Treasury/OFAC · BitBank digital-asset exchange designation (17 Sep 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0632',
      },
      {
        label: 'U.S. Treasury/OFAC · Xinbi Guarantee digital-currency marketplace designation (9 Sep 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0624',
      },
      {
        label: 'ACLED · Blue Nile flashpoint in Sudan (13–14 Sep 2026)',
        url: 'https://acleddata.com/expert-comment/why-has-blue-nile-become-new-flashpoint-sudans-war',
      },
      {
        label: 'UK OfDIA · Digital Identity Sectoral Analysis Report 2026',
        url: 'https://www.gov.uk/government/publications/digital-identity-sectoral-analysis-report-2026/digital-identity-sectoral-analysis-report-2026',
      },
      {
        label: 'IMF · Fiscal Monitor (April 2026)',
        url: 'https://www.imf.org/en/publications/fm/issues/2026/04/15/fiscal-monitor-april-2026',
      },
      {
        label: 'IMF · LIC Debt Sustainability list (31 Mar 2026)',
        url: 'https://www.imf.org/external/pubs/ft/dsa/dsalist.pdf',
      },
      {
        label: 'Freedom House · Freedom in the World 2026',
        url: 'https://freedomhouse.org/report/freedom-world/2026/growing-shadow-autocracy',
      },
      {
        label: 'Freedom House · Freedom on the Net 2025',
        url: 'https://freedomhouse.org/sites/default/files/2025-11/Freedom_on_the_Net_2025_Digital.pdf',
      },
      {
        label: 'Stanford HAI · 2026 AI Index Report',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
      {
        label: 'U.S. Federal Register · Permitted Payment Stablecoin Issuer AML/CFT rule (10 Apr 2026)',
        url: 'https://www.federalregister.gov/documents/2026/04/10/2026-06963/permitted-payment-stablecoin-issuer-anti-money-launderingcountering-the-financing-of-terrorism',
      },
      {
        label: 'U.S. Senate Banking Committee · CLARITY Act advanced 15–9 (14 May 2026)',
        url: 'https://www.banking.senate.gov/newsroom/majority/chairman-scott-senate-banking-committee-advance-clarity-act-in-historic-bipartisan-vote',
      },
      {
        label: 'Tether · $344M USDT frozen in coordination with OFAC (Apr 2026)',
        url: 'https://tether.io/news/tether-supports-freeze-of-more-than-344-million-in-usdt-in-coordination-with-ofac-and-u-s-law-enforcement/',
      },
      {
        label: 'CNBC · Brent posts worst month since 2020 as market counts on a US-Iran deal (29 May 2026)',
        url: 'https://www.cnbc.com/2026/05/29/oil-price-iran-deal-war-ceasefire-trump.html',
      },
      {
        label: 'NPR · ICE buys iris scanners and biometric tools (27 May 2026)',
        url: 'https://www.npr.org/2026/05/27/nx-s1-5822429/ice-buys-iris-scanners-tech-tools',
      },
      {
        label: 'U.S. MARAD · Advisory 2026-006 (Red Sea / Bab el-Mandeb risk, 26 Mar 2026)',
        url: 'https://www.maritime.dot.gov/msci/2026-006',
      },
      {
        label: 'ESMA · Common Supervisory Action on CASP custody resilience (8 Jul 2026)',
        url: 'https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience',
      },
      {
        label: 'U.S. Treasury/OFAC · Hormuz insurance scheme accepts digital assets (29 Jul 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0581',
      },
      {
        label: 'Reuters/Kpler · Hormuz crossings fall to 7, Bab el-Mandeb to 23 (21 Aug 2026)',
        url: 'https://www.reuters.com/world/middle-east/hormuz-ship-crossings-hover-single-digits-data-shows-2026-08-21/',
      },
      {
        label: 'Reuters · Global bond-market stress and multi-year yield highs (18 Aug 2026)',
        url: 'https://www.reuters.com/world/china/selling-grips-bond-markets-us-japan-inflation-fiscal-worries-take-hold-2026-08-18/',
      },
      {
        label: 'ACLED · Houthis ramp activity in Yemen and Saudi Arabia (19 Aug 2026)',
        url: 'https://acleddata.com/report/houthis-ramp-activity-yemen-and-saudi-arabia-avoid-reigniting-civil-war-so-far',
      },
      {
        label: 'Reuters · Authorities restrict data centres amid AI boom (updated 18 Aug 2026)',
        url: 'https://www.reuters.com/legal/litigation/where-authorities-are-restricting-data-centres-amid-ai-boom-2026-08-18/',
      },
      {
        label: 'U.S. Treasury/OFAC · Iran-linked crypto exchange action (7 Aug 2026)',
        url: 'https://home.treasury.gov/news/press-releases/sb0598',
      },
      {
        label: 'EU External Action Service · 21st Russia-sanctions package (24 Jul 2026)',
        url: 'https://www.eeas.europa.eu/delegations/ukraine/21st-package-sanctions-eu-hits-russian-energy-financial-services-and-crypto-hard_en',
      },
      {
        label: 'SEC · Regulation Crypto Assets proposal (18 Aug 2026)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-76-sec-proposes-new-regulation-crypto-assets',
      },
      {
        label: 'PwC · Treasury GENIUS Act stablecoin proposal (21 Aug 2026)',
        url: 'https://www.pwc.com/us/en/industries/financial-services/library/our-take/stablecoin-proposal-fincen-boi-aug-21-2026.html',
      },
      {
        label: 'Amnesty International · Argentina AI-driven surveillance report (August 2026)',
        url: 'https://www.amnesty.org/en/latest/news/2026/08/argentina-unchecked-deployment-of-ai-driven-surveillance-reinforces-a-techno-authoritarian-infrastructure-of-social-control/',
      },
      {
        label: 'OECD · Global Debt Report 2026: sovereign borrowing outlook (4 Mar 2026; structural background)',
        url: 'https://www.oecd.org/en/publications/global-debt-report-2026_e9d80efd-en/full-report/sovereign-borrowing-outlook_4470147b.html',
      },
      {
        label: 'IEA · Oil Market Report November 2026 (13 Nov; export recovery remains incomplete)',
        url: 'https://www.iea.org/reports/oil-market-report-november-2026',
      },
      {
        label: 'Reuters · Hormuz traffic increases alongside ship attacks (11 Nov 2026)',
        url: 'https://www.reuters.com/world/middle-east/hormuz-traffic-is-up-so-are-attacks-2026-11-11/',
      },
      {
        label: 'Reuters · Yemen government withdrawal near Bab el-Mandeb (15 Nov 2026)',
        url: 'https://www.reuters.com/world/middle-east/yemen-government-forces-withdraw-area-near-bab-el-mandeb-strait-houthis-control-2026-11-15/',
      },
      {
        label: 'ACLED · Middle East daily update (13 Nov 2026; attribution caveats)',
        url: 'https://acleddata.com/current-crises/daily-data-strikes-across-middle-east',
      },
      {
        label: 'World Bank · International Debt Report 2026 (5 Nov; $9.4T external debt, $1.4T debt service in 2025; pre-prior-run)',
        url: 'https://www.worldbank.org/en/news/press-release/2026/11/05/developing-countries-external-debt-surges-to-record-9-4-trillion',
      },
      {
        label: 'Federal Register · FinCEN MEXC order (published 10 Nov; effective 10 Dec 2026)',
        url: 'https://www.federalregister.gov/documents/2026/11/10/2026-22962/imposition-of-special-measure-prohibiting-the-transmittal-of-funds-involving-mexc-global',
      },
      {
        label: 'CFTC · Louisiana event-contract jurisdiction lawsuit (13 Nov 2026)',
        url: 'https://www.cftc.gov/PressRoom/PressReleases/9326-26',
      },
      {
        label: 'CFTC · Arkansas prediction-market jurisdiction lawsuit (13 Nov 2026)',
        url: 'https://www.cftc.gov/PressRoom/PressReleases/9325-26',
      },
      {
        label: 'Stanford HAI · AI evaluation in public administration (11 Nov 2026)',
        url: 'https://hai.stanford.edu/policy/a-blueprint-for-evaluating-ai-in-public-administration',
      },
      {
        label: 'Freedom House · Satellite technology and internet shutdown resilience (12 Nov 2026)',
        url: 'https://freedomhouse.org/article/defeating-authoritarian-digital-blackouts-countering-internet-shutdowns-through-satellite',
      },
      {
        label: 'Reuters · Lawsuit over alleged AI facial-recognition-only arrest proceeds (10 Nov 2026; historic arrest)',
        url: 'https://www.reuters.com/legal/government/man-wrongly-jailed-after-ai-mismatch-can-pursue-lawsuit-now-2026-11-10/',
      },
      {
        label: 'U.S. EIA · Middle East oil chokepoint flows rose 19% in Q3; Bab el-Mandeb flows fell (19 Nov 2026)',
        url: 'https://www.eia.gov/todayinenergy/detail.php?id=68485',
      },
      {
        label: 'Reuters · Hormuz flows slip as tanker attacks persist (23 Nov 2026)',
        url: 'https://www.reuters.com/commentary/reuters-open-interest/oils-iran-war-recovery-masks-stubborn-diesel-shortage-2026-11-23/',
      },
      {
        label: 'IMF · U.S. 2026 Article IV consultation (23 Nov 2026; fiscal risks and debt maturity)',
        url: 'https://www.imf.org/-/media/files/publications/cr/2026/english/1usaea2026001.pdf',
      },
      {
        label: 'IMF · Rising sovereign yields raise the fiscal stakes (15 Oct 2026 baseline)',
        url: 'https://blog-pfm.imf.org/en/pfmblog/2026/10/sovereign-yields',
      },
      {
        label: 'S&P Global · Sovereign yield squeeze (19 Nov 2026)',
        url: 'https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/11/picture-this-sovereign-yield-squeeze',
      },
      {
        label: 'Reuters · Ethiopia–Eritrea forces mass near Badme (18 Nov 2026; attributed reporting)',
        url: 'https://www.reuters.com/world/africa/ethiopia-eritrea-amass-forces-along-border-heightening-war-fears-sources-say-2026-11-18/',
      },
      {
        label: 'ACLED · Ethiopia conflict profile: Badme and Tigray updates through 20 Nov 2026',
        url: 'https://acleddata.com/country/conflict-ethiopia',
      },
      {
        label: 'Reuters · Bangladesh political-return standoff (23 Nov 2026)',
        url: 'https://www.reuters.com/world/asia-pacific/bangladesh-vows-arrest-hasina-if-she-returns-india-2026-11-23/',
      },
      {
        label: 'Reuters · Bangladesh shutdown attempt and protest violence (19 Nov 2026)',
        url: 'https://www.reuters.com/world/asia-pacific/parts-bangladesh-shut-down-protests-by-hasinas-party-yunus-home-set-ablaze-2026-11-19/',
      },
      {
        label: 'SEC · Complaint alleges fake crypto platforms stole more than $37M (19 Nov 2026; not adjudicated)',
        url: 'https://www.sec.gov/newsroom/press-releases/2026-115-sec-eight-entities-used-fake-crypto-asset-trading-platforms-steal-more-37-million-us-investors',
      },
      {
        label: 'Reuters · U.S. rule restricts access to advanced AI chips through overseas data centers (16 Nov 2026; compute-control signal)',
        url: 'https://www.reuters.com/legal/litigation/us-issues-rule-protect-advanced-ai-chips-being-accessed-remotely-2026-11-16/',
      },
    ],

    transmissions: [
      'A blockade is a confession of fragility — control that requires constant cost to maintain is not yet hegemony.',
      'Decentralized systems do not need to win every domain. They need to deny the consolidation of all five.',
      'The perimeter is not the territory. Where one rail closes, another routes around.',
      'Polycentric institutions are slow, plural, and contradictory — and that is the feature, not the bug.',
      'Open weights, open ledgers, open courts. Three windows the Empire cannot fully close.',
    ],
  };

  /* ── Header / sidebar ───────────────────────────────────────────────── */
  $('callsignName').textContent = REBEL.meta.callsign;
  $('callsignCell').innerHTML =
    'Cell: ' + esc(REBEL.meta.cell) + '<br>Transmission: ' + esc(REBEL.meta.transmission);
  $('opSector').textContent = REBEL.meta.cell + ' · ' + REBEL.meta.transmission;

  const morale = $('moraleMeter');
  morale.setAttribute('data-value', REBEL.meta.morale);
  $('moraleTier').textContent = 'OF 100 · ' + REBEL.meta.moraleTier;

  $('bars').innerHTML = REBEL.theatreReadiness
    .map(
      ({ label, value }) => `
        <div class="bar">
          <span>${esc(label)}</span>
          <div class="track"><div class="fill" style="width:${value}%"></div></div>
          <span class="small">${value}</span>
        </div>`
    )
    .join('');

  $('directives').innerHTML = REBEL.directives.map((d) => `<li>${esc(d)}</li>`).join('');

  $('rebelKPIs').innerHTML = REBEL.rebelKPIs
    .map(({ label, value, delta, tone }) => {
      const cls = tone === 'up' ? 'up' : 'small';
      return `
        <div class="card">
          <div class="k">${esc(label)}</div>
          <div class="v">${esc(value)}</div>
          <div class="${cls}">${esc(delta)}</div>
        </div>`;
    })
    .join('');

  /* ── Decentralization Resilience cards ─────────────────────────────── */
  function tier(s) {
    if (s >= 60) return { t: 'RESILIENT',   c: '#6fd18b', g: '#6fd18b55' };
    if (s >= 45) return { t: 'HOLDING',     c: '#f3a52a', g: '#f3a52a55' };
    if (s >= 35) return { t: 'PRESSURED',   c: '#d8842b', g: '#d8842b55' };
    return         { t: 'CRITICAL',    c: '#ef3d42', g: '#ef3d4255' };
  }

  $('resilienceGrid').innerHTML = REBEL.resilience
    .map((d) => {
      const t = tier(d.score);
      return `
        <article class="rb-res-card" role="listitem" tabindex="0"
                 aria-label="${esc(d.name)} resilience score ${d.score} of 100, tier ${t.t}"
                 style="--rb-card-accent:${t.c};--rb-card-glow:${t.g};--rb-res-w:${d.score}%">
          <div class="k">
            <span class="rri-label">${esc(d.name)}</span>
            <span class="rb-res-tier">${t.t}</span>
          </div>
          <div class="rb-res-score">${d.score}<span class="rb-res-score-unit"> / 100</span></div>
          <div class="rb-res-bar"><div class="rb-res-bar-fill" style="width:${d.score}%"></div></div>
          <div class="rb-res-imperial">vs Imperial Control · <b>${d.imperial}</b></div>
          <div class="rb-res-tip" role="tooltip">
            <b>${esc(d.name)} · Resilience Mechanisms</b>
            ${esc(d.blurb)}
            <ul>${d.mech.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
          </div>
        </article>`;
    })
    .join('');

  /* ── Radar: Rebel resilience vs Imperial control ───────────────────── */
  (function renderRadar() {
    const svg = $('radarSvg');
    if (!svg) return;
    const cx = 160, cy = 160, R = 120;
    const axes = REBEL.resilience;
    const n = axes.length;

    function pt(value, i) {
      const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
      const r = (value / 100) * R;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }

    let svgParts = [];

    // grid rings (4 levels)
    for (let k = 1; k <= 4; k++) {
      const rr = (R * k) / 4;
      const poly = axes
        .map((_, i) => {
          const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
          return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
        })
        .join(' ');
      svgParts.push(`<polygon class="axis-grid" points="${poly}"/>`);
    }
    // axis lines
    axes.forEach((_, i) => {
      const [x, y] = pt(100, i);
      svgParts.push(`<line class="axis-line" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`);
    });
    // Imperial polygon
    const impPts = axes.map((d, i) => pt(d.imperial, i).join(',')).join(' ');
    svgParts.push(`<polygon class="axis-imperial" points="${impPts}"/>`);
    // Rebel polygon
    const rebPts = axes.map((d, i) => pt(d.score, i).join(',')).join(' ');
    svgParts.push(`<polygon class="axis-rebel" points="${rebPts}"/>`);
    // labels
    axes.forEach((d, i) => {
      const [x, y] = pt(118, i);
      const anchor = Math.abs(x - cx) < 6 ? 'middle' : (x > cx ? 'start' : 'end');
      svgParts.push(`<text x="${x}" y="${y + 4}" text-anchor="${anchor}">${esc(d.name)}</text>`);
    });
    svg.innerHTML = svgParts.join('');
  })();

  /* ── Crypto mechanisms with filter ──────────────────────────────────── */
  function renderMech(filter) {
    const grid = $('cryptoMechGrid');
    grid.innerHTML = REBEL.cryptoMechanisms
      .map((m) => {
        const hidden = filter && filter !== 'all' && m.category !== filter ? ' hidden' : '';
        return `
          <article class="rb-mech${hidden}" tabindex="0" aria-label="${esc(m.title)}">
            <div class="symbol" aria-hidden="true">${esc(m.symbol)}</div>
            <h4>${esc(m.title)}</h4>
            <p>${esc(m.body)}</p>
            <div class="tag-row">
              ${m.pills.map((p) => `<span class="pill ${esc(p.kind)}">${esc(p.text)}</span>`).join('')}
            </div>
          </article>`;
      })
      .join('');
  }
  renderMech('all');

  const filterBar = $('cryptoFilter');
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderMech(btn.dataset.filter);
  });

  /* ── Polycentric governance interactive map ────────────────────────── */
  (function renderPoly() {
    const svg = $('polySvg');
    if (!svg) return;
    const W = 480, H = 320;
    const nodes = REBEL.polyNodes;
    const cx = W / 2, cy = H / 2;
    const positions = nodes.map((n) => ({
      ...n,
      px: (n.x / 100) * W,
      py: (n.y / 100) * H,
    }));

    const links = [];
    positions.forEach((a, i) => {
      positions.forEach((b, j) => {
        if (j > i && a.id !== 'fed' && b.id !== 'fed') return;
        if (a.id === b.id) return;
        if (a.id === 'fed' || b.id === 'fed') {
          links.push([a, b]);
        }
      });
    });

    const linkParts = links
      .map(
        ([a, b], idx) =>
          `<line class="rb-node-link" data-link="${a.id}-${b.id}" x1="${a.px}" y1="${a.py}" x2="${b.px}" y2="${b.py}"/>`
      )
      .join('');

    const nodeParts = positions
      .map(
        (n) => `
          <g class="rb-node" data-id="${esc(n.id)}" tabindex="0" role="button"
             aria-label="${esc(n.label)}">
            <circle class="rb-node-dot" data-node="${esc(n.id)}"
                    cx="${n.px}" cy="${n.py}" r="8"/>
            <text class="rb-node-label" x="${n.px}" y="${n.py - 14}" text-anchor="middle">${esc(n.label)}</text>
          </g>`
      )
      .join('');

    svg.innerHTML = linkParts + nodeParts;

    const dossier = $('polyDossier');
    function selectNode(id) {
      const node = REBEL.polyNodes.find((n) => n.id === id);
      if (!node) return;
      dossier.innerHTML = `<b style="color:var(--rb-amber);letter-spacing:.1em;font:700 11px ui-monospace,monospace;text-transform:uppercase;">${esc(node.label)}</b><br>${esc(node.body)}`;
      svg.querySelectorAll('.rb-node-dot').forEach((d) => d.classList.remove('active'));
      svg.querySelector(`.rb-node-dot[data-node="${id}"]`).classList.add('active');
      svg.querySelectorAll('.rb-node-link').forEach((l) => {
        l.classList.toggle('active', l.dataset.link.includes(id));
      });
    }

    svg.addEventListener('click', (e) => {
      const dot = e.target.closest('.rb-node-dot');
      if (dot) selectNode(dot.dataset.node);
    });
    svg.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const g = e.target.closest('.rb-node');
      if (g) {
        e.preventDefault();
        selectNode(g.dataset.id);
      }
    });

    selectNode('fed');
  })();

  /* ── Sources list ───────────────────────────────────────────────────── */
  const sourcesList = $('sourcesList');
  if (sourcesList) {
    sourcesList.innerHTML = REBEL.sources
      .map(
        (s) =>
          `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`
      )
      .join('');
  }

  /* ── Transmissions ticker (sidebar-quote style) ─────────────────────── */
  let txIdx = 0;
  const txEl = $('transmission');
  if (txEl) {
    txEl.textContent = REBEL.transmissions[0];
    window.cycleTransmission = function () {
      txIdx = (txIdx + 1) % REBEL.transmissions.length;
      txEl.textContent = REBEL.transmissions[txIdx];
    };
  }

  /* ── Nav scroll ─────────────────────────────────────────────────────── */
  window.go = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
})();
