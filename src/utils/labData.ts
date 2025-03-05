
export interface Lab {
  id: string;
  name: string;
  location: string;
}

export interface Training {
  id: string;
  name: string;
}

// Helper function to get a unique ID
const generateId = (prefix: string) => `${prefix}${Date.now()}`;

// Load labs from localStorage or use defaults
const loadLabs = (): Lab[] => {
  const storedLabs = localStorage.getItem('labs');
  if (storedLabs) {
    return JSON.parse(storedLabs);
  }
  return [
    { id: "lab1", name: "Qualityveda (A unit of Sirajex Diagnostics Pvt. Ltd.", location: "206, 3rd Floor, Silver Home - 2, opposite 14th Avenue, Greater Noida, Ghaziabad, Uttar Pradesh 201301" },
    { id: "lab2", name: "Thyrovision Laboratories", location: "F 126, Ground Floor, Katwaria Sarai, Main Road, Shaheed Jeet Singh Marg, New Delhi, Delhi 110016" },
    { id: "lab3", name: "Dr Lalchandani Labs", location: "M-20, Greater Kailash-1, M Block, Greater Kailash I, Greater Kailash, New Delhi, Delhi 110048" },
    { id: "lab4", name: "ANVENTA DIAGNOSTICS", location: "GATE NO. 5, Pocket - F, MIG FLATS, 94-A, opposite GTB HOSPITAL, GTB Enclave, Dilshad Garden, Delhi, 110095" },
    { id: "lab5", name: "Avantika Pathology Labs", location: "Plot No- 367 137 Peepal Chowk, near to Swarn Jayanti Park Road, Niti Khand 2, Indirapuram, Ghaziabad, Uttar Pradesh 201014" },
    { id: "lab6", name: "IQ Diagnostics Pvt Ltd", location: "IQ Diagnostics, BLK-03 & 04, Sector 121, Noida, Uttar Pradesh 201307" },
    { id: "lab7", name: "Microbe Diagnostics Laboratories Pvt Ltd", location: "819 - P, 1st Floor, Sector 47, Off, Netaji Subhash Marg, Gurugram, Haryana 122018" },
    { id: "lab8", name: "DGChem Labs", location: "2nd Floor, US Complex, 231, Mathura Rd, opp. Apollo Hospital, Jasola Vihar, New Delhi, Delhi 110076" },
    { id: "lab9", name: "Thyrovision Labs x Cronus Multi Speciality Hospital", location: "100 Feet Rd, Phase 1, Chhatarpur Enclave Phase 2, Chattarpur Enclave, Chhatarpur, New Delhi, Delhi 110074" },
    { id: "lab10", name: "PROTIME LABS (A UNIT OF PROTIME HEALTH LLP)", location: "DDA PLOT 454, in front of gupta realtors, Sector 19, Pocket 1, Dwarka, New Delhi, Delhi 110075" },
    { id: "lab11", name: "Cee Dee Diagnostics", location: "Rz-88/J Main Road Raj Nagar, Part-1, Palam, Delhi, 110077" },
    { id: "lab12", name: "NDNC Diagnostics", location: "A-1/87, SEWAK PARK, DWARKA MOR, NEAR N.S. INSTITUTE OF TECHNOLOGY, NEW DELHI, New, Delhi, 110059" },
    { id: "lab13", name: "Jyoti Dental & Diagnostic", location: "Flat A1, Balaji Apartment, Lohia ParkPark, 5/12, near Dr. Ram Manohar, Sector 5, Rajendra Nagar, Ghaziabad, Uttar Pradesh 201005" },
    { id: "lab14", name: "OnePlus Ultrasound Lab", location: "47, Harsh Vihar, Pitampura, Delhi, 110034" },
    { id: "lab15", name: "SSAKHI DIAGNOSTICS & HEALTHCARE, A UNIT OF SATNAM SAKHI HEALTH SERVICES (OPC) PVT. LTD", location: "W-4, Metro Sta on Shadipur, Gate no 4, adjoining Shadipur, West Patel Nagar, New Delhi 110008" },
    { id: "lab16", name: "TRUE PATH DIAGNOSTICS PVT LTD", location: "Manohar Park, East Punjabi Bagh, Punjabi Bagh, Delhi, 110026" },
    { id: "lab17", name: "Oncoplus Path Lab", location: "B-73 & B-75, Bhishma Pitamah Marg, Block B, Defence Colony, New Delhi 110024" },
    { id: "lab18", name: "Dr Anjana Central Diagnostics Pvt Ltd", location: "1st Floor Sumbha Complex, West Boring Canal Rd, Anandpuri, Patna, Bihar 800001" },

  ];
};

// Load trainings from localStorage or use defaults
const loadTrainings = (): Training[] => {
  const storedTrainings = localStorage.getItem('trainings');
  if (storedTrainings) {
    return JSON.parse(storedTrainings);
  }
  return [
    { id: "training1", name: "BMW" },
    { id: "training2", name: "IQC & EQA" },
    { id: "training3", name: "NSI" },
    { id: "training4", name: "Fire" },
    { id: "training5", name: "QI, ILC & Critical Alert" },
    { id: "training6", name: "Phlebotomy" },
    { id: "training7", name: "Ethics" },
    { id: "training8", name: "Internal Audit & MRM" },
    { id: "training9", name: "Laboratory Safety & Spill" },
    { id: "training10", name: "EQAS & PT Outlier" },
    { id: "training11", name: "Personnel Training & Environment" },
    { id: "training12", name: "Condition" },
    { id: "training13", name: "General Questions for lab" },
    { id: "training14", name: "Autoclave" },
    { id: "training15", name: "ISO 15189:2022" },
  ];
};

// Initialize with data from localStorage or defaults
export let availableLabs: Lab[] = loadLabs();
export let availableTrainings: Training[] = loadTrainings();

// Functions to manage labs
export const addLab = (name: string, location: string): Lab => {
  const newLab: Lab = {
    id: generateId('lab'),
    name,
    location,
  };
  availableLabs = [...availableLabs, newLab];
  localStorage.setItem('labs', JSON.stringify(availableLabs));
  return newLab;
};

export const removeLab = (id: string): void => {
  availableLabs = availableLabs.filter(lab => lab.id !== id);
  localStorage.setItem('labs', JSON.stringify(availableLabs));
};

export const updateLab = (id: string, updates: Partial<Lab>): Lab | undefined => {
  const index = availableLabs.findIndex(lab => lab.id === id);
  if (index === -1) return undefined;
  
  const updatedLab = { ...availableLabs[index], ...updates };
  availableLabs = [
    ...availableLabs.slice(0, index),
    updatedLab,
    ...availableLabs.slice(index + 1)
  ];
  localStorage.setItem('labs', JSON.stringify(availableLabs));
  return updatedLab;
};

// Functions to manage trainings
export const addTraining = (name: string): Training => {
  const newTraining: Training = {
    id: generateId('training'),
    name,
  };
  availableTrainings = [...availableTrainings, newTraining];
  localStorage.setItem('trainings', JSON.stringify(availableTrainings));
  return newTraining;
};

export const removeTraining = (id: string): void => {
  availableTrainings = availableTrainings.filter(training => training.id !== id);
  localStorage.setItem('trainings', JSON.stringify(availableTrainings));
};

export const updateTraining = (id: string, updates: Partial<Training>): Training | undefined => {
  const index = availableTrainings.findIndex(training => training.id === id);
  if (index === -1) return undefined;
  
  const updatedTraining = { ...availableTrainings[index], ...updates };
  availableTrainings = [
    ...availableTrainings.slice(0, index),
    updatedTraining,
    ...availableTrainings.slice(index + 1)
  ];
  localStorage.setItem('trainings', JSON.stringify(availableTrainings));
  return updatedTraining;
};
