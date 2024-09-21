export interface Address {
  id: string
  uf: string
  cep: string
  ibge?: string
  main: boolean
  type: string
  active: boolean
  county: string
  number: string
  street: string
  latitude?: string
  county_id?: string
  longitude?: string
  person_id: string
  street_id?: string
  complement: string
  created_at: string
  created_by?: string
  number_old?: string
  contract_id: string
  neighborhood: string
  neighborhood_id?: string
}

export interface Advice {
  id?: string
  acronym?: string
  description?: string
}

export interface Servicelocation {
  id: string
  cnes: string
  name: string
  advice: Advice
  address: Address
  advice_uf?: string
  advice_numero?: string
}

export interface Access {
  id: string
  name: string
  active: boolean
  logo_uri: string
  plan_name: string
  service_locations: Servicelocation[]
}

export interface Speciality {
  id: string
  name: string
  active: boolean
  memed_id: string
  advice_id?: string
  created_by?: string
}

export interface Professional {
  id: string
  advice_uf: string
  specialities: Speciality[]
  number_advice: number
  advice_acronym: string
  advice_description: string
}

export interface Person {
  id: string
  name: string
  social_name: string
  mother_name: string
  father_name: string
  cnpj?: string
  cpf: string
  rg: string
  rg_agency: string
  date_expedition_rg?: string
  pis: string
  birth_date: string
  sex: string
  civil_status: string
  education_degree: string
  death_date?: string
  cns: string
  birth_certificate: string
  cnes: string
  type: string
  profession_id?: string
  nationality: string
  religion: string
  race: string
  created_at: string
  created_by?: string
  pre: boolean
  confirmed_at?: string
  weight: number
  height: number
  id_import?: string
  name_import?: string
  contract_import?: string
  name_search: string
  professional: Professional
}

export interface User {
  id: string
  username: string
  person_id: string
  inactive_date?: string
  beta_access: boolean
  prod_access: boolean
  active: boolean
  created_at: string
  created_by?: string
  contract_id?: string
  profile_image_url?: string
  person_name: string
}

export interface LoginResponse {
  token: string
  user: User
  person: Person
  roles: string[]
  access: Access
}
