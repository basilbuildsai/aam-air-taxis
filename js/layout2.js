// v2 collage layouts not in ../js/layout.js. x, y, w, h are % of each host box. Credits: ../img/CREDITS.md.
export const LAYOUT2 = {
  historyBand: [
    { img: 'b_panam_heliport_roof_1987', x: 0, y: 2, w: 42, h: 62, rot: -1.5, zoom: 1.05, cls: 'shadow', cap: 'Pan Am Building, rooftop heliport closed, 1987. Gordon Bevan, CC BY-SA 2.0' },
    { circle: [300, 70], x: 3, y: 42, rot: -3, z: 30 },
    { img: 'b_panam_heliport_nya_cockpit_1967', x: 40, y: 0, w: 32, h: 50, rot: 1.5, zoom: 1.05, cls: 'coral shadow', cap: 'Aboard a New York Airways helicopter on the Pan Am roof, bound for JFK, 1967. John Atherton, CC BY-SA 2.0' },
    { img: 'b_nya_vertol107_jfk_1967', x: 70, y: 6, w: 30, h: 46, rot: -1, zoom: 1.05, cls: 'duo shadow', cap: 'New York Airways Vertol 107 at JFK, 1967. Swissair, ETH-Bibliothek, CC BY-SA 4.0' },
    { img: 'c_convaircar_1947_flight', x: 4, y: 64, w: 30, h: 34, rot: 1, zoom: 1.08, cls: 'shadow', cap: 'ConvAirCar flying car, 1947. SDASM' },
    { img: 'c_airgeep_first_flight_1962', x: 36, y: 54, w: 30, h: 44, rot: -1.5, zoom: 1.12, cls: 'shadow', cap: 'Piasecki AIRGEEP, 1962. SDASM' },
    { label: 'Rooftop to JFK,<br>ended in 1977', x: 70, y: 62, rot: -2, z: 30 },
    { tape: 1, x: 30, y: -3, rot: -9 }, { tape: 'c', x: 86, y: 2, rot: 11 },
  ],
  upkeepBand: [
    { img: 'a_x57_highvoltage_2021', x: 0, y: 6, w: 26, h: 86, rot: -1.5, zoom: 1.05, cls: 'shadow', cap: 'NASA X-57 electric aircraft, ground test, 2021' },
    { img: 'a_x57_battery_packs_2022', x: 25, y: 0, w: 20, h: 92, rot: 1.5, cls: 'coral shadow', cap: 'X-57 battery packs, 2022. NASA' },
    { img: 'd_joby_s4_hangar_edwards_2023', x: 44, y: 8, w: 32, h: 84, rot: -1, zoom: 1.05, cls: 'shadow', cap: 'Joby S4 in a hangar, Edwards AFB, 2023. US Air Force' },
    { img: 'd_electra_el2_props_quantico_2024', x: 75, y: 2, w: 25, h: 88, rot: 2, zoom: 1.08, cls: 'duo shadow', cap: 'Electra EL2 propellers, Quantico, 2024. US Marine Corps' },
    { label: 'No fleet data yet', x: 47, y: 0, rot: -2, z: 30 },
    { tape: 'c', x: 20, y: -4, rot: 10 }, { tape: 1, x: 70, y: -2, rot: -12 },
  ],
  interstateMap: [
    { img: 'e_interstate_map_1957', x: 2, y: 2, w: 96, h: 94, rot: -.6, cls: 'plain shadow', edges: 'tblr', amp: .8, cap: 'National System of Interstate and Defense Highways, December 1957. Bureau of Public Roads, public domain' },
    { tape: 1, x: 6, y: -2, rot: -10 }, { tape: 'c', x: 84, y: -2, rot: 9 },
    { label: '41,000 miles,<br>planned 1956', x: 3, y: 64, rot: -2, z: 30 },
  ],
  robotaxiBand: [
    { img: 'e_waymo_jaguar_sf_2023', x: 0, y: 4, w: 50, h: 88, rot: -1.5, zoom: 1.05, cls: 'shadow', cap: 'Waymo car with no one at the wheel, San Francisco, 2023. Dllu, CC BY 4.0' },
    { img: 'e_tesla_cybercab_sf_2026', x: 48, y: 0, w: 50, h: 86, rot: 1.5, zoom: 1.05, cls: 'duo shadow', cap: 'Tesla Cybercab, San Francisco, 2026. 9yz, CC BY 4.0' },
    { label: 'No driver,<br>door to door', x: 42, y: 4, rot: -2, z: 30 },
    { tape: 'c', x: 20, y: -3, rot: 8 }, { tape: 1, x: 76, y: -4, rot: -11 },
  ],
};
