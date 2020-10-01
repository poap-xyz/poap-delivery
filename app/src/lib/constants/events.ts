// Types
import { AirdropEvent } from 'lib/types';

// Events addresses
import yamHeroes from 'lib/events/yam';
import medallaResuscitators from 'lib/events/resuscitators';
import medalla from 'lib/events/medalla';
import proofOfGucci from 'lib/events/proof-of-gucci';
import proofOfGucciDesign from 'lib/events/proof-of-gucci-design-competition';
import muirGlacier from 'lib/events/muir-glacier';
import halfRekt from 'lib/events/half-rekt';

const events: AirdropEvent = {
  resuscitator: {
    key: 'resuscitator',
    image:
      'https://storage.googleapis.com/poapmedia/medalla-testnet-resuscitator-2020-logo-1598019050780.png',
    cardTitle: 'Medalla Resuscitators',
    cardText: `<p>An unexpected bug on the Medalla testnet kept the network at peril. Once again the community participation was required to sort this issue and finalize the network once again.</p><p>Anyone who attested from the 75,000th to the 115,000th block is qualified to claim this POAP.</p>`,
    pageTitle: '🚑️ Medalla Resuscitators',
    pageText: `<p>An unexpected bug on the Medalla testnet kept the network at peril. Once again the community participation was required to sort this issue and finalize the network once again.</p><p>Anyone who attested from the 75,000th to the 115,000th block is qualified to claim this POAP.</p>`,
    contractAddress: process.env.GATSBY_RESUSCITATOR_AIRDROP_CONTRACT || '',
    addresses: medallaResuscitators,
    eventIds: process.env.GATSBY_RESUSCITATOR_EVENT_IDS
      ? process.env.GATSBY_RESUSCITATOR_EVENT_IDS.split(',').map((i) => parseInt(i, 10))
      : [],
    githubLink:
      'https://github.com/poapxyz/poap-delivery/tree/development/events/medalla-resuscitators',
    active: false,
    link: '/medalla-resuscitator',
  },
  yam: {
    key: 'yam-heroes',
    image: 'https://storage.googleapis.com/poapmedia/yam-heros-2020-logo-1597862089982.png',
    cardTitle: 'Yam Heroes',
    cardText: `<p>YAM, an experiment in fair farming, governance and elasticity, took Ethereum by storm and lived thrilling first 24 hours</p><p>Crazy game theoretical dynamics created the cohort of $YAM Heroes, that are now awarded this rare POAP to hold with pride</p>`,
    pageTitle: '🍠 Yam Heroes',
    pageText: `<p><a target="_blank" rel="noopener noreferrer" href="https://yam.finance">YAM</a>, an experiment in fair farming, governance and elasticity, took Ethereum by storm and lived thrilling first 24 hours.</p><p>Crazy game theoretical dynamics created the cohort of $YAM Heroes, that are now awarded this rare POAP to hold with pride.</p>`,
    contractAddress: process.env.GATSBY_YAM_AIRDROP_CONTRACT || '',
    addresses: yamHeroes,
    eventIds: process.env.GATSBY_YAM_EVENT_IDS
      ? process.env.GATSBY_YAM_EVENT_IDS.split(',').map((i) => parseInt(i, 10))
      : [],
    githubLink: 'https://github.com/poapxyz/poap-delivery/tree/development/events/yam-heroes',
    active: false,
    link: '/yam',
  },
  muirGlacier: {
    key: 'muir-glacier',
    image:
      'https://storage.googleapis.com/poapmedia/muir-glacier-ethereum-mainnet-hard-fork-2020-logo-1589843256434.png',
    cardTitle: 'Muir Glacier',
    cardText: `<p>The Ethereum network went through a scheduled upgrade at block number 9,200,000, on Friday, January 3, 2020</p><p>A big thanks to the Ethereum community and to all Ethereum developers across all clients and platforms who came together to provide input, thoughts, and contribution.</p>`,
    pageTitle: '❄️ Muir Glacier',
    pageText: `<p>The Ethereum network went through a scheduled upgrade at block number 9,200,000, on Friday, January 3, 2020</p><p>A big thanks to the Ethereum community and to all Ethereum developers across all clients and platforms who came together to provide input, thoughts, and contribution.</p>`,
    contractAddress: process.env.GATSBY_MUIR_GLACIER_AIRDROP_CONTRACT || '',
    addresses: muirGlacier,
    eventIds: process.env.GATSBY_MUIR_GLACIER_EVENT_IDS
      ? process.env.GATSBY_MUIR_GLACIER_EVENT_IDS.split(',').map((i) => parseInt(i, 10))
      : [],
    githubLink: 'https://github.com/poapxyz/poap-delivery/tree/development/events/muir-glacier',
    active: false,
    link: '/muir-glacier',
  },
  gucci: {
    key: 'gucci',
    image: 'https://storage.googleapis.com/poapmedia/proof-of-gucci-2020-logo-1599058054046.png',
    cardTitle: 'YFI - Proof of Gucci',
    cardText: `<p>Andre Cronje’s feet deserve only the finest most luxurious handcrafted Italian fashion so the community came up with a great proposal. Everyone who participated in the voting are now owners of a POAP NFT representing their participation in this once in a lifetime event. Will these Guccis be worn at the YFI Tokyo party?</p>`,
    pageTitle: '✨ Proof of Gucci',
    pageText: `<p>Andre Cronje’s feet deserve only the finest most luxurious handcrafted Italian fashion so the community came up with a great proposal.</p><p>Everyone who participated in the voting are now owners of a POAP NFT representing their participation in this once in a lifetime event.</p><p> Will these Guccis be worn at the YFI Tokyo party?</p>`,
    contractAddress: process.env.GATSBY_PROOF_OF_GUCCI_AIRDROP_CONTRACT || '',
    addresses: proofOfGucci,
    eventIds: process.env.GATSBY_PROOF_OF_GUCCI_EVENT_IDS
      ? process.env.GATSBY_PROOF_OF_GUCCI_EVENT_IDS.split(',').map((i) => parseInt(i, 10))
      : [],
    githubLink: 'https://github.com/poapxyz/poap-delivery/tree/development/events/proof-of-gucci',
    active: false,
    link: '/proof-of-gucci',
  },
  gucciCompetition: {
    key: 'gucci-competition',
    image:
      'https://storage.googleapis.com/poapmedia/proof-of-gucci-design-competition-2020-logo-1599058118153.png',
    cardTitle: 'YFI - Proof of Gucci Design Competition',
    cardText: `<p>Right after the Proof of Gucci proposal had passed, a design competition was set up to come up with an exclusive POAP design to celebrate the positive outcome.</p><p>YFI token holders who voted for their favorite design are entitled to receive this POAP</p>`,
    pageTitle: '✨ Proof of Gucci - Design Competition',
    pageText: `<p>Right after the Proof of Gucci proposal had passed, a design competition was set up to come up with an exclusive POAP design to celebrate the positive outcome.</p><p>YFI token holders who voted for their favorite design are entitled to receive this POAP</p>`,
    contractAddress: process.env.GATSBY_PROOF_OF_GUCCI_COMPETITION_AIRDROP_CONTRACT || '',
    addresses: proofOfGucciDesign,
    eventIds: process.env.GATSBY_PROOF_OF_GUCCI_COMPETITION_EVENT_IDS
      ? process.env.GATSBY_PROOF_OF_GUCCI_COMPETITION_EVENT_IDS.split(',').map((i) =>
          parseInt(i, 10),
        )
      : [],
    githubLink:
      'https://github.com/poapxyz/poap-delivery/tree/development/events/proof-of-gucci-design-competition',
    active: false,
    link: '/proof-of-gucci-design',
  },
  medalla: {
    key: 'medalla',
    image: 'https://storage.googleapis.com/poapmedia/medalla-validators.png',
    cardTitle: 'Medalla Validator',
    cardText: `<p>To celebrate the launch of the Eth2.0 multiclient testnet Medalla, and to encourage as much community engagement as possible, we have teamed up with our friends at <a target="_blank" rel="noopener noreferrer" href="https://beaconcha.in/">beaconcha.in</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/ethstaker/">r/ethstaker</a> to create and distribute badges for validators</p>`,
    pageTitle: '🎖 Medalla Validators',
    pageText: `<p>To celebrate the launch of the Eth2.0 multiclient testnet Medalla, and to encourage as much community engagement as possible, we have teamed up with our friends at <a target="_blank" rel="noopener noreferrer" href="https://beaconcha.in/">beaconcha.in</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/ethstaker/">r/ethstaker</a> to create and distribute badges for validators</p>`,
    contractAddress: process.env.GATSBY_MEDALLA_AIRDROP_CONTRACT || '',
    addresses: medalla,
    eventIds: process.env.GATSBY_MEDALLA_EVENT_IDS
      ? process.env.GATSBY_MEDALLA_EVENT_IDS.split(',').map((i) => parseInt(i, 10))
      : [],
    githubLink: 'https://github.com/poapxyz/poap-delivery/tree/development/events/medalla',
    active: false,
    link: '/medalla',
  },
  halfRekt: {
    key: 'half-rekt',
    image: 'https://storage.googleapis.com/poapmedia/halfrekt-2020-logo-1601513643094.png',
    cardTitle: 'Half Rekt',
    cardText: `<p>You yoloed hard and somehow you only got #HalfRekt. Get this POAP to have an eternal reminder that you only live once</p>`,
    pageTitle: 'Half Rekt',
    pageTitleImage: 'https://storage.googleapis.com/poapmedia/halfrekt.png',
    pageText: `<p>You yoloed hard and somehow you only got #HalfRekt. Get this POAP to have an eternal reminder that you only live once</p><p>Note: only accounts that got refunded DAI are eligible for this token</p>`,
    contractAddress: process.env.GATSBY_HALFREKT_AIRDROP_CONTRACT || '',
    addresses: halfRekt,
    eventIds: process.env.GATSBY_HALFREKT_EVENT_IDS
      ? process.env.GATSBY_HALFREKT_EVENT_IDS.split(',').map((i) => parseInt(i, 10))
      : [],
    githubLink: 'https://github.com/poapxyz/poap-delivery/tree/development/events/half-rekt',
    active: true,
    link: '/half-rekt',
  },
};

export default events;
