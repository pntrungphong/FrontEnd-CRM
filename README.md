# Harmonia frontend

Make the CRM for GEEKs

## Environment Prepare

- Node v12
- Npm

Install `node_modules`:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Build project

```bash
npm run build
```

# Tech
## Tech stacks
- `React@latest` View Library
- `Antd design v4` UI component
- `Umijs + DVA` State management
- `Momentjs, momentz` Time library
- `Node 12 & npm` Runtime & package management
- `ESlint` Code convention
- `SASS` CSS preprocessor

## Architecture

- `config` Webpack config
- `mock` Mock data
- `public` Public assets
- `src`
    - `assets` Dynamic assets
    - `components` Shared component use across app
    - `e2e` End to tend testing
    - `layout` Layout component
    - `locales` Store locale data
    - `models` State management based on model
    - `pages` Route-Page level component
    - `service` How we interactive with API
    - `util` shared common function across app
- `test` Unit test setup

## Coding convention
### How to make style scoped to component?
Eg component
```scss
.componentExample {
    :global {
        .just-normal-class {
            color: red;
        }

        .example-2 {
            color: yellow;
        }
    }
}
```

```jsx
import styles from './styles.scss';

export default (props) => {
    return (
        <div className={styles.componentExample}>
            <div className="just-normal-class">
                Example text, I will be in red!
            </div>
        </div>
    )
}