/**
 * Anima una copia de la imagen del producto "volando" hacia el ícono del carrito.
 * Usa Web Animations API: sin dependencias, 60fps, y se auto-limpia.
 */
export function flyToCart(sourceEl: HTMLElement | null, imageUrl: string) {
  if (typeof window === 'undefined' || !sourceEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const target =
    document.getElementById('cart-anchor') ??
    document.getElementById('cart-button');
  if (!target) return;

  const from = sourceEl.getBoundingClientRect();
  const to = target.getBoundingClientRect();

  const ghost = document.createElement('div');
  ghost.style.cssText = `
    position: fixed;
    left: ${from.left}px;
    top: ${from.top}px;
    width: ${from.width}px;
    height: ${from.height}px;
    border-radius: 18px;
    background-image: url("${imageUrl}");
    background-size: cover;
    background-position: center;
    box-shadow: 0 20px 50px -12px rgba(0,0,0,0.7), 0 0 0 2px rgba(240,160,32,0.6);
    z-index: 999;
    pointer-events: none;
    will-change: transform, opacity;
  `;
  document.body.appendChild(ghost);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const scaleEnd = Math.max(0.12, (to.width * 0.8) / Math.max(from.width, 1));

  const animation = ghost.animate(
    [
      { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', opacity: 1, offset: 0 },
      {
        transform: `translate(${dx * 0.35}px, ${dy * 0.35 - 90}px) scale(0.62) rotate(-8deg)`,
        opacity: 0.95,
        offset: 0.45,
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(${scaleEnd}) rotate(10deg)`,
        opacity: 0,
        offset: 1,
      },
    ],
    {
      duration: 850,
      easing: 'cubic-bezier(0.5, 0, 0.2, 1)',
      fill: 'forwards',
    }
  );

  animation.onfinish = () => ghost.remove();
  animation.oncancel = () => ghost.remove();
}
