import { useState, useEffect } from 'react';
import { Member, Evento, Transaccion, InventarioItem } from '../types';
import { mockMembers, mockEvents, mockTransactions, mockInventory } from '../data/datosPrueba';

export const useData = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Evento[]>([]);
  const [transactions, setTransactions] = useState<Transaccion[]>([]);
  const [inventory, setInventory] = useState<InventarioItem[]>([]);

  useEffect(() => {
    const savedMembers = localStorage.getItem('church_members');
    const savedEvents = localStorage.getItem('church_events');
    const savedTransactions = localStorage.getItem('church_transactions');
    const savedInventory = localStorage.getItem('church_inventory');

    setMembers(savedMembers ? JSON.parse(savedMembers) : mockMembers);
    setEvents(savedEvents ? JSON.parse(savedEvents) : mockEvents);
    setTransactions(savedTransactions ? JSON.parse(savedTransactions) : mockTransactions);
    setInventory(savedInventory ? JSON.parse(savedInventory) : mockInventory);
  }, []);

  const saveMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem('church_members', JSON.stringify(newMembers));
  };

  const saveEvents = (newEvents: Evento[]) => {
    setEvents(newEvents);
    localStorage.setItem('church_events', JSON.stringify(newEvents));
  };

  const saveTransactions = (newTransactions: Transaccion[]) => {
    setTransactions(newTransactions);
    localStorage.setItem('church_transactions', JSON.stringify(newTransactions));
  };

  const saveInventory = (newInventory: InventarioItem[]) => {
    setInventory(newInventory);
    localStorage.setItem('church_inventory', JSON.stringify(newInventory));
  };

  // CRUD Members
  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    saveMembers([...members, newMember]);
  };

  const updateMember = (id: string, updatedMember: Partial<Member>) => {
    saveMembers(members.map(m => m.id === id ? { ...m, ...updatedMember } : m));
  };

  const deleteMember = (id: string) => {
    // Logical delete (set active to No) or physical? User said "Eliminar (lógico)"
    updateMember(id, { activo: 'No' });
  };

  // CRUD Events
  const addEvent = (event: Omit<Evento, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    saveEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<Evento>) => {
    saveEvents(events.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
  };

  const deleteEvent = (id: string) => {
    updateEvent(id, { estado: 'Cancelado' });
  };

  // CRUD Transactions
  const addTransaction = (transaction: Omit<Transaccion, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    saveTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaccion>) => {
    saveTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedTransaction } : t));
  };

  const deleteTransaction = (id: string) => {
    saveTransactions(transactions.filter(t => t.id !== id));
  };

  // CRUD Inventory
  const addInventoryItem = (item: Omit<InventarioItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    saveInventory([...inventory, newItem]);
  };

  const updateInventoryItem = (id: string, updatedItem: Partial<InventarioItem>) => {
    saveInventory(inventory.map(i => i.id === id ? { ...i, ...updatedItem } : i));
  };

  const deleteInventoryItem = (id: string) => {
    saveInventory(inventory.filter(i => i.id !== id));
  };

  return {
    members, addMember, updateMember, deleteMember,
    events, addEvent, updateEvent, deleteEvent,
    transactions, addTransaction, updateTransaction, deleteTransaction,
    inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem
  };
};
