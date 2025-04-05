export interface TeamMember {
    id: string | number;
    first_name: string;
    last_name: string;
    profile_photo: string;
    switch_photo1?: string;
    switch_photo2?: string;
    switch_photo3?: string;
    location?: string; // Allow undefined explicitly
    shortinfo?: string;
    personal_touch?: string;
    position?: string;
  }
  