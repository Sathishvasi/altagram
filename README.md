## Changing base url

To change the base url before deployment, replace the following entries with the new base url:<br />

- `homepage` entry in `package.json`<br />

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


## Deployment

To produce a new release, you can tag a commit like release/VERSION and then push it. The version must be semver compatible, like 0.1.2, as in https://www.npmjs.com/package/semver

It will be deployed to http://161.35.216.84/mt-frontend/VERSION
