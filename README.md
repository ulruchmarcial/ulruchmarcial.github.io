# &lt;UMN/&gt; — Portfolio d'Ulruch Marcial Ngomen

Site portfolio personnel hébergé sur GitHub Pages : **[ulruchmarcial.github.io](https://ulruchmarcial.github.io)**

Ingénieur systèmes embarqués & IA — B.ing. Génie Informatique · UQTR · Trois-Rivières, QC

---

## Aperçu

Portfolio 100 % statique (HTML · CSS · JavaScript vanilla) sans dépendance externe ni framework. Design inspiré des interfaces de développeur : thème sombre/clair, bloc de code décoratif, terminal bash animé et effet de frappe.

## Sections

| # | Section | Contenu |
|---|---------|---------|
| 01 | À propos | Parcours, double formation, international |
| 02 | Formation | Timeline UQTR · Bamenda · Douala |
| 03 | Compétences | 9 domaines avec barres de niveau animées |
| 04 | Projets | 12 projets académiques UQTR avec filtres par catégorie |
| 05 | Expérience | Bourse BRPC/CRSNG · DAK Services · Transval |
| 06 | Contact | Formulaire Formsubmit + liens directs |

## Stack technique

- **HTML5** — sémantique, accessible (ARIA), SEO optimisé
- **CSS3** — variables CSS, grid, animations, responsive (mobile-first)
- **JavaScript vanilla** — IntersectionObserver, typing effect, filtres projets, thème persisté via localStorage
- **Formsubmit** — envoi de formulaire sans back-end
- **Google Fonts** — Space Mono + Syne

## Fonctionnalités

- Mode sombre / clair persisté entre les visites
- Navigation responsive avec menu hamburger
- Animations au scroll (IntersectionObserver)
- Effet de frappe animé dans le hero
- Filtrage des projets par catégorie (Embarqué, IA/ML, Réseau, OS/Linux)
- Cercle lumineux qui suit le curseur (desktop uniquement)
- Formulaire de contact fonctionnel

## Structure

```
ulruchmarcial.github.io/
├── index.html       # Structure et contenu
├── style.css        # Styles, thème, responsive
├── script.js        # Comportements interactifs
├── favicon.svg      # Icône du site
├── CHANGELOG.md     # Historique des versions
└── README.md        # Ce fichier
```

## Lancer localement

Aucune dépendance. Ouvrir directement dans le navigateur :

```bash
# Option 1 — Fichier local
open index.html

# Option 2 — Serveur local (évite les restrictions CORS)
python3 -m http.server 8000
# Puis visiter http://localhost:8000
```

## Déploiement

Le site est déployé automatiquement via **GitHub Pages** à chaque `git push` sur la branche `main`.

## Contact

- Email : [Ulruch.Marcial.Ngomen@uqtr.ca](mailto:Ulruch.Marcial.Ngomen@uqtr.ca)
- LinkedIn : [linkedin.com/in/ulruch-marcial-ngomen-a6b33931a](https://www.linkedin.com/in/ulruch-marcial-ngomen-a6b33931a)
- GitHub : [github.com/ulruchmarcial](https://github.com/ulruchmarcial)

## Licence

Code source sous licence [MIT](LICENSE) — © 2025 Ulruch Marcial Ngomen
