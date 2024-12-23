
### Weather App  

The Weather App is a full-stack application that provides real-time weather updates, search history tracking, and filtering options. It delivers a seamless, secure, and user-friendly experience, built using modern technologies.  

### Features  

- **Real-Time Weather Updates:** Get current weather information for any city.  
- **8-Day Forecast:** View upcoming weather trends for better planning.  
- **Search History:** Track and manage previously searched cities.  
- **Authentication System:** Secure user sign-up and login with JWT.  
- **Responsive Design:** Fully optimized for desktops, tablets, and mobiles.  

---  

### Tech Stack  

#### Frontend  
- React.js  
- Context API  
- Tailwind CSS  

#### Backend  
- Node.js  
- Express.js  
- MySQL  
- JWT Authentication  

---  

-> Installation and Setup  

>> Backend  
1. Navigate to the `backend` directory:  
   ```bash  
   cd backend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Set up your `.env` file with the following variables:  
   ```bash  
   DB_HOST=<Your MySQL Host>  
   DB_USER=<Your MySQL Username>  
   DB_PASSWORD=<Your MySQL Password>  
   DB_NAME=<Your Database Name>  
   JWT_SECRET=<Your JWT Secret>  
   WEATHER_API_KEY=<Your Weather API Key>  
   ```  
4. Initialize the database:  
   - Use the provided SQL script (`schema.sql`) to set up your database schema.  
   - Run the script in your MySQL environment:  
     ```bash  
     mysql -u <DB_USER> -p <DB_NAME> < schema.sql  
     ```  
5. Start the backend server:  
   ```bash  
   npm start  
   ```  

>> Frontend  
1. Navigate to the `frontend` directory:  
   ```bash  
   cd frontend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Set up your `.env` file with the following variable:  
   ```bash  
   REACT_APP_API_URL=<Your Backend API URL>  
   ```  
4. Start the development server:  
   ```bash  
   npm start  
   ```  

---  

###Usage  

1. Launch the app in your browser by accessing `http://localhost:3000`.  
2. Create an account or log in to access weather features.  
3. Search for cities to view current weather and forecasts.  
4. View and manage your search history for quick access.  
Happy coding! 🌦️  

