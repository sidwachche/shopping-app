DEMO #1
Design and build a Step-Flow UX pattern product checkout experience, where the following steps occur.
Steps

1. Display a list of selectable products rendered from an API [you may simulate the api loading however you want].
   a. Multi selection of products must be allowed
   b. Continue button to confirm selection
2. On “Continue” from the previous page, render a page to fetch the address
   [billing/shipping address] of the customer.
3. On “Continue” from the previous page, render a page to display the final price including
   discount.
4. On Submit,
   a. If the API call is successful, display a confirmation of the success.
   b. If the API call fails, then display an error message to illustrate.
   Points to note:
   ● You must not use multiple URL routes for the page, the entire experience should be in
   one-page
   ● It must be possible to go back and forth between any step and the previously saved data
   must be available pre-filled/selected.
   ● You may use any version of react and any library of your choosing.
   ● It will be a bonus if you provide aesthetic styling to the page.

### To start the app "yarn start"
