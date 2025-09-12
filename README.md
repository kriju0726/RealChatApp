# Real-time Chat Application

## 🚀 Way to Run the Project

1. **Start Backend**
   - Open terminal in the **main directory** and run:
     ```bash
     npm run dev
     ```
   - **Result:**
     ```
     Server is working at http://localhost:3000
     DB connected Successfully.
     ```

2. **Start Frontend**
   - Open another terminal in the **main directory**.
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Run:
     ```bash
     npm run dev
     ```
   - **Result:**
     ```
     Local:   http://localhost:5173/
     Network: use --host to expose
     ```

3. **Open Application**
   - Go to your browser and visit:
     ```
     http://localhost:5173/login
     ```

4. **Existing Users (for testing)**
   - You can log in with any of these accounts:
     - Email: `sri@gmail.com`, Password: `sri123`
     - Email: `ramu@gmail.com`, Password: `ramu1234`
     - Email: `sumit@gmail.com`, Password: `sumit12345`

5. **Multiple Users Testing**
   - Open an **Incognito Window** and repeat **Step 3 & 4**.
   - ⚠️ Note: Logged-in users must be different in each window.

6. **Register New User**
   - Visit:
     ```
     http://localhost:5173/register
     ```
   - Fill in all the details to register a **new user**, then log in with the new account.

---

✨ **Enjoy My Real-time Chat Application!**




# .env
PORT=3000
MONGODB_CONNECT=mongodb+srv://kumarkrish07022002:6A2wbfPInobR7PM0@cluster0.kztzfnj.mongodb.net/ChatApp2?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = krishkumar2907
SECURE = "development"







