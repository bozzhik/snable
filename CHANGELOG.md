# CHANGELOG

## 0.1.10

### Patch Changes

- 38fc462: integrate `/api/session` request for `activeTab` tracking
- 0af03e2: update `PRIVACY_POLICY` due to `tracking` changes

## 0.1.9

### Patch Changes

- 0b81cfa: integrate `Sonner` into `Header` Global component
- 892a4ae: init `Sonner` UI component using `shadcn/ui`

## 0.1.8

### Patch Changes

- 279f30c: refactor `ImagesUnit` details block
- 29a14c2: remodel `Header` Global component
- 6d4c3ec: init `NotFound` UI component
- df22a41: edit `size` of `Container` Global component

## 0.1.7

### Patch Changes

- 72ddeb6: add `hasFavorites` method for `favouritesManager`
- 4c9d86c: add `onRemove` prop for `TabData` in `favorites` view
- 427ddb4: add `view` prop for `TabData` Header sub-component
- 048502e: upgrade `ExpandButton` UI sub-component
- 4a05cbf: init `/favorites` popup page
- f130a13: init `Dropdown` UI component based on `shadcn/ui`
- 57390e6: decompose `Header` into `Logo` and `TabInfo` components

## 0.1.6

### Patch Changes

- a1d1e7d: init `favouritesManager` file for `Header` Global component
- de0a05a: init `favorites` button in `Header` Global component

## 0.1.5

### Patch Changes

- 71ab634: upgrade `Header` Global component

## 0.1.4

### Patch Changes

- b68cdfc: init `imagesExtractor` and `ImagesUnit` for its data
- 5b3ba4b: init `Gallery` images block
- 411e427: init `ExpandButton` UI sub-component (Button)
- 62ebe72: init `ImageCell` UI component
- 050170f: init `/images` popup sub-page

## 0.1.3

### Patch Changes

- 3fc58c2: make `Controls` colors block
- cf354d4: init `useCopy` custom hook
- 22bf9f0: disable `scrollbar` in extension interface
- 159f4f6: init `ColorCell` UI component
- 040cf5e: init `Palette` colors block
- 88ec5b9: init `/colors` popup sub-page

## 0.1.2

### Patch Changes

- 02b36c7: enhance `Button` with `wouter` routing
- 0706705: configure `routing` using `wouter`

## 0.1.1

### Patch Changes

- b8efa2a: fix `zip` gulp script due changed `manifest`

## 0.1.0

### Minor Changes

- e1b8856: add custom `icons` for extension
- e1b8856: update extension `details` for alpha release

## 0.0.7

### Patch Changes

- 107fa3b: init `Typography` UI component (dynamic)
- f2247e6: add `isContrasted` param to `colorExtractor` content script
- 95f2dcd: add `bullshitFonts` handling to `fontsExtractor` content script

## 0.0.6

### Patch Changes

- ec173f9: pass `GET_TAB_INFO` data into `Header` Global component
- d9eb5ec: init `getTabInfo` background worker for parsing `activeTab` data

## 0.0.5

### Patch Changes

- e1b3ade: refactor `fontsExtractor` and `FontsUnit` popup block
- e1b3ade: enhance `ColorsUnit` module with `tooltip` and `copy` action

## 0.0.4

### Patch Changes

- 44e4d2f: optimize `Popup` state handling of `Units`
- e8a0354: init `colorsExtractor` and `ColorsUnit` for its data
- bb57dc5: integrate `fonts` data into `FontsUnit` popup block
- 914d80b: init `fontsExtractor` for parsing font data
- 2f1d6c8: init `FontsUnit` popup block
- 64f6b7f: init `Unit` UI component

## 0.0.3

### Patch Changes

- 4205568: init `Header` Global component
- f07b83c: init `Container` Global component
- 50cf64c: init `Layout` Global component
- 11be4c6: init `Button` UI component

## 0.0.2

### Patch Changes

- init `views` and `modules` project divisions

## 0.0.1

### Patch Changes

- project configuration completed: CI/CD, Tailwind, Vite & TS setup

## 0.0.0

- init `extension` project using `create-chrome-ext`
