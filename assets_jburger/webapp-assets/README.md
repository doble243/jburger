# J Burger · assets para webapp

## Uso directo

- `brand/logo-jburger.png`: logo principal transparente. No existe una versión vectorial original; no se debe convertir este PNG a SVG falso.
- `images/*.webp`: fotos de menú y hero, listas para cards, modal y portada.
- `svg/icon-*.svg`: íconos de interfaz; usan `currentColor` para respetar los colores de la app.
- `svg/badge-*.svg`: badges de producto.
- `svg/empty-cart.svg` y `svg/order-confirmed.svg`: estados de carrito y confirmación.
- `svg/ui-texture.svg`: textura sutil para fondos oscuros (usar como overlay, opacidad baja).
- `svg/favicon.svg`: favicon de la app.
- `svg/app-icon.svg`: icono para PWA / acceso directo.
- `og-jburger.jpg`: imagen 1200x630 para compartir el link (Open Graph).

## Criterio

Las fotos quedan en WebP. Los elementos que conviene escalar sin perder calidad quedan en SVG. Los badges podrían recrearse en CSS si se necesitara variar texto desde el panel.
