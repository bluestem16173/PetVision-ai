import { JobStyle, PlanId, StyleOption } from "../types/api";



export const STYLE_CATEGORIES: Array<{

  id: JobStyle;

  name: string;

  emoji: string;

  description: string;

}> = [

  {

    id: "pixar",

    name: "Cartoon / Pixar",

    emoji: "🎬",

    description: "Soft 3D-style cartoon look with big expressive eyes.",

  },

  {

    id: "anime",

    name: "Anime Pet",

    emoji: "🌸",

    description: "Bold outlines, dramatic shading, and anime tropes.",

  },

  {

    id: "superhero",

    name: "Superhero Pet",

    emoji: "🦸",

    description: "Turn your pet into a comic-style hero with powers.",

  },

  {

    id: "holiday",

    name: "Holiday",

    emoji: "🎄",

    description: "Seasonal themes for your pet.",

  },

  {

    id: "sports",

    name: "Sports",

    emoji: "🏈",

    description: "Jerseys, colors, and game-day energy.",

  },

  {

    id: "birthday",

    name: "Birthday / Celebration",

    emoji: "🎂",

    description: "Cakes, parties, and wild celebration vibes.",

  },

];



// Helper to mark which options are free vs paid.

// RULE: first 3 per style are free, the rest start at basic/enhanced/pro.

const F: PlanId = "free";

const B: PlanId = "basic";

const E: PlanId = "enhanced";

const P: PlanId = "pro";



export const STYLE_OPTIONS: StyleOption[] = [

  // SUPERHERO – expanded power list

  // FREE TIER

  {

    id: "hero-glow-aura",

    name: "Glow Aura",

    description: "Soft golden outline and hero lighting.",

    style: "superhero",

    minPlan: F,

    promptHint: "soft golden aura around the pet, gentle hero lighting",

  },

  {

    id: "hero-speed-trail",

    name: "Speed Trail",

    description: "Blurred motion streaks behind your pet.",

    style: "superhero",

    minPlan: F,

    promptHint: "motion blur streaks trailing behind the pet as it moves",

  },

  {

    id: "hero-spark-burst",

    name: "Spark Burst",

    description: "Tiny energy sparks near paws and tail.",

    style: "superhero",

    minPlan: F,

    promptHint: "small glowing sparks popping near paws and tail",

  },

  // BASIC TIER

  {

    id: "hero-mini-flight",

    name: "Mini Flight Hop",

    description: "Small levitation effect, just off the ground.",

    style: "superhero",

    minPlan: B,

    promptHint: "subtle levitation just above the ground with gentle shadow",

  },

  {

    id: "hero-shadow-sprint",

    name: "Shadow Sprint",

    description: "Dark motion trail behind your pet.",

    style: "superhero",

    minPlan: B,

    promptHint: "dark shadowy trail stretching behind the pet as it sprints",

  },

  {

    id: "hero-ember-paws",

    name: "Ember Paws",

    description: "Glowing embers under each paw step.",

    style: "superhero",

    minPlan: B,

    promptHint: "small glowing embers under the paws with each step",

  },

  {

    id: "hero-frost-whiskers",

    name: "Frost Whiskers",

    description: "Icy particles around face and whiskers.",

    style: "superhero",

    minPlan: B,

    promptHint: "icy frost particles swirling around whiskers and fur",

  },

  {

    id: "hero-static-charge",

    name: "Static Charge",

    description: "Blue electric pops around your pet.",

    style: "superhero",

    minPlan: B,

    promptHint: "blue static electric sparks dancing around the fur",

  },

  {

    id: "hero-wind-dash",

    name: "Wind Dash",

    description: "Circular wind rings as your pet moves.",

    style: "superhero",

    minPlan: B,

    promptHint: "swirling wind rings following the pet's motion",

  },

  {

    id: "hero-rock-armor",

    name: "Rock Armor Skin",

    description: "Stone-like patches of armor on body.",

    style: "superhero",

    minPlan: B,

    promptHint: "rocky stone textures lightly overlaying the pet's body",

  },

  {

    id: "hero-light-beam-eyes",

    name: "Light Beam Eyes",

    description: "Subtle glowing eyes with light beams.",

    style: "superhero",

    minPlan: B,

    promptHint: "soft glowing eyes with thin light beams",

  },

  {

    id: "hero-bubble-shield",

    name: "Bubble Shield",

    description: "Transparent energy bubble around the pet.",

    style: "superhero",

    minPlan: B,

    promptHint: "transparent energy bubble surrounding the pet",

  },

  {

    id: "hero-stretch-blur",

    name: "Stretch Motion Blur",

    description: "Elongated motion blur like stretchy limbs.",

    style: "superhero",

    minPlan: B,

    promptHint: "elongated motion blur stretched from paws and tail",

  },

  // ENHANCED TIER

  {

    id: "hero-inferno-burst",

    name: "Inferno Burst",

    description: "Flames erupt when your pet moves.",

    style: "superhero",

    minPlan: E,

    promptHint: "fiery flames bursting briefly along the pet's motion path",

  },

  {

    id: "hero-aqua-surge",

    name: "Aqua Surge",

    description: "Water splashes and rings around your pet.",

    style: "superhero",

    minPlan: E,

    promptHint: "water rings and splashes forming around the pet's steps",

  },

  {

    id: "hero-solar-flare",

    name: "Solar Flare Body",

    description: "Golden sunburst glow from your pet.",

    style: "superhero",

    minPlan: E,

    promptHint: "bright golden sunburst glow radiating from the pet's body",

  },

  {

    id: "hero-moonlight-cloak",

    name: "Moonlight Cloak",

    description: "Soft silver cloak of moonlight.",

    style: "superhero",

    minPlan: E,

    promptHint: "soft silver cloak of moonlight draped over the pet",

  },

  {

    id: "hero-sandstorm-swirl",

    name: "Sandstorm Swirl",

    description: "Dusty vortex around your pet's legs.",

    style: "superhero",

    minPlan: E,

    promptHint: "dusty sand vortex swirling around the legs",

  },

  {

    id: "hero-crystal-shards",

    name: "Crystal Shards",

    description: "Floating crystals orbit around your pet.",

    style: "superhero",

    minPlan: E,

    promptHint: "floating translucent crystals orbiting around the pet",

  },

  {

    id: "hero-lightning-strike",

    name: "Lightning Strike Form",

    description: "Small lightning arcs around body.",

    style: "superhero",

    minPlan: E,

    promptHint: "branching lightning arcs dancing around the body",

  },

  {

    id: "hero-mega-flight",

    name: "Mega Flight",

    description: "Stronger levitation with energy trail.",

    style: "superhero",

    minPlan: E,

    promptHint: "pet hovering higher with faint energy trail below",

  },

  {

    id: "hero-phasing-blur",

    name: "Phasing Blur",

    description: "Partially transparent body edges.",

    style: "superhero",

    minPlan: E,

    promptHint: "semi-transparent edges as if partially phasing",

  },

  {

    id: "hero-teleport-trail",

    name: "Teleport Trail",

    description: "Particles dispersing and reforming.",

    style: "superhero",

    minPlan: E,

    promptHint: "cloud of particles breaking apart then reforming the pet",

  },

  {

    id: "hero-iron-hide",

    name: "Iron Hide",

    description: "Metallic skin texture overlay.",

    style: "superhero",

    minPlan: E,

    promptHint: "shiny metallic armor texture overlaying the pet's fur",

  },

  {

    id: "hero-thorn-armor",

    name: "Thorn Armor",

    description: "Vines and thorns wrapping gently.",

    style: "superhero",

    minPlan: E,

    promptHint: "green vines and thorns wrapping loosely around the body",

  },

  {

    id: "hero-water-orb-shield",

    name: "Water Orb Shield",

    description: "Swirling water sphere shield.",

    style: "superhero",

    minPlan: E,

    promptHint: "swirling orb of water rotating around the pet",

  },

  {

    id: "hero-shadow-clone",

    name: "Shadow Clone",

    description: "Faint duplicates behind your pet.",

    style: "superhero",

    minPlan: E,

    promptHint: "faint duplicate silhouettes trailing behind the pet",

  },

  {

    id: "hero-echo-step",

    name: "Echo Step",

    description: "Ghostly afterimages of each step.",

    style: "superhero",

    minPlan: E,

    promptHint: "ghostly afterimage lingering at each step position",

  },

  {

    id: "hero-gravity-pulse",

    name: "Gravity Pulse",

    description: "Distortion waves on impact.",

    style: "superhero",

    minPlan: E,

    promptHint: "subtle space distortion ripple on each landing",

  },

  {

    id: "hero-arcane-runes",

    name: "Arcane Runes",

    description: "Glowing magic symbols around your pet.",

    style: "superhero",

    minPlan: E,

    promptHint: "glowing mystic runes orbiting around the pet",

  },

  {

    id: "hero-frost-nova",

    name: "Frost Nova Step",

    description: "Icy explosion when paws hit ground.",

    style: "superhero",

    minPlan: E,

    promptHint: "small icy shockwave from the ground on each step",

  },

  {

    id: "hero-meteor-spark",

    name: "Meteor Spark",

    description: "Tiny fireballs falling around.",

    style: "superhero",

    minPlan: E,

    promptHint: "small fiery meteors streaking past in the background",

  },

  {

    id: "hero-gale-wings",

    name: "Gale Wings",

    description: "Wings made from wind and clouds.",

    style: "superhero",

    minPlan: E,

    promptHint: "semi-transparent wings made of swirling wind and clouds",

  },

  // PRO TIER

  {

    id: "hero-quantum-phase",

    name: "Quantum Phase Shift",

    description: "Glitchy distortion around your pet.",

    style: "superhero",

    minPlan: P,

    promptHint: "digital glitch distortion and shimmering edges around the pet",

  },

  {

    id: "hero-temporal-dash",

    name: "Temporal Dash",

    description: "Time-sliced echo frames.",

    style: "superhero",

    minPlan: P,

    promptHint: "time-slice echo frames of the pet in different positions",

  },

  {

    id: "hero-cyber-neon",

    name: "Cyber Neon Mode",

    description: "Neon circuitry patterns on fur.",

    style: "superhero",

    minPlan: P,

    promptHint: "neon circuitry patterns glowing across the pet's body",

  },

  {

    id: "hero-volcanic-core",

    name: "Volcanic Core",

    description: "Molten cracks with heat haze.",

    style: "superhero",

    minPlan: P,

    promptHint: "molten lava cracks glowing in the fur with heat shimmer",

  },

  {

    id: "hero-storm-fury",

    name: "Storm Fury",

    description: "Dark clouds and lightning around.",

    style: "superhero",

    minPlan: P,

    promptHint: "dark storm clouds swirling with random lightning strikes",

  },

  {

    id: "hero-celestial-halo",

    name: "Celestial Halo Form",

    description: "Floating halo and divine light.",

    style: "superhero",

    minPlan: P,

    promptHint: "soft divine light and a floating halo above the pet",

  },

  {

    id: "hero-abyss-armor",

    name: "Abyss Shadow Armor",

    description: "Void-black armor with purple flame.",

    style: "superhero",

    minPlan: P,

    promptHint: "void-black armor plates with subtle purple flames",

  },

  {

    id: "hero-photon-wings",

    name: "Photon Wings",

    description: "Prismatic light wings.",

    style: "superhero",

    minPlan: P,

    promptHint: "prismatic rainbow wings made of pure light",

  },

  {

    id: "hero-cosmic-rift",

    name: "Cosmic Rift Spark",

    description: "Starscape particles and rift.",

    style: "superhero",

    minPlan: P,

    promptHint: "starfield particles and a small cosmic rift behind the pet",

  },

  {

    id: "hero-plasma-veins",

    name: "Plasma Veins",

    description: "Glowing energy lines under fur.",

    style: "superhero",

    minPlan: P,

    promptHint: "bright glowing plasma veins under the fur",

  },



  // ANIME – character archetypes and spirit themes

  // FREE TIER - Character Archetypes

  {

    id: "anime-sweetheart",

    name: "Sweetheart",

    description: "Loving and affectionate character (deredere type).",

    style: "anime",

    minPlan: F,

    promptHint:

      "anime style, sweet loving pet character with heart eyes, warm expression, pink and soft colors, deredere archetype",

  },

  {

    id: "anime-tsun-tsun",

    name: "Tsun-Tsun",

    description: "Proud character hiding true feelings (tsundere type).",

    style: "anime",

    minPlan: F,

    promptHint:

      "anime style, proud tsundere pet character with blushing expression, crossed arms pose, red accents, tsundere archetype",

  },

  {

    id: "anime-money-lover",

    name: "Money Lover",

    description: "Materialistic character obsessed with wealth (kanedere type).",

    style: "anime",

    minPlan: F,

    promptHint:

      "anime style, materialistic kanedere pet character with elegant expression, gold accents, luxurious setting, kanedere archetype",

  },

  // BASIC TIER - More Archetypes & Animal Spirits

  {

    id: "anime-yandere",

    name: "Yandere",

    description: "Obsessively loving character with dark side.",

    style: "anime",

    minPlan: B,

    promptHint:

      "anime style, yandere pet character with sweet but intense expression, dual personality vibe, dramatic lighting",

  },

  {

    id: "anime-kuudere",

    name: "Kuudere",

    description: "Cool and aloof character with hidden warmth.",

    style: "anime",

    minPlan: B,

    promptHint:

      "anime style, cool kuudere pet character with stoic expression, blue tones, mysterious aura, kuudere archetype",

  },

  {

    id: "anime-dandere",

    name: "Dandere",

    description: "Shy quiet character who opens up over time.",

    style: "anime",

    minPlan: B,

    promptHint:

      "anime style, shy dandere pet character with timid expression, soft pastel colors, gentle anime style",

  },

  {

    id: "anime-animal-spirit",

    name: "Animal Spirit",

    description: "Pet as a mystical animal spirit guardian.",

    style: "anime",

    minPlan: B,

    promptHint:

      "anime style, mystical animal spirit pet character with ethereal glow, nature setting, spiritual energy, guardian spirit",

  },

  {

    id: "anime-fox-spirit",

    name: "Fox Spirit",

    description: "Kitsune-inspired magical fox spirit character.",

    style: "anime",

    minPlan: B,

    promptHint:

      "anime style, kitsune fox spirit pet character with multiple tails, magical aura, traditional Japanese setting",

  },

  // ENHANCED TIER - Monster Spirits & Advanced Archetypes

  {

    id: "anime-monster-spirit",

    name: "Monster Spirit",

    description: "Powerful monster spirit with dark energy.",

    style: "anime",

    minPlan: E,

    promptHint:

      "anime style, powerful monster spirit pet character with dark energy, intimidating presence, supernatural setting",

  },

  {

    id: "anime-dragon-spirit",

    name: "Dragon Spirit",

    description: "Majestic dragon spirit with ancient power.",

    style: "anime",

    minPlan: E,

    promptHint:

      "anime style, majestic dragon spirit pet character with scales and wings, ancient power aura, fantasy setting",

  },

  {

    id: "anime-himedere",

    name: "Himedere",

    description: "Princess-like character expecting royal treatment.",

    style: "anime",

    minPlan: E,

    promptHint:

      "anime style, princess himedere pet character with elegant pose, royal expression, luxurious setting, himedere archetype",

  },

  {

    id: "anime-bodere",

    name: "Bodere",

    description: "Violent aggressive character with explosive temper.",

    style: "anime",

    minPlan: E,

    promptHint:

      "anime style, aggressive bodere pet character with angry expression, explosive energy, dynamic action pose",

  },

  {

    id: "anime-kamidere",

    name: "Kamidere",

    description: "God-like character with divine authority.",

    style: "anime",

    minPlan: E,

    promptHint:

      "anime style, divine kamidere pet character with god-like presence, celestial setting, authoritative expression",

  },

  // PRO TIER - Premium Spirits & Unique Archetypes

  {

    id: "anime-celestial-spirit",

    name: "Celestial Spirit",

    description: "Heavenly spirit with cosmic power.",

    style: "anime",

    minPlan: P,

    promptHint:

      "anime style, celestial spirit pet character with starry aura, cosmic energy, heavenly setting, divine presence",

  },

  {

    id: "anime-shadow-spirit",

    name: "Shadow Spirit",

    description: "Dark shadow spirit from the underworld.",

    style: "anime",

    minPlan: P,

    promptHint:

      "anime style, shadow spirit pet character with dark energy, shadowy form, underworld setting, mysterious power",

  },

  {

    id: "anime-elemental-spirit",

    name: "Elemental Spirit",

    description: "Nature elemental spirit controlling elements.",

    style: "anime",

    minPlan: P,

    promptHint:

      "anime style, elemental spirit pet character with fire/water/earth/air powers, nature setting, elemental energy",

  },



  // CARTOON / PIXAR – character archetypes

  // FREE TIER

  {

    id: "pixar-hero",

    name: "Hero",

    description: "Brave protagonist on an adventure journey.",

    style: "pixar",

    minPlan: F,

    promptHint:

      "3D Pixar cartoon style, heroic pet character, brave and determined expression, adventure setting",

  },

  {

    id: "pixar-everyman",

    name: "Everyman",

    description: "Relatable ordinary character finding their way.",

    style: "pixar",

    minPlan: F,

    promptHint:

      "3D Pixar cartoon style, relatable everyday pet character, warm friendly expression, cozy setting",

  },

  {

    id: "pixar-lover",

    name: "Lover",

    description: "Romantic character with heartwarming charm.",

    style: "pixar",

    minPlan: F,

    promptHint:

      "3D Pixar cartoon style, romantic pet character, loving expression, soft romantic lighting",

  },

  // BASIC TIER

  {

    id: "pixar-mentor",

    name: "Mentor",

    description: "Wise guide character offering wisdom.",

    style: "pixar",

    minPlan: B,

    promptHint:

      "3D Pixar cartoon style, wise mentor pet character, thoughtful expression, mystical or library setting",

  },

  {

    id: "pixar-guardian",

    name: "Guardian",

    description: "Protective character watching over others.",

    style: "pixar",

    minPlan: B,

    promptHint:

      "3D Pixar cartoon style, protective guardian pet character, watchful expression, protective stance",

  },

  {

    id: "pixar-trickster",

    name: "Trickster",

    description: "Playful mischievous character with humor.",

    style: "pixar",

    minPlan: B,

    promptHint:

      "3D Pixar cartoon style, playful trickster pet character, mischievous grin, fun chaotic setting",

  },

  {

    id: "pixar-damsel",

    name: "Damsel",

    description: "Elegant character in need or distress.",

    style: "pixar",

    minPlan: B,

    promptHint:

      "3D Pixar cartoon style, elegant damsel pet character, graceful expression, dramatic setting",

  },

  {

    id: "pixar-herald",

    name: "Herald",

    description: "Messenger character announcing important news.",

    style: "pixar",

    minPlan: B,

    promptHint:

      "3D Pixar cartoon style, messenger herald pet character, announcing expression, important setting",

  },

  // ENHANCED TIER

  {

    id: "pixar-villain",

    name: "Villain",

    description: "Antagonist character with dark intentions.",

    style: "pixar",

    minPlan: E,

    promptHint:

      "3D Pixar cartoon style, villainous pet character, menacing but cartoonish expression, dark dramatic setting",

  },

  {

    id: "pixar-shadow",

    name: "Shadow",

    description: "Dark reflection or inner conflict character.",

    style: "pixar",

    minPlan: E,

    promptHint:

      "3D Pixar cartoon style, shadow pet character, mysterious dark expression, shadowy dramatic setting",

  },

  {

    id: "pixar-rebel",

    name: "Rebel",

    description: "Non-conformist character breaking the rules.",

    style: "pixar",

    minPlan: E,

    promptHint:

      "3D Pixar cartoon style, rebellious pet character, defiant expression, edgy urban setting",

  },

  {

    id: "pixar-outlaw",

    name: "Outlaw",

    description: "Rogue character living outside the law.",

    style: "pixar",

    minPlan: E,

    promptHint:

      "3D Pixar cartoon style, outlaw pet character, roguish expression, wild west or outlaw setting",

  },

  {

    id: "pixar-mother-figure",

    name: "Mother Figure",

    description: "Nurturing maternal character providing care.",

    style: "pixar",

    minPlan: E,

    promptHint:

      "3D Pixar cartoon style, nurturing mother figure pet character, warm caring expression, homey setting",

  },

  {

    id: "pixar-scapegoat",

    name: "Scapegoat",

    description: "Character taking blame or sacrifice.",

    style: "pixar",

    minPlan: E,

    promptHint:

      "3D Pixar cartoon style, scapegoat pet character, vulnerable expression, dramatic emotional setting",

  },

  // PRO TIER

  {

    id: "pixar-genie",

    name: "Genie",

    description: "Magical wish-granting character with powers.",

    style: "pixar",

    minPlan: P,

    promptHint:

      "3D Pixar cartoon style, magical genie pet character, mystical expression, magical lamp and sparkles",

  },

  {

    id: "pixar-ruler",

    name: "Ruler",

    description: "Royal authority character with regal presence.",

    style: "pixar",

    minPlan: P,

    promptHint:

      "3D Pixar cartoon style, regal ruler pet character, majestic expression, royal palace setting",

  },



  // HOLIDAY – specific holiday themes with costumes

  // FREE TIER - Christmas & Halloween

  {

    id: "holiday-christmas-elf",

    name: "Christmas Elf",

    description: "Pet dressed as a festive elf with pointy hat.",

    style: "holiday",

    minPlan: F,

    promptHint:

      "pet dressed as a Christmas elf with green and red outfit, pointy elf hat, festive workshop background",

  },

  {

    id: "holiday-christmas-santa",

    name: "Santa Claus",

    description: "Pet dressed as Santa with red suit and white beard.",

    style: "holiday",

    minPlan: F,

    promptHint:

      "pet dressed as Santa Claus with red suit, white beard, Santa hat, Christmas background with presents",

  },

  {

    id: "holiday-christmas-snowman",

    name: "Abominable Snowman",

    description: "Pet dressed as a friendly snowman.",

    style: "holiday",

    minPlan: F,

    promptHint:

      "pet dressed as a snowman with carrot nose, scarf, top hat, snowy winter background",

  },

  {

    id: "holiday-christmas-rudolph",

    name: "Rudolph the Reindeer",

    description: "Pet dressed as Rudolph with red nose and antlers.",

    style: "holiday",

    minPlan: F,

    promptHint:

      "pet dressed as Rudolph the reindeer with red glowing nose, antlers, harness, snowy night sky background",

  },

  {

    id: "holiday-halloween-witch",

    name: "Witch",

    description: "Pet dressed as a witch with pointy hat and broom.",

    style: "holiday",

    minPlan: F,

    promptHint:

      "pet dressed as a witch with black pointy hat, cape, holding a broomstick, spooky Halloween night background",

  },

  {

    id: "holiday-halloween-ghost",

    name: "Ghost",

    description: "Pet dressed as a friendly ghost with sheet.",

    style: "holiday",

    minPlan: F,

    promptHint:

      "pet dressed as a ghost with white sheet, spooky but friendly, Halloween background with pumpkins",

  },

  // BASIC TIER - More Halloween & Easter

  {

    id: "holiday-halloween-vampire",

    name: "Vampire",

    description: "Pet dressed as a vampire with cape and fangs.",

    style: "holiday",

    minPlan: B,

    promptHint:

      "pet dressed as a vampire with black cape, fangs, spooky castle background, Halloween atmosphere",

  },

  {

    id: "holiday-halloween-pumpkin",

    name: "Pumpkin Costume",

    description: "Pet dressed as a jack-o-lantern pumpkin.",

    style: "holiday",

    minPlan: B,

    promptHint:

      "pet dressed as a jack-o-lantern pumpkin costume with glowing eyes, Halloween night background",

  },

  {

    id: "holiday-easter-bunny",

    name: "Easter Bunny",

    description: "Pet dressed as the Easter Bunny with ears and basket.",

    style: "holiday",

    minPlan: B,

    promptHint:

      "pet dressed as Easter Bunny with bunny ears, holding Easter basket with eggs, spring garden background",

  },

  {

    id: "holiday-easter-eggs",

    name: "Easter Egg Hunt",

    description: "Pet hunting for colorful Easter eggs.",

    style: "holiday",

    minPlan: B,

    promptHint:

      "pet in spring setting hunting for colorful Easter eggs, pastel colors, garden background",

  },

  // ENHANCED TIER - 4th of July & More

  {

    id: "holiday-4th-july-usa",

    name: "4th of July USA",

    description: "Pet wearing USA shirt with patriotic theme.",

    style: "holiday",

    minPlan: E,

    promptHint:

      "pet wearing USA flag shirt, patriotic red white and blue theme, fireworks in background, 4th of July celebration",

  },

  {

    id: "holiday-thanksgiving-turkey",

    name: "Thanksgiving Turkey",

    description: "Pet dressed as a Thanksgiving turkey.",

    style: "holiday",

    minPlan: E,

    promptHint:

      "pet dressed as a Thanksgiving turkey with feathers, autumn harvest background, festive Thanksgiving setting",

  },

  {

    id: "holiday-valentines-cupid",

    name: "Valentine's Cupid",

    description: "Pet dressed as Cupid with bow and arrow.",

    style: "holiday",

    minPlan: E,

    promptHint:

      "pet dressed as Cupid with wings, bow and arrow, hearts floating around, romantic Valentine's Day background",

  },

  {

    id: "holiday-st-patricks-leprechaun",

    name: "St. Patrick's Leprechaun",

    description: "Pet dressed as a leprechaun with green outfit.",

    style: "holiday",

    minPlan: E,

    promptHint:

      "pet dressed as a leprechaun with green outfit, top hat, shamrocks, Irish countryside background",

  },

  // PRO TIER - Premium Holiday Themes

  {

    id: "holiday-new-year-party",

    name: "New Year's Party",

    description: "Pet celebrating New Year with party hat and confetti.",

    style: "holiday",

    minPlan: P,

    promptHint:

      "pet wearing party hat celebrating New Year, confetti falling, champagne, festive party background",

  },

  {

    id: "holiday-christmas-north-pole",

    name: "North Pole Workshop",

    description: "Pet at Santa's workshop with elves and toys.",

    style: "holiday",

    minPlan: P,

    promptHint:

      "pet at Santa's North Pole workshop surrounded by toys, elves, magical Christmas workshop setting",

  },

  {

    id: "holiday-halloween-haunted",

    name: "Haunted Mansion",

    description: "Pet in a spooky haunted mansion setting.",

    style: "holiday",

    minPlan: P,

    promptHint:

      "pet in haunted mansion setting with cobwebs, ghosts, spooky atmosphere, dramatic Halloween scene",

  },



  // SPORTS – specific sports with action-oriented themes

  // FREE TIER

  {

    id: "sports-soccer-kick",

    name: "Soccer Star",

    description: "Pet kicking a soccer ball with dynamic motion.",

    style: "sports",

    minPlan: F,

    promptHint:

      "pet in soccer jersey kicking a soccer ball with dynamic kicking motion, grass field background, action shot",

  },

  {

    id: "sports-baseball-swing",

    name: "Baseball Batter",

    description: "Pet swinging a bat, hitting a baseball.",

    style: "sports",

    minPlan: F,

    promptHint:

      "pet in baseball uniform swinging a bat, hitting a baseball, baseball diamond background, action swing motion",

  },

  {

    id: "sports-basketball-dunk",

    name: "Basketball Dunk",

    description: "Pet dunking a basketball with jumping motion.",

    style: "sports",

    minPlan: F,

    promptHint:

      "pet in basketball jersey jumping and dunking a basketball, basketball court background, dynamic jumping motion",

  },

  // BASIC TIER

  {

    id: "sports-tennis-serve",

    name: "Tennis Ace",

    description: "Pet serving a tennis ball with racket.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in tennis outfit holding a tennis racket, serving a tennis ball, tennis court background, serving motion",

  },

  {

    id: "sports-football-throw",

    name: "Football Quarterback",

    description: "Pet throwing a football in quarterback pose.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in football jersey throwing a football, football field background, quarterback throwing motion",

  },

  {

    id: "sports-volleyball-spike",

    name: "Volleyball Spike",

    description: "Pet spiking a volleyball with jumping action.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in volleyball uniform jumping and spiking a volleyball, volleyball court background, spiking motion",

  },

  {

    id: "sports-golf-swing",

    name: "Golf Pro",

    description: "Pet swinging a golf club, hitting a golf ball.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in golf attire swinging a golf club, hitting a golf ball, golf course background, swinging motion",

  },

  {

    id: "sports-racing-driver",

    name: "Race Car Driver",

    description: "Pet driving a race car with helmet and racing suit.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in racing driver suit with helmet, driving a race car, race track background, high-speed racing action",

  },

  // ENHANCED TIER

  {

    id: "sports-hockey-slapshot",

    name: "Hockey Slapshot",

    description: "Pet taking a slapshot with hockey stick.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in hockey jersey taking a slapshot with hockey stick, ice rink background, powerful slapshot motion",

  },

  {

    id: "sports-baseball-pitch",

    name: "Baseball Pitcher",

    description: "Pet pitching a baseball with windup motion.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in baseball uniform in pitching stance, throwing a baseball, baseball mound background, pitching windup motion",

  },

  {

    id: "sports-swimming-dive",

    name: "Swimming Champion",

    description: "Pet diving into water with swimming motion.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet diving into swimming pool, swimming motion, pool background, competitive swimming action",

  },

  {

    id: "sports-skateboard-trick",

    name: "Skateboard Trick",

    description: "Pet performing a skateboard trick.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet on a skateboard performing a trick, skatepark background, dynamic skateboarding motion",

  },

  {

    id: "sports-formula-one",

    name: "Formula One Racer",

    description: "Pet in F1 car with Formula One racing gear.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in Formula One racing suit and helmet, in F1 race car, Formula One track background, high-speed F1 racing",

  },

  {

    id: "sports-nascar-driver",

    name: "NASCAR Driver",

    description: "Pet driving a NASCAR stock car on oval track.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in NASCAR driver suit, driving NASCAR stock car, oval race track background, NASCAR racing action",

  },

  {

    id: "sports-surfing",

    name: "Surfing",

    description: "Pet surfing on a wave with surfboard.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet on a surfboard riding a wave, beach and ocean background, surfing action, beach sport",

  },

  {

    id: "sports-snow-skiing",

    name: "Snow Skiing",

    description: "Pet skiing down a snowy mountain slope.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet on skis skiing down snowy mountain slope, winter mountain background, skiing action",

  },

  {

    id: "sports-weightlifting",

    name: "Weightlifting",

    description: "Pet lifting weights in a gym setting.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet lifting weights, gym background, weightlifting action, fitness setting",

  },

  // PRO TIER

  {

    id: "sports-championship-celebration",

    name: "Championship Celebration",

    description: "Pet celebrating with trophy and confetti.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet celebrating with trophy, confetti falling, stadium background, championship celebration scene",

  },

  {

    id: "sports-olympic-moment",

    name: "Olympic Moment",

    description: "Pet in Olympic setting with medal ceremony vibe.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in Olympic setting, medal ceremony atmosphere, Olympic stadium background, triumphant moment",

  },

  {

    id: "sports-rally-racing",

    name: "Rally Racing",

    description: "Pet in rally car racing through dirt and mud.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in rally racing gear, driving rally car through dirt and mud, rally course background, extreme rally racing action",

  },

  {

    id: "sports-drag-racing",

    name: "Drag Racing",

    description: "Pet in dragster at the starting line ready to race.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in drag racing suit, in dragster at starting line, drag strip background, high-speed drag racing moment",

  },



  // SPORTS – specific sports with action-oriented themes

  // FREE TIER

  {

    id: "sports-soccer-kick",

    name: "Soccer Star",

    description: "Pet kicking a soccer ball with dynamic motion.",

    style: "sports",

    minPlan: F,

    promptHint:

      "pet in soccer jersey kicking a soccer ball with dynamic kicking motion, grass field background, action shot",

  },

  {

    id: "sports-baseball-swing",

    name: "Baseball Batter",

    description: "Pet swinging a bat, hitting a baseball.",

    style: "sports",

    minPlan: F,

    promptHint:

      "pet in baseball uniform swinging a bat, hitting a baseball, baseball diamond background, action swing motion",

  },

  {

    id: "sports-basketball-dunk",

    name: "Basketball Dunk",

    description: "Pet dunking a basketball with jumping motion.",

    style: "sports",

    minPlan: F,

    promptHint:

      "pet in basketball jersey jumping and dunking a basketball, basketball court background, dynamic jumping motion",

  },

  // BASIC TIER

  {

    id: "sports-tennis-serve",

    name: "Tennis Ace",

    description: "Pet serving a tennis ball with racket.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in tennis outfit holding a tennis racket, serving a tennis ball, tennis court background, serving motion",

  },

  {

    id: "sports-football-throw",

    name: "Football Quarterback",

    description: "Pet throwing a football in quarterback pose.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in football jersey throwing a football, football field background, quarterback throwing motion",

  },

  {

    id: "sports-volleyball-spike",

    name: "Volleyball Spike",

    description: "Pet spiking a volleyball with jumping action.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in volleyball uniform jumping and spiking a volleyball, volleyball court background, spiking motion",

  },

  {

    id: "sports-golf-swing",

    name: "Golf Pro",

    description: "Pet swinging a golf club, hitting a golf ball.",

    style: "sports",

    minPlan: B,

    promptHint:

      "pet in golf attire swinging a golf club, hitting a golf ball, golf course background, swinging motion",

  },

  // ENHANCED TIER

  {

    id: "sports-hockey-slapshot",

    name: "Hockey Slapshot",

    description: "Pet taking a slapshot with hockey stick.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in hockey jersey taking a slapshot with hockey stick, ice rink background, powerful slapshot motion",

  },

  {

    id: "sports-baseball-pitch",

    name: "Baseball Pitcher",

    description: "Pet pitching a baseball with windup motion.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in baseball uniform in pitching stance, throwing a baseball, baseball mound background, pitching windup motion",

  },

  {

    id: "sports-swimming-dive",

    name: "Swimming Champion",

    description: "Pet diving into water with swimming motion.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet diving into swimming pool, swimming motion, pool background, competitive swimming action",

  },

  {

    id: "sports-skateboard-trick",

    name: "Skateboard Trick",

    description: "Pet performing a skateboard trick.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet on a skateboard performing a trick, skatepark background, dynamic skateboarding motion",

  },

  {

    id: "sports-formula-one",

    name: "Formula One Racer",

    description: "Pet in F1 car with Formula One racing gear.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in Formula One racing suit and helmet, in F1 race car, Formula One track background, high-speed F1 racing",

  },

  {

    id: "sports-nascar-driver",

    name: "NASCAR Driver",

    description: "Pet driving a NASCAR stock car on oval track.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in NASCAR driver suit, driving NASCAR stock car, oval race track background, NASCAR racing action",

  },

  {

    id: "sports-motorcycle-racing",

    name: "Motorcycle Racer",

    description: "Pet riding a racing motorcycle on track.",

    style: "sports",

    minPlan: E,

    promptHint:

      "pet in motorcycle racing gear with helmet, riding racing motorcycle, race track background, high-speed motorcycle racing",

  },

  // PRO TIER

  {

    id: "sports-championship-celebration",

    name: "Championship Celebration",

    description: "Pet celebrating with trophy and confetti.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet celebrating with trophy, confetti falling, stadium background, championship celebration scene",

  },

  {

    id: "sports-olympic-moment",

    name: "Olympic Moment",

    description: "Pet in Olympic setting with medal ceremony vibe.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in Olympic setting, medal ceremony atmosphere, Olympic stadium background, triumphant moment",

  },

  {

    id: "sports-rally-racing",

    name: "Rally Racing",

    description: "Pet in rally car racing through dirt and mud.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in rally racing gear, driving rally car through dirt and mud, rally course background, extreme rally racing action",

  },

  {

    id: "sports-drag-racing",

    name: "Drag Racing",

    description: "Pet in dragster at the starting line ready to race.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in drag racing suit, in dragster at starting line, drag strip background, high-speed drag racing moment",

  },

  {

    id: "sports-drift-racing",

    name: "Drift Racing",

    description: "Pet drifting a sports car around corners.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in racing gear, drifting sports car around corners, race track background, dramatic drift racing action",

  },

  {

    id: "sports-indycar-racing",

    name: "IndyCar Racing",

    description: "Pet in IndyCar racing at high speeds.",

    style: "sports",

    minPlan: P,

    promptHint:

      "pet in IndyCar racing suit, in IndyCar race car, IndyCar track background, high-speed open-wheel racing",

  },



  // BIRTHDAY / CELEBRATION – cake & wild themes

  {

    id: "birthday-cute-cake",

    name: "Birthday Cake Party",

    description: "Classic cake, balloons, confetti.",

    style: "birthday",

    minPlan: F,

    promptHint:

      "cute birthday cake on table, balloons, confetti, fun party scene around the pet",

  },

  {

    id: "birthday-wedding-cake",

    name: "Wedding Cake Tier",

    description: "Tall tiered cake, elegant vibe.",

    style: "birthday",

    minPlan: F,

    promptHint:

      "tall white tiered wedding cake, elegant decorations, soft romantic lighting",

  },

  {

    id: "birthday-runaway-duo",

    name: "Runaway Duo",

    description: "Thelma-and-Louise style road adventure vibe.",

    style: "birthday",

    minPlan: F,

    promptHint:

      "retro convertible car on a desert road, sunset, adventurous cinematic vibe",

  },

  {

    id: "birthday-nightclub",

    name: "Nightclub Celebration",

    description: "Neon lights and dance floor.",

    style: "birthday",

    minPlan: B,

    promptHint:

      "neon nightclub scene, dance floor lights, confetti and fun crowd silhouettes",

  },

  {

    id: "birthday-royal-banquet",

    name: "Royal Banquet",

    description: "Long table feast and candles.",

    style: "birthday",

    minPlan: E,

    promptHint:

      "long banquet table with feast, candles, and royal celebration atmosphere",

  },

  {

    id: "birthday-dream-wedding",

    name: "Dream Wedding",

    description: "Flower arch and aisle.",

    style: "birthday",

    minPlan: P,

    promptHint:

      "flower arch, outdoor aisle, dreamy wedding scene around the pet",

  },

];



// Convenience map: given a style, list its options

export const OPTIONS_BY_STYLE: Record<JobStyle, StyleOption[]> = {

  pixar: STYLE_OPTIONS.filter((o) => o.style === "pixar"),

  anime: STYLE_OPTIONS.filter((o) => o.style === "anime"),

  superhero: STYLE_OPTIONS.filter((o) => o.style === "superhero"),

  holiday: STYLE_OPTIONS.filter((o) => o.style === "holiday"),

  sports: STYLE_OPTIONS.filter((o) => o.style === "sports"),

  birthday: STYLE_OPTIONS.filter((o) => o.style === "birthday"),

};

