import { Category, Task } from './tasks.beans';

export const categories: Category[] = [
  {
    category: "bedroom",
    label: "Bedroom",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 7,
    type: "category"
  },
  {
    category: "garage",
    label: "Garage",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 8,
    type: "category"
  },
  {
    category: "general",
    label: "General Housekeeping",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 1,
    type: "category"
  },
  {
    category: "todo",
    label: "Todo Items",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 10,
    type: "category"
  },
  {
    category: "personal",
    label: "Personal",
    sharedWith: ["I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 11,
    type: "category"
  },
  {
    category: "personal",
    label: "Personal",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2"],
    sortOrder: 11,
    type: "category"
  },
  {
    category: "backyard",
    label: "Backyard",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 6,
    type: "category"
  },
  {
    category: "frontYard",
    label: "Front Yard",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 5,
    type: "category"
  },
  {
    category: "pet",
    label: "Pets",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 2,
    type: "category"
  },
  {
    category: "kitchen",
    label: "Kitchen",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 4,
    type: "category"
  },
  {
    category: "guestRoom",
    label: "Guest Room",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 9,
    type: "category"
  },
  {
    category: "car",
    label: "Cars",
    sharedWith: ["8S5yqlwhbMeD37ei1LKjmPEanzp2", "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"],
    sortOrder: 3,
    type: "category"
  }
];

export const tasks: Task[] = [
  {
    category: "personal",
    dueDate: 0,
    label: "Cull clothes and donate to Goodwill",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
    ],
    sortOrder: 2,
    uid: "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
  },
  {
    category: "backyard",
    dueDate: 1713596400000,
    label: "Clean spa filters",
    lastCompletedDate: 1703577600000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1713596400000,
    label: "Clean and organize fridge (indoor)",
    lastCompletedDate: 1695452400000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "guestRoom",
    dueDate: 1713596400000,
    label: "Organize guest room (placeholder)",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1715670000000,
    label: "Empty litter in each litter box",
    lastCompletedDate: 1707552000000,
    notes: "<p>Kids bath emptied: 2/10,</p><p>Master emptied: 2/14</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1713596400000,
    label: "Swap propane tank in fireplace at Walmart",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 9,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1714460400000,
    label: "Clip cat claws",
    lastCompletedDate: 1702540800000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 8,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "todo",
    dueDate: 1713596400000,
    label: "Place pavers around spa",
    lastCompletedDate: 0,
    notes: "<p>Double check that we have sand to place under the pavers</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "garage",
    dueDate: 1713596400000,
    label: "Clean and organize fridge (outdoor)",
    lastCompletedDate: 1695452400000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "frontYard",
    dueDate: 1717398000000,
    label: "Change wreath (seasonally)",
    lastCompletedDate: 1709452800000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "car",
    dueDate: 1735372800000,
    label: "Service - Truck",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "todo",
    dueDate: 1713596400000,
    label: "Plant new boxwood next to garden",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1713596400000,
    label: "Pull weeds in backyard",
    lastCompletedDate: 1697871600000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "bedroom",
    dueDate: 1711868400000,
    label: "Change bed sheets",
    lastCompletedDate: 1707206400000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1712214000000,
    label: "House cleaned by maids",
    lastCompletedDate: 1709539200000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "car",
    dueDate: 1711954800000,
    label: "Service - Lexus",
    lastCompletedDate: 1703836800000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1706256000000,
    label: "Get hair colored",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
    ],
    sortOrder: 6,
    uid: "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
  },
  {
    category: "car",
    dueDate: 1711954800000,
    label: "Tire rotation - Lexus",
    lastCompletedDate: 1703836800000,
    notes: "<p>Rotate tires at 5k miles. &nbsp;Next rotation: 81343</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1713596400000,
    label: "Organize tea cabinet",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 8,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1713596400000,
    label: "Spray and clean AC unit",
    lastCompletedDate: 1697785200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1712127600000,
    label: "Scoop litter boxes",
    lastCompletedDate: 1711868400000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 0,
    label: "List garage items on marketplace",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
    ],
    sortOrder: 1,
    uid: "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
  },
  {
    category: "personal",
    dueDate: 0,
    label: "Get haircut",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
    ],
    sortOrder: 5,
    uid: "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
  },
  {
    category: "kitchen",
    dueDate: 1713596400000,
    label: "Clean and organize freezer (indoor)",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1713596400000,
    label: "Clean (303) spa cover",
    lastCompletedDate: 1703577600000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1712214000000,
    label: "Replace bag in Litter Robot (laundry)",
    lastCompletedDate: 1711868400000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1719730800000,
    label: "Replace air filters",
    lastCompletedDate: 1703577600000,
    notes: "<p>1 - 20x36x1</p><p>1 - 14x20x1</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "frontYard",
    dueDate: 1713596400000,
    label: "Spray driveway",
    lastCompletedDate: 1696057200000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "car",
    dueDate: 1713596400000,
    label: "Car wash - Truck",
    lastCompletedDate: 1711004400000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "todo",
    dueDate: 1712732400000,
    label: "Disperse ground coffee in pantry amongst plants",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "frontYard",
    dueDate: 1713596400000,
    label: "Replace Ring battery",
    lastCompletedDate: 1705824000000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1726815600000,
    label: "Vet visit - Willy",
    lastCompletedDate: 1695366000000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 11,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "frontYard",
    dueDate: 0,
    label: "Spray for ants - front yard",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1709971200000,
    label: "Clean out icloud",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2"
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1715151600000,
    label: "Get haircut",
    lastCompletedDate: 1707379200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2"
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1713596400000,
    label: "Clean Smart Cat Litter Box",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1714460400000,
    label: "Check Amazon Prime gaming",
    lastCompletedDate: 1698649200000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2"
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1712127600000,
    label: "Replace bag in Smart Cat Litter Box (loft)",
    lastCompletedDate: 1707552000000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "garage",
    dueDate: 1713596400000,
    label: "Clean and organize freezer (outdoor)",
    lastCompletedDate: 1695452400000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "frontYard",
    dueDate: 1713596400000,
    label: "Spread bark",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 0,
    label: "Organize books",
    lastCompletedDate: 1709107200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1713596400000,
    label: "Clean/spray patio",
    lastCompletedDate: 1697785200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1713596400000,
    label: "WD40 any squeaky doors",
    lastCompletedDate: 1709712000000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 8,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1713596400000,
    label: "Organize spice cabinet",
    lastCompletedDate: 1696057200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1717225200000,
    label: "Clean oven",
    lastCompletedDate: 1704096000000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1714201200000,
    label: "Organize bathroom cabinets",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1712559600000,
    label: "Replace indoor fridge water filter",
    lastCompletedDate: 1707379200000,
    notes: "<p>Spare filter in hall drawer</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 9,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1713596400000,
    label: "Clean & organize pantry",
    lastCompletedDate: 1695452400000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1726815600000,
    label: "Vet visit - Rory",
    lastCompletedDate: 1695193200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 10,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "car",
    dueDate: 1711954800000,
    label: "Car wash - Lexus",
    lastCompletedDate: 1696057200000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1706688000000,
    label: "Get pedicure",
    lastCompletedDate: 1700553600000,
    notes: '',
    sharedWith: [
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
    ],
    sortOrder: 4,
    uid: "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
  },
  {
    category: "personal",
    dueDate: 1709971200000,
    label: "Add music to new iPhone",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2"
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "car",
    dueDate: 0,
    label: "Oil change - Truck",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1714460400000,
    label: "Replace Arm & Hammer in main fridge",
    lastCompletedDate: 1711868400000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "todo",
    dueDate: 1713596400000,
    label: "Find 2 plants to replace hydrangeas in barrels in backyard",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 3,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "todo",
    dueDate: 1713596400000,
    label: "Get Stockton library card, sign up for Mango",
    lastCompletedDate: 0,
    notes: "<p>Mango is included with Stockton library card. &nbsp;Provides 72 free language courses: https://learn.mangolanguages.com/link/</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 6,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1711868400000,
    label: "Spray house/upstairs sofa with Lysol ",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 11,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "frontYard",
    dueDate: 1713596400000,
    label: "Spray down porch",
    lastCompletedDate: 1694156400000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 2,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1713596400000,
    label: "Clean Litter Robot",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1726815600000,
    label: "Vet visit - Milo",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 12,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1706688000000,
    label: "Get manicure",
    lastCompletedDate: 1703145600000,
    notes: '',
    sharedWith: [
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
    ],
    sortOrder: 3,
    uid: "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2"
  },
  {
    category: "garage",
    dueDate: 0,
    label: "Organize garage (placeholder)",
    lastCompletedDate: 0,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 0,
    label: "Give Revolution to cats",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 13,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "pet",
    dueDate: 1726815600000,
    label: "Vet visit - Simba",
    lastCompletedDate: 1695193200000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 9,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1712732400000,
    label: "Spray for ants - backyard",
    lastCompletedDate: 1707552000000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "kitchen",
    dueDate: 1714201200000,
    label: "Cull dishes",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 7,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1712473200000,
    label: "Check/fill all easyplants",
    lastCompletedDate: 1709798400000,
    notes: "<p>Master bedroom, island, covered patio, sunroom</p>",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 9,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "backyard",
    dueDate: 1711954800000,
    label: "Spray garden plants with fungicide",
    lastCompletedDate: 0,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 8,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1727766000000,
    label: "Price shop insurance",
    lastCompletedDate: 1696143600000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 5,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "personal",
    dueDate: 1710140400000,
    label: "Shave face",
    lastCompletedDate: 1709712000000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2"
    ],
    sortOrder: 1,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "car",
    dueDate: 1711954800000,
    label: "Tire rotation - Truck",
    lastCompletedDate: 1695366000000,
    notes: '',
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 7,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  },
  {
    category: "general",
    dueDate: 1711868400000,
    label: "Get mail",
    lastCompletedDate: 1711868400000,
    notes: "",
    sharedWith: [
      "8S5yqlwhbMeD37ei1LKjmPEanzp2",
      "I5mXbLpMmAZ4Z1MIRHnBwNxqMPs2",
    ],
    sortOrder: 4,
    uid: "8S5yqlwhbMeD37ei1LKjmPEanzp2"
  }
]
