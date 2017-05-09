# Project 

Shows a list of IP addresses viewing the page

## Requirements

Create a single-page web app that:

1. **Shows the list of IP addresses currently viewing the app**
2. **When a new user opens the app, dynamically adds their IP address to the list of IPs**
3. **When a user closes the app, dynamically removes their IP address from the list of IPs**

### Getting Started
1. `npm install -g create-react-app`
2. `git clone https://github.com/sohamdodia/recruitment.git sohamdodia`
3. `cd sohamdodia/frontend`
4. `npm install`
5. `npm run build`
6. `cp -r build ../backend/public`
7. `cd ../backend`
8. `npm install`
9. `node server/server.js`
10. Open `http://localhost:3001`

### [Demo](https://sohamdodia-ipsapp.herokuapp.com/)

### Note
- If you test on Heroku then this will happen :
- Your requests are proxied via Heroku's Load Balancers, so the IPs you see belong to Heroku's load balancers and not your computer.This may present a case where two tabs from the same computer to my demo link may have different IPs.
- However the application would work as expected on a local network without any load balancers.

