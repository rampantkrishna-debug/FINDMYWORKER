import { City } from '../types';

export interface LocationArea {
  id: string;
  name: string;
  city: City;
  pincode: string;
  popularLandmarks: string[];
}

export const CITIES: City[] = ['Mohali', 'Chandigarh'];

export const TRICITY_AREAS: LocationArea[] = [
  // Mohali Areas
  {
    id: 'mohali-p7',
    name: 'Phase 7 (Sector 61)',
    city: 'Mohali',
    pincode: '160062',
    popularLandmarks: ['Phase 7 Market', 'Hot Millions', 'Gurdwara Amb Sahib']
  },
  {
    id: 'mohali-p3b2',
    name: 'Phase 3B2 (Sector 60)',
    city: 'Mohali',
    pincode: '160059',
    popularLandmarks: ['Phase 3B2 Main Market', 'Rose Garden', 'Silvi Park']
  },
  {
    id: 'mohali-p5',
    name: 'Phase 5 (Sector 59)',
    city: 'Mohali',
    pincode: '160059',
    popularLandmarks: ['Phase 5 Market', 'Fortis Hospital Road', 'Ivy Hospital']
  },
  {
    id: 'mohali-sec70',
    name: 'Sector 70',
    city: 'Mohali',
    pincode: '160071',
    popularLandmarks: ['Mattaur Village Road', 'Kalgidhar Enclave', 'Homeland Heights']
  },
  {
    id: 'mohali-sec71',
    name: 'Sector 71',
    city: 'Mohali',
    pincode: '160071',
    popularLandmarks: ['Ivory Towers', 'Sector 71 Community Centre']
  },
  {
    id: 'mohali-sec68',
    name: 'Sector 68',
    city: 'Mohali',
    pincode: '160062',
    popularLandmarks: ['Municipal Corporation Office', 'Forest Complex']
  },
  {
    id: 'mohali-sec82',
    name: 'Sector 82 (JLPL Industrial Area)',
    city: 'Mohali',
    pincode: '140308',
    popularLandmarks: ['World Tech Park', 'Bestech Square Mall', 'Aerocity Road']
  },
  {
    id: 'mohali-aerocity',
    name: 'Aerocity & IT City',
    city: 'Mohali',
    pincode: '140306',
    popularLandmarks: ['Plaksha University', 'Infosys Campus', 'Amity University']
  },
  {
    id: 'mohali-kharar',
    name: 'Kharar - Landran Road',
    city: 'Mohali',
    pincode: '140301',
    popularLandmarks: ['Sunny Enclave', 'CGC Landran', 'Gilco Valley']
  },

  // Chandigarh Areas
  {
    id: 'chd-sec17',
    name: 'Sector 17 (City Centre)',
    city: 'Chandigarh',
    pincode: '160017',
    popularLandmarks: ['Sector 17 Plaza', 'Neelam Cinema', 'ISBT 17']
  },
  {
    id: 'chd-sec22',
    name: 'Sector 22 (Aroma Market)',
    city: 'Chandigarh',
    pincode: '160022',
    popularLandmarks: ['Hotel Aroma', 'Kiran Cinema', 'Shastri Market']
  },
  {
    id: 'chd-sec35',
    name: 'Sector 35-C & B',
    city: 'Chandigarh',
    pincode: '160035',
    popularLandmarks: ['JW Marriott Road', 'Sector 35 Food Street', 'Kisan Bhawan']
  },
  {
    id: 'chd-sec43',
    name: 'Sector 43 (ISBT 43)',
    city: 'Chandigarh',
    pincode: '160043',
    popularLandmarks: ['ISBT 43', 'District Courts Complex', 'Judicial Academy']
  },
  {
    id: 'chd-sec8',
    name: 'Sector 8 & 9 (Inner Market)',
    city: 'Chandigarh',
    pincode: '160009',
    popularLandmarks: ['Sector 8 Cafe Street', 'Madhya Marg', 'Police Headquarters']
  },
  {
    id: 'chd-sec20',
    name: 'Sector 20 & 21',
    city: 'Chandigarh',
    pincode: '160020',
    popularLandmarks: ['Jama Masjid Sector 20', 'Sector 20 Market']
  },
  {
    id: 'chd-manimajra',
    name: 'Manimajra & IT Park',
    city: 'Chandigarh',
    pincode: '160101',
    popularLandmarks: ['DLF City Centre Mall', 'Rajiv Gandhi IT Park', 'Housing Board']
  },
  {
    id: 'chd-ind-area',
    name: 'Industrial Area Phase 1 & 2',
    city: 'Chandigarh',
    pincode: '160002',
    popularLandmarks: ['Elante Mall', 'Hyatt Regency', 'Centra Mall']
  }
];

