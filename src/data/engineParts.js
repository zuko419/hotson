export const enginePartsData = [
  {
    id: 'battery',
    index: '01',
    name: 'Structural 800V Battery Core',
    category: 'ENERGY ARCHITECTURE',
    description: '118 kWh integrated skateboard architecture acting as a structural member of the chassis, increasing torsional stiffness by 42% while providing a hyper-low center of gravity.',
    specs: [
      { label: 'Capacity', value: '118 kWh' },
      { label: 'Voltage', value: '800V DC' },
      { label: 'Cell Chemistry', value: 'Silicon-Graphite Anode' }
    ],
    // Offsets when exploded (px and 3d)
    offsets: {
      desktop: { x: 0, y: 150, z: -80, rotateX: 12, rotateY: 0, scale: 0.96 },
      mobile: { x: 0, y: 90, z: -30, rotateX: 8, rotateY: 0, scale: 0.98 },
    },
    // Connector callout position relative to center (% based)
    callout: {
      side: 'left',
      anchorX: 25,
      anchorY: 68,
      labelX: 10,
      labelY: 74,
    }
  },
  {
    id: 'motor',
    index: '02',
    name: 'Tri-Motor Axial Vectoring Unit',
    category: 'PROPULSION & DYNAMICS',
    description: 'Ultra-compact carbon-sleeved electric rotors spinning to 24,000 RPM. Sub-millisecond continuous torque vectoring across individual wheels with zero lag.',
    specs: [
      { label: 'Max RPM', value: '24,000 RPM' },
      { label: 'Peak Torque', value: '1,750 Nm' },
      { label: 'Inverter Tech', value: 'Dual SiC Semiconductors' }
    ],
    offsets: {
      desktop: { x: -160, y: -70, z: 60, rotateX: -6, rotateY: 18, scale: 1.04 },
      mobile: { x: -80, y: -45, z: 20, rotateX: -4, rotateY: 10, scale: 1.02 },
    },
    callout: {
      side: 'left',
      anchorX: 32,
      anchorY: 34,
      labelX: 8,
      labelY: 26,
    }
  },
  {
    id: 'thermal',
    index: '03',
    name: 'Cryo-Pulse Thermal Matrix',
    category: 'HEAT EXCHANGE & EFFICIENCY',
    description: 'Triple-zone microchannel heat exchangers with active refrigerant loops. Eliminates heat-soak during continuous high-velocity track runs and enables 350kW fast-charging at extreme temperatures.',
    specs: [
      { label: 'Temp Range', value: '-35°C to +55°C' },
      { label: 'Refrigerant', value: 'Eco-Loop R744' },
      { label: 'Cooling Power', value: '28 kW Heat Exchanger' }
    ],
    offsets: {
      desktop: { x: 160, y: -80, z: 40, rotateX: 6, rotateY: -16, scale: 1.02 },
      mobile: { x: 80, y: -50, z: 15, rotateX: 4, rotateY: -8, scale: 1.01 },
    },
    callout: {
      side: 'right',
      anchorX: 68,
      anchorY: 30,
      labelX: 88,
      labelY: 22,
    }
  },
  {
    id: 'drive',
    index: '04',
    name: 'Planetary Titanium Subframe',
    category: 'STRUCTURAL SUSPENSION',
    description: 'Forged aerospace titanium wishbone cradles combined with computer-controlled magnetorheological dampers that scan road surfaces 1,000 times per second.',
    specs: [
      { label: 'Material', value: 'Forged Ti-6Al-4V' },
      { label: 'Sampling Rate', value: '1,000 Hz' },
      { label: 'Damping Range', value: 'Dynamic 3-Way Active' }
    ],
    offsets: {
      desktop: { x: 0, y: -160, z: 80, rotateX: -14, rotateY: 0, scale: 1.06 },
      mobile: { x: 0, y: -90, z: 30, rotateX: -8, rotateY: 0, scale: 1.02 },
    },
    callout: {
      side: 'right',
      anchorX: 72,
      anchorY: 66,
      labelX: 90,
      labelY: 72,
    }
  },
];

