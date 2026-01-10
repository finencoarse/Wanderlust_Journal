export interface Holiday {
  date: string;
  name: string;
}

export const HOLIDAY_DATABASE: Record<string, Holiday[]> = {
  "United States": [
    // 2024
    { date: "2024-01-01", name: "New Year's Day" },
    { date: "2024-01-15", name: "MLK Day" },
    { date: "2024-02-19", name: "Presidents' Day" },
    { date: "2024-05-27", name: "Memorial Day" },
    { date: "2024-06-19", name: "Juneteenth" },
    { date: "2024-07-04", name: "Independence Day" },
    { date: "2024-09-02", name: "Labor Day" },
    { date: "2024-11-11", name: "Veterans Day" },
    { date: "2024-11-28", name: "Thanksgiving" },
    { date: "2024-12-25", name: "Christmas Day" },
    // 2025
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-01-20", name: "MLK Day" },
    { date: "2025-02-17", name: "Presidents' Day" },
    { date: "2025-05-26", name: "Memorial Day" },
    { date: "2025-06-19", name: "Juneteenth" },
    { date: "2025-07-04", name: "Independence Day" },
    { date: "2025-09-01", name: "Labor Day" },
    { date: "2025-11-27", name: "Thanksgiving" },
    { date: "2025-12-25", name: "Christmas Day" },
    // 2026
    { date: "2026-01-01", name: "New Year's Day" },
    { date: "2026-01-19", name: "MLK Day" },
    { date: "2026-02-16", name: "Presidents' Day" },
    { date: "2026-05-25", name: "Memorial Day" },
    { date: "2026-06-19", name: "Juneteenth" },
    { date: "2026-07-04", name: "Independence Day" },
    { date: "2026-09-07", name: "Labor Day" },
    { date: "2026-11-26", name: "Thanksgiving" },
    { date: "2026-12-25", name: "Christmas Day" },
    // 2027
    { date: "2027-01-01", name: "New Year's Day" },
    { date: "2027-01-18", name: "MLK Day" },
    { date: "2027-02-15", name: "Presidents' Day" },
    { date: "2027-05-31", name: "Memorial Day" },
    { date: "2027-06-19", name: "Juneteenth" },
    { date: "2027-07-04", name: "Independence Day" },
    { date: "2027-09-06", name: "Labor Day" },
    { date: "2027-11-25", name: "Thanksgiving" },
    { date: "2027-12-25", name: "Christmas Day" },
    // 2028
    { date: "2028-01-01", name: "New Year's Day" },
    { date: "2028-01-17", name: "MLK Day" },
    { date: "2028-02-21", name: "Presidents' Day" },
    { date: "2028-05-29", name: "Memorial Day" },
    { date: "2028-06-19", name: "Juneteenth" },
    { date: "2028-07-04", name: "Independence Day" },
    { date: "2028-09-04", name: "Labor Day" },
    { date: "2028-11-23", name: "Thanksgiving" },
    { date: "2028-12-25", name: "Christmas Day" },
    // 2029
    { date: "2029-01-01", name: "New Year's Day" },
    { date: "2029-01-15", name: "MLK Day" },
    { date: "2029-02-19", name: "Presidents' Day" },
    { date: "2029-05-28", name: "Memorial Day" },
    { date: "2029-06-19", name: "Juneteenth" },
    { date: "2029-07-04", name: "Independence Day" },
    { date: "2029-09-03", name: "Labor Day" },
    { date: "2029-11-22", name: "Thanksgiving" },
    { date: "2029-12-25", name: "Christmas Day" }
  ],
  "United Kingdom": [
    // 2024
    { date: "2024-01-01", name: "New Year's Day" },
    { date: "2024-03-29", name: "Good Friday" },
    { date: "2024-04-01", name: "Easter Monday" },
    { date: "2024-05-06", name: "Early May Bank Holiday" },
    { date: "2024-05-27", name: "Spring Bank Holiday" },
    { date: "2024-08-26", name: "Summer Bank Holiday" },
    { date: "2024-12-25", name: "Christmas Day" },
    { date: "2024-12-26", name: "Boxing Day" },
    // 2025
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-04-18", name: "Good Friday" },
    { date: "2025-04-21", name: "Easter Monday" },
    { date: "2025-05-05", name: "Early May Bank Holiday" },
    { date: "2025-05-26", name: "Spring Bank Holiday" },
    { date: "2025-08-25", name: "Summer Bank Holiday" },
    { date: "2025-12-25", name: "Christmas Day" },
    { date: "2025-12-26", name: "Boxing Day" },
    // 2026
    { date: "2026-01-01", name: "New Year's Day" },
    { date: "2026-04-03", name: "Good Friday" },
    { date: "2026-04-06", name: "Easter Monday" },
    { date: "2026-05-04", name: "Early May Bank Holiday" },
    { date: "2026-05-25", name: "Spring Bank Holiday" },
    { date: "2026-08-31", name: "Summer Bank Holiday" },
    { date: "2026-12-25", name: "Christmas Day" },
    { date: "2026-12-28", name: "Boxing Day (Observed)" },
    // 2027
    { date: "2027-01-01", name: "New Year's Day" },
    { date: "2027-03-26", name: "Good Friday" },
    { date: "2027-03-29", name: "Easter Monday" },
    { date: "2027-05-03", name: "Early May Bank Holiday" },
    { date: "2027-05-31", name: "Spring Bank Holiday" },
    { date: "2027-08-30", name: "Summer Bank Holiday" },
    { date: "2027-12-27", name: "Christmas Day (Observed)" },
    { date: "2027-12-28", name: "Boxing Day (Observed)" },
    // 2028
    { date: "2028-01-03", name: "New Year's Day (Observed)" },
    { date: "2028-04-14", name: "Good Friday" },
    { date: "2028-04-17", name: "Easter Monday" },
    { date: "2028-05-01", name: "Early May Bank Holiday" },
    { date: "2028-05-29", name: "Spring Bank Holiday" },
    { date: "2028-08-28", name: "Summer Bank Holiday" },
    { date: "2028-12-25", name: "Christmas Day" },
    { date: "2028-12-26", name: "Boxing Day" },
    // 2029
    { date: "2029-01-01", name: "New Year's Day" },
    { date: "2029-03-30", name: "Good Friday" },
    { date: "2029-04-02", name: "Easter Monday" },
    { date: "2029-05-07", name: "Early May Bank Holiday" },
    { date: "2029-05-28", name: "Spring Bank Holiday" },
    { date: "2029-08-27", name: "Summer Bank Holiday" },
    { date: "2029-12-25", name: "Christmas Day" },
    { date: "2029-12-26", name: "Boxing Day" }
  ],
  "Japan": [
    // 2024-2029 (Fixed & Major)
    ...Array.from({ length: 6 }).flatMap((_, i) => {
      const year = 2024 + i;
      return [
        { date: `${year}-01-01`, name: "Gantan (New Year)" },
        { date: `${year}-02-11`, name: "Foundation Day" },
        { date: `${year}-02-23`, name: "Emperor's Birthday" },
        { date: `${year}-04-29`, name: "Showa Day" },
        { date: `${year}-05-03`, name: "Constitution Memorial Day" },
        { date: `${year}-05-04`, name: "Greenery Day" },
        { date: `${year}-05-05`, name: "Children's Day" },
        { date: `${year}-08-11`, name: "Mountain Day" },
        { date: `${year}-11-03`, name: "Culture Day" },
        { date: `${year}-11-23`, name: "Labor Thanksgiving Day" }
      ];
    })
  ],
  "China": [
    // 2024
    { date: "2024-01-01", name: "New Year's Day" },
    { date: "2024-02-10", name: "Lunar New Year" },
    { date: "2024-04-04", name: "Qingming Festival" },
    { date: "2024-05-01", name: "Labor Day" },
    { date: "2024-06-10", name: "Dragon Boat Festival" },
    { date: "2024-09-17", name: "Mid-Autumn Festival" },
    { date: "2024-10-01", name: "National Day" },
    // 2025
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-01-29", name: "Lunar New Year" },
    { date: "2025-04-04", name: "Qingming Festival" },
    { date: "2025-05-01", name: "Labor Day" },
    { date: "2025-05-31", name: "Dragon Boat Festival" },
    { date: "2025-10-01", name: "National Day" },
    { date: "2025-10-06", name: "Mid-Autumn Festival" },
    // 2026
    { date: "2026-01-01", name: "New Year's Day" },
    { date: "2026-02-17", name: "Lunar New Year" },
    { date: "2026-04-05", name: "Qingming Festival" },
    { date: "2026-05-01", name: "Labor Day" },
    { date: "2026-06-19", name: "Dragon Boat Festival" },
    { date: "2026-09-25", name: "Mid-Autumn Festival" },
    { date: "2026-10-01", name: "National Day" },
    // 2027
    { date: "2027-01-01", name: "New Year's Day" },
    { date: "2027-02-06", name: "Lunar New Year" },
    { date: "2027-04-05", name: "Qingming Festival" },
    { date: "2027-05-01", name: "Labor Day" },
    { date: "2027-06-09", name: "Dragon Boat Festival" },
    { date: "2027-09-15", name: "Mid-Autumn Festival" },
    { date: "2027-10-01", name: "National Day" },
    // 2028
    { date: "2028-01-01", name: "New Year's Day" },
    { date: "2028-01-26", name: "Lunar New Year" },
    { date: "2028-04-04", name: "Qingming Festival" },
    { date: "2028-05-01", name: "Labor Day" },
    { date: "2028-05-28", name: "Dragon Boat Festival" },
    { date: "2028-10-01", name: "National Day" },
    { date: "2028-10-03", name: "Mid-Autumn Festival" },
    // 2029
    { date: "2029-01-01", name: "New Year's Day" },
    { date: "2029-02-13", name: "Lunar New Year" },
    { date: "2029-04-04", name: "Qingming Festival" },
    { date: "2029-05-01", name: "Labor Day" },
    { date: "2029-06-16", name: "Dragon Boat Festival" },
    { date: "2029-09-22", name: "Mid-Autumn Festival" },
    { date: "2029-10-01", name: "National Day" }
  ],
  "Hong Kong": [
    // 2024-2029 (Major recurring)
    ...Array.from({ length: 6 }).flatMap((_, i) => {
      const year = 2024 + i;
      return [
        { date: `${year}-01-01`, name: "New Year's Day" },
        { date: `${year}-05-01`, name: "Labor Day" },
        { date: `${year}-07-01`, name: "HKSAR Day" },
        { date: `${year}-10-01`, name: "National Day" },
        { date: `${year}-12-25`, name: "Christmas Day" },
        { date: `${year}-12-26`, name: "Boxing Day" }
      ];
    }),
    { date: "2024-02-10", name: "Lunar New Year" },
    { date: "2025-01-29", name: "Lunar New Year" },
    { date: "2026-02-17", name: "Lunar New Year" },
    { date: "2027-02-06", name: "Lunar New Year" },
    { date: "2028-01-26", name: "Lunar New Year" },
    { date: "2029-02-13", name: "Lunar New Year" }
  ],
  "Taiwan": [
    // 2024-2029 (Major recurring)
    ...Array.from({ length: 6 }).flatMap((_, i) => {
      const year = 2024 + i;
      return [
        { date: `${year}-01-01`, name: "Founding Day" },
        { date: `${year}-02-28`, name: "Peace Memorial Day" },
        { date: `${year}-04-04`, name: "Children's Day" },
        { date: `${year}-10-10`, name: "National Day" }
      ];
    }),
    { date: "2024-02-10", name: "Lunar New Year" },
    { date: "2025-01-29", name: "Lunar New Year" },
    { date: "2026-02-17", name: "Lunar New Year" },
    { date: "2027-02-06", name: "Lunar New Year" },
    { date: "2028-01-26", name: "Lunar New Year" },
    { date: "2029-02-13", name: "Lunar New Year" }
  ]
};