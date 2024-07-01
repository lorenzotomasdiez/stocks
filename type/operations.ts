export interface Operation {
  id: number;
  bond_id: number;
  price: number;
  client_id: string;
  agent_id: number;
  created_at: string;
  amount: number;
}

export interface OperationFull extends Operation {
  bond_name: string;
  agent_name: string;
  client_name: string;
  bond_isin: string;
}

export interface Agent {
  id: number;
  name: string;
  created_at: string;
  agreenment: boolean;
  client_id: string;
}
export interface Client {
  id: string;
  name: string;
}
export interface Bond {
  id: number;
  name: string;
  currency: string;
  isin: string;
}

export interface BondPrice {
  bond_id: number;
  price: number;
  created_at: string;
}

export interface BondPriceFull extends BondPrice {
  bond_name: string;
  bond_isin: string;
  bond_currency: string;
}
