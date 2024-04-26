# React + Vite
🎯 Create state variables to store the current number of cookies and the cookies PerSecond value (useState) replace cookies with lemons

🎯 Set up a timer to increment the number of cookies by the cookiesPerSecond value (useEffect). Be sure to handle clearing the timer using the useEffect return value. names are correct and match states

🎯 Set up an array of objects containing the items available for purchase in the store, their cost and their increment increase value. Map through these and create buttons for each. - different component, make an array, inside array, objects and upgrades (cost connects to actual amount of lemons, increase value per second connects to LPS) then import into app(use map to display on page) 

🎯 Create a function to handle the purchase of an item. This should check if the user has enough cookies to purchase the item, and if so, subtract the cost of the item from the number of cookies and add the increment value to the cookiesPerSecond value. creat function that checks PSObjects to see if upgrade can be brought, take the cost off the amount of things then increment the things per second

You can load saved values from localStorage as the default value passed to the useState hook

The useEffect dependency array can be used to trigger a function to save the values to localStorage every time they change

