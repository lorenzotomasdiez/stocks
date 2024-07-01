import { Agent, BondPrice, Client, Operation } from "@/type/operations";
import { Bond } from "@prisma/client";

export const bonds_mocked: Bond[] = [
  { id: 1, name: "Bopreal Serie 1C", currency: "USD", isin: "BPD7C" },
  { id: 2, name: "Bopreal Serie 1A", currency: "ARS", isin: "BPA7C" },
  { id: 3, name: "Bonos de la R.A. en USD", currency: "USD", isin: "AE38C" },
  {
    id: 4,
    name: "Aeropuertos Argentina 2000 Tasa fija 8.",
    currency: "ARS",
    isin: "ARC10",
  },
  { id: 5, name: "Boldt S.A Tasa Fija 10%", currency: "ARS", isin: "BOL1D" },
];

export const clients_mocked: Client[] = [
  {
    id: "bd4776d8-389f-4454-886f-024c9b8de958",
    name: "Quantum",
  },
  {
    id: "ef9876d8-389f-4454-886f-024c9b8de123",
    name: "Alpha Investments",
  },
];

export const agents_mocked: Agent[] = [
  {
    id: 1,
    name: "Santander Rio",
    created_at: new Date().toISOString(),
    agreenment: false,
    client_id: clients_mocked[0].id,
  },
  {
    id: 2,
    name: "Bull Market Brokers",
    created_at: new Date().toISOString(),
    agreenment: true,
    client_id: clients_mocked[0].id,
  },
  {
    id: 3,
    name: "JP Morgan",
    created_at: new Date().toISOString(),
    agreenment: true,
    client_id: clients_mocked[1].id,
  },
  {
    id: 4,
    name: "Goldman Sachs",
    created_at: new Date().toISOString(),
    agreenment: false,
    client_id: clients_mocked[1].id,
  },
];

export const bond_price_mocked: BondPrice[] = [
  {
    bond_id: 1,
    price: 40.33,
    created_at: new Date().toISOString(),
  },
  {
    bond_id: 2,
    price: 35.5,
    created_at: new Date().toISOString(),
  },
  {
    bond_id: 3,
    price: 28.7,
    created_at: new Date().toISOString(),
  },
  {
    bond_id: 4,
    price: 45.9,
    created_at: new Date().toISOString(),
  },
  {
    bond_id: 5,
    price: 50.07,
    created_at: new Date().toISOString(),
  },
  {
    bond_id: 1,
    price: 39.33,
    created_at: new Date(2024, 5, 30).toISOString(),
  },
  {
    bond_id: 2,
    price: 36.5,
    created_at: new Date(2024, 5, 30).toISOString(),
  },
  {
    bond_id: 3,
    price: 28.7,
    created_at: new Date(2024, 5, 30).toISOString(),
  },
  {
    bond_id: 4,
    price: 44.9,
    created_at: new Date(2024, 5, 30).toISOString(),
  },
  {
    bond_id: 5,
    price: 52.07,
    created_at: new Date(2024, 5, 30).toISOString(),
  },
];

export const operations_mocked: Operation[] = [
  {
    id: 1,
    bond_id: 1,
    price: 300.5,
    client_id: clients_mocked[0].id,
    agent_id: 1,
    amount: 5400,
    created_at: new Date(2024, 5, 20).toISOString(),
  },
  {
    id: 2,
    bond_id: 2,
    price: 33.4,
    client_id: clients_mocked[0].id,
    agent_id: 1,
    amount: 30450,
    created_at: new Date(2024, 5, 20).toISOString(),
  },
  {
    id: 3,
    bond_id: 2,
    price: 34.55,
    client_id: clients_mocked[0].id,
    agent_id: 2,
    amount: 44560,
    created_at: new Date(2024, 5, 20).toISOString(),
  },
  {
    id: 4,
    bond_id: 3,
    price: 29.99,
    client_id: clients_mocked[1].id,
    agent_id: 3,
    amount: 21000,
    created_at: new Date(2024, 5, 21).toISOString(),
  },
  {
    id: 5,
    bond_id: 4,
    price: 47.12,
    client_id: clients_mocked[1].id,
    agent_id: 4,
    amount: 6700,
    created_at: new Date(2024, 5, 22).toISOString(),
  },
  {
    id: 6,
    bond_id: 5,
    price: 52.0,
    client_id: clients_mocked[1].id,
    agent_id: 3,
    amount: 8900,
    created_at: new Date(2024, 5, 23).toISOString(),
  },
];
