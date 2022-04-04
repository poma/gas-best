# Gas price tracker [![build](https://github.com/poma/gas-tracker-ui/actions/workflows/build.yml/badge.svg)](https://github.com/poma/gas-tracker-ui/actions/workflows/build.yml)

<img width="458" alt="image" src="https://user-images.githubusercontent.com/2109710/158978962-5aab5bdd-a680-441f-877e-6078d5ceb799.png">

Ethereum gas price extension with EIP-1559 support, fast updates, price prediction, and historical fee charts.

Save your ETH by sending transactions at cheaper gas prices. Ethereum base fee fluctuates a lot, so if you are willing to wait a bit, you can save up to 50% on gas fees by catching a dip. Charts allow you to see at a glance whether the fee market is stable or gas prices surged 5x 10 minutes ago and it's wise a wait a little before submitting a transaction.

See web version at https://gas.best

- Gets latest gas prices faster than most other extensions
- Uses advanced price prediction algorithms based on historical patterns
- Charts of historic average and minimum gas prices
- Shows USD prices for common transaction types
- No user tracking or data collection
- EIP-1559 support

## Available Scripts

The app is written using React. Before building you need to initialize the project:

```bash
yarn
cp .env.example .env
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.

### `yarn build:chrome`

Builds the Chrome extension to the `build` folder.\
Load it to browser by clicking `Load unpacked` in `chrome://extensions` (you need to enable developer mode).

### `yarn build:firefox`

Builds the Firefox extension to the `build` folder.\
Load it to browser by clicking `Load Temporary Add-on` in `about:debugging#/runtime/this-firefox`.

## Deployment

Commits from `master` branch are automatically rolled out to https://stage.gas.best and from `stable` branch to https://gas.best.

The docker image can be found in [GitHub Container Registry](https://github.com/poma/gas-tracker-ui/pkgs/container/gas-tracker-ui).

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/poma"><img src="https://avatars.githubusercontent.com/u/2109710?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roman Semenov</b></sub></a><br /><a href="#backend-poma" title="Backend">💻</a> <a href="#infra-poma" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#financial-poma" title="Financial">💵</a> <a href="#design-poma" title="Design">🎨</a></td>
    <td align="center"><a href="https://oxor.io"><img src="https://avatars.githubusercontent.com/u/53340101?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oxorio</b></sub></a><br /><a href="https://github.com/poma/gas-tracker-ui/commits?author=oxor-io" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kotokrad"><img src="https://avatars.githubusercontent.com/u/3849707?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evgeniy Voichenko</b></sub></a><br /><a href="https://github.com/poma/gas-tracker-ui/commits?author=kotokrad" title="Code">💻</a></td>
    <td align="center"><a href="https://fomalhaut.su/"><img src="https://avatars.githubusercontent.com/u/6025172?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Khlebushchev</b></sub></a><br /><a href="#prediction-fomalhaut88" title="Price prediction engine">🧠</a></td>
    <td align="center"><a href="https://github.com/daria-sa"><img src="https://avatars.githubusercontent.com/u/56318841?v=4?s=100" width="100px;" alt=""/><br /><sub><b>daria-sa</b></sub></a><br /><a href="#prediction-daria-sa" title="Price prediction engine">🧠</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->