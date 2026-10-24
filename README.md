# MTB-Tec – Página web para electricista alemán

Sitio estático (HTML + CSS + JS, sin dependencias) preparado para GitHub Pages.

## Estructura

```
mtb-tec/
├── index.html                → Página selector: enlaces a cada variante de diseño
├── variante-1/               → Variante A: profesional y limpia (azul marino + amarillo alemán)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── variante-2/               → Variante B: moderna y amigable (turquesa + amarillo, emojis, animaciones)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── variante-3/               → Variante C: completa y lista para producción (dark theme)
│                              (Impressum, Datenschutz, 404, robots.txt, sitemap.xml, assets/)
└── README.md
```

Cada variante es autónoma e independiente. El `index.html` de la raíz muestra una página de selección con un enlace a cada una (además tiene `noindex, nofollow` para que no se indexe como si fuera la web real). Para añadir una variante 3: crear su carpeta y descomentar su tarjeta en el `index.html` raíz.

## Cómo verlas en local

Abre `index.html` directamente en el navegador, o sirve la carpeta:

```bash
cd ~/mtb-tec
python3 -m http.server 8000
# → http://localhost:8000          (página selector)
# → http://localhost:8000/variante-1/
# → http://localhost:8000/variante-2/
# → http://localhost:8000/variante-3/
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (p. ej. `mtb-tec` o `usuario.github.io`).
2. Sube **todo el contenido** del directorio (el selector + las variantes):
   ```bash
   git init
   git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
   git add .
   git commit -m "Sitio MTB-Tec con selector de variantes"
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. Tras 1–2 minutos:
   - Selector: `https://TU_USUARIO.github.io/TU_REPO/`
   - Variante A: `https://TU_USUARIO.github.io/TU_REPO/variante-1/`
   - Variante B: `https://TU_USUARIO.github.io/TU_REPO/variante-2/`
   - Variante C: `https://TU_USUARIO.github.io/TU_REPO/variante-3/`

> Nota: los enlaces del selector son relativos y terminan en `/`, así funcionan igual
> si el repo se sirve desde la raíz (`usuario.github.io`) o desde una subruta.

Cuando elija la variante definitiva: copia su contenido a la raíz del repo
(sustituyendo el selector) o simplemente elimina las variantes no elegidas.

## Pendientes antes de publicar

- [ ] Reemplazar los datos de ejemplo: teléfono `+49 170 123 45 67`, email `info@mtb-tec.example`, dirección `Musterstraße 12, 12345 Musterstadt` y nombre `Max Mustermann` (aparecen en index.html, buscar/reemplazar).
- [ ] Insertar el logo propio (buscar los comentarios `<!-- Logo: hier später … -->` en el `<header>`).
- [ ] Añadir foto real en la sección "Über mich" (buscar `photo-placeholder`).
- [ ] Conectar el formulario de contacto a un servicio como [Formspree](https://formspree.io) (GitHub Pages solo sirve archivos estáticos).
- [ ] Crear `impressum.html` y `datenschutz.html` (legalmente obligatorios en Alemania: Impresum §5 TMG/TDDDG y política de privacidad).
- [ ] Revisar textos con el cliente (el tono de la variante 2 usa "dein/du", la variante 1 usa "Sie" — más formal).
