export type OrderItem = {
  id?: string;
  img?: string | number;
  name: string;
  price: string | number;
  qty?: number;
};

let order: OrderItem[] = [];

type Listener = (items: OrderItem[]) => void;
const listeners: Listener[] = [];

function notify() {
  const snapshot = order.slice();
  listeners.forEach((l) => {
    try {
      l(snapshot);
    } catch (e) {

    }
  });
}

export function getOrder(): OrderItem[] {
  return order.slice();
}

function findIndexByMatch(match?: { id?: string; name?: string }) {
  if (!match) return -1;
  if (match.id) {
    return order.findIndex((o) => o.id && o.id === match.id);
  }
  if (match.name) {
    return order.findIndex((o) => o.name === match.name);
  }
  return -1;
}

export function addToOrder(item: OrderItem) {
  const matchIndex = order.findIndex((o) =>
    (o.id && item.id) ? o.id === item.id : o.name === item.name
  );

  if (matchIndex >= 0) {
    order[matchIndex].qty = (order[matchIndex].qty ?? 1) + (item.qty ?? 1);
  } else {
    order.push({ ...item, qty: item.qty ?? 1 });
  }

  notify();
}

export function decrementFromOrder(matchKey?: string) {
  if (!matchKey) return;

  const idxById = order.findIndex((o) => o.id && o.id === matchKey);
  const idx = idxById >= 0 ? idxById : order.findIndex((o) => o.name === matchKey);

  if (idx < 0) return;

  const currentQty = order[idx].qty ?? 1;
  if (currentQty <= 1) {
    order.splice(idx, 1);
  } else {
    order[idx].qty = currentQty - 1;
  }

  notify();
}

export function removeFromOrder(matchKey?: string) {
  if (!matchKey) return;

  const idxById = order.findIndex((o) => o.id && o.id === matchKey);
  if (idxById >= 0) {
    order.splice(idxById, 1);
    notify();
    return;
  }

  const newOrder = order.filter((o) => o.name !== matchKey);
  if (newOrder.length !== order.length) {
    order = newOrder;
    notify();
  }
}

export function setOrder(newOrder: OrderItem[]) {
  order = newOrder ? newOrder.slice() : [];
  notify();
}

export function clearOrder() {
  order = [];
  notify();
}

export function subscribe(listener: Listener): () => void {
  if (typeof listener !== 'function') {
    throw new Error('OrderStore.subscribe requires a function');
  }
  listeners.push(listener);
  try {
    listener(order.slice());
  } catch {}

  return () => {
    const i = listeners.indexOf(listener);
    if (i >= 0) listeners.splice(i, 1);
  };
}
