import { formatPrice, WHATSAPP_NUMBER } from '../data/products';
import type { CartItem } from '../context/CartContext';

export interface BuildWhatsAppParams {
  items: CartItem[];
  subtotal: number;
  name?: string;
  deliveryType?: 'delivery' | 'pickup';
  address?: string;
  notes?: string;
}

export function buildWhatsAppMessage(params: BuildWhatsAppParams): string {
  const { items, subtotal, name, deliveryType = 'delivery', address, notes } = params;
  const lines: string[] = ['🍔 *PEDIDO J BURGER*', ''];

  if (name?.trim()) {
    lines.push(`👤 Nombre: *${name.trim()}*`);
  }

  if (deliveryType === 'delivery') {
    lines.push(`🛵 Modalidad: *DELIVERY*`);
    if (address?.trim()) {
      lines.push(`📍 Dirección: *${address.trim()}*`);
    } else {
      lines.push(`📍 Dirección: _(A confirmar por chat)_`);
    }
  } else {
    lines.push(`🛍️ Modalidad: *RETIRO EN LOCAL*`);
  }

  lines.push('', '*Detalle del pedido:*');

  // Group items by category
  const combos = items.filter((i) => i.product.category === 'combos');
  const burgers = items.filter((i) => i.product.category === 'hamburguesas');
  const extras = items.filter((i) => i.product.category === 'extras' && i.product.id !== 'extra-papas-burger');

  // Papas extra count attached to burgers
  const papasItem = items.find((i) => i.product.id === 'extra-papas-burger');
  let papasAvailable = papasItem ? papasItem.quantity : 0;

  // 1. COMBOS SECTION
  if (combos.length > 0) {
    lines.push('\n🍟 *COMBOS:*');
    combos.forEach((item) => {
      const lineTotal = item.product.price * item.quantity;
      lines.push(
        `• ${item.quantity}x *${item.product.name}* _(incluye papas + bebida)_ — ${formatPrice(lineTotal)}`
      );
    });
  }

  // 2. HAMBURGUESAS SECTION
  if (burgers.length > 0) {
    lines.push('\n🍔 *HAMBURGUESAS:*');
    burgers.forEach((item) => {
      let burgerPapasCount = 0;
      if (papasAvailable > 0) {
        burgerPapasCount = Math.min(item.quantity, papasAvailable);
        papasAvailable -= burgerPapasCount;
      }
      const unitBasePrice = item.product.price;
      const itemTotalPrice = unitBasePrice * item.quantity + burgerPapasCount * 70;

      let papasNote = '';
      if (burgerPapasCount > 0) {
        if (burgerPapasCount === item.quantity) {
          papasNote = ' _(va con papas extra +$70)_';
        } else {
          papasNote = ` _(${burgerPapasCount} va con papas extra +$70)_`;
        }
      }

      lines.push(
        `• ${item.quantity}x *${item.product.name}*${papasNote} — ${formatPrice(itemTotalPrice)}`
      );
    });
  }

  // 3. EXTRAS SECTION
  if (extras.length > 0 || papasAvailable > 0) {
    lines.push('\n🥤 *EXTRAS & ACOMPAÑAMIENTOS:*');
    extras.forEach((item) => {
      const lineTotal = item.product.price * item.quantity;
      lines.push(
        `• ${item.quantity}x *${item.product.name}* — ${formatPrice(lineTotal)}`
      );
    });
    if (papasAvailable > 0) {
      lines.push(
        `• ${papasAvailable}x *Papas Extra* — ${formatPrice(papasAvailable * 70)}`
      );
    }
  }

  lines.push('', `💰 *TOTAL A PAGAR: ${formatPrice(subtotal)}*`);

  if (notes?.trim()) {
    lines.push('', `📝 Notas / Aclaraciones: ${notes.trim()}`);
  }

  lines.push(
    '',
    '💳 Medios de pago: Efectivo · Débito · Transferencia'
  );

  return lines.join('\n');
}

export function openWhatsAppOrder(params: BuildWhatsAppParams) {
  const message = buildWhatsAppMessage(params);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openWhatsAppSimple(text?: string) {
  const message = text ?? 'Hola! Quiero hacer un pedido en J Burger 🍔';
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
