# Room Search

> When looking for an apartment, I want to keep track of all the interesting ones, including their details such as price and number of rooms, and show them on a map.
>
> The list is kept in Google Sheets and with Google My Maps it can be visualized.
>
> The code generates links for one, two and three stars. I add all of them to my bookmarks toolbar. Then I start looking for properties (currently only the immoweb website is supported). When I find one that I want to keep, I rate it by clicking on one of the bookmarks. It runs a little JS on the current page (i.e. the immoweb page) to grab its url and send it to the API endpoint. When NextJS handles the API call, the site is queried again, interesting info is extracted and stored it in the sheet.

## Generate Google Sheets Credentials
1. Go to https://console.cloud.google.com
2. Create or select a project
3. Go to IAM & Admin > Service Accounts
4. Create a new service account
   - no need to configure any permissions
5. Download the `secrets.json` file and add it to the root of this repository. NEVER COMMIT THIS FILE!

## Development
Create a copy of `example.env.local` and rename it to `.env.local`.

The most important environment variables are explained here:
- `NEXT_PUBLIC_BASE_URL`: the bookmarklets will use this URL to submit data.
- `NEXT_PUBLIC_SHEET_ID`: the ID of the Google Sheet to which the data should be written. It's the AAA part in this url: `https://docs.google.com/spreadsheets/d/AAA/edit#gid=BBB`
- `NEXT_PUBLIC_SHEET_GID`: the GID of the Google Sheet to which the data should be written. It's the BBB part in the url above.
- `SHEET_TAB_NAME`: the name of the tab in which the app is allowed to write.
- `GOOGLE_APPLICATION_CREDENTIALS`: the path to the JSON file with the Google credentials.
- `API_USERS_BASE64`: a base64 encoded string containing the users (and their secrets) that can write data. Use the `/users` page to generate this string.
- `NEXT_PUBLIC_MAP_ID`: the ID of the Google My Maps that visualizes the Google Sheet.

Don't forget to add the `secrets.json` file (see above).

When everything is set up, run `npm run dev` to start the development server.

## Deploy to Netlify or Vercel
In addition to all the environment variables from `.example.env.local`, you need to add `GOOGLE_APPLICATION_CREDENTIALS_BASE64` to their dashboard.

You should set the value to the result of `cat secrets.json | base64`. This way the `prebuild` script in `package.json` can reconstruct the `secrets.json` file for the functions.
