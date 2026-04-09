# DonateHub API - Complete Data Fetching Guide

## Backend Status: ✅ RUNNING
- **URL**: http://localhost:8080/api
- **Database**: MySQL (donatehub_db)
- **Server**: Tomcat on port 8080

---

## API Endpoints Reference

### 1. **Health Check** (Public - No Auth Required)
```
GET http://localhost:8080/api/health
```
**Response:**
```json
{
  "status": "UP",
  "service": "DonateHub API",
  "version": "1.0.0"
}
```

---

### 2. **Register New User** (Public - No Auth Required)
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test@1234",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "test@example.com",
  "username": "testuser",
  "firstName": "John",
  "lastName": "Doe",
  "role": "DONOR"
}
```

**Save the `token` for next requests!**

---

### 3. **Login Existing User** (Public - No Auth Required)
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@1234"
}
```

**Response:** (Same format as register)

---

### 4. **Create Donation** (Requires Bearer Token)
```
POST http://localhost:8080/api/donations
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json

{
  "type": "FOOD",
  "description": "Rice bags",
  "riceQuantity": 50,
  "vegetableQuantity": 0,
  "targetAgeGroup": "All Ages"
}
```

**For CLOTHING donations:**
```json
{
  "type": "CLOTHING",
  "description": "Winter clothes",
  "clothingQuantity": 100,
  "targetAgeGroup": "Children"
}
```

**For MONEY donations:**
```json
{
  "type": "MONEY",
  "description": "Charity fund",
  "amount": 500.00
}
```

---

### 5. **Get All Donations** (Requires Bearer Token)
```
GET http://localhost:8080/api/donations
Authorization: Bearer {YOUR_TOKEN}
```

**Response:** Array of donations with all details

---

### 6. **Get Single Donation** (Requires Bearer Token)
```
GET http://localhost:8080/api/donations/{id}
Authorization: Bearer {YOUR_TOKEN}
```

---

## How to Use with Postman

1. **Register User**
   - Method: POST
   - URL: `http://localhost:8080/api/auth/register`
   - Body > raw > JSON:
   ```json
   {
     "username": "testuser",
     "email": "test@donation.com",
     "password": "Test@123456",
     "firstName": "Test",
     "lastName": "User"
   }
   ```

2. **Copy the token** from response

3. **Fetch Donations**
   - Method: GET
   - URL: `http://localhost:8080/api/donations`
   - Headers tab > Add:
     - Key: `Authorization`
     - Value: `Bearer {paste_your_token}`

4. **Create Donation**
   - Method: POST
   - URL: `http://localhost:8080/api/donations`
   - Headers: Add Authorization header
   - Body > raw > JSON:
   ```json
   {
     "type": "FOOD",
     "description": "Rice donations",
     "riceQuantity": 100,
     "vegetableQuantity": 50,
     "targetAgeGroup": "All"
   }
   ```

---

## Database Tables Created

### Users Table
```
id | email | username | password | firstName | lastName | role | active | created_at | updated_at
```

### Donations Table
```
id | user_id | type | status | description | amount | rice_quantity | vegetable_quantity | clothing_quantity | transaction_id | approved_at | created_at | updated_at
```

---

## Troubleshooting

### ❌ "Connection refused" at :8080
→ Backend not running. Start with:
```
cd "d:\donation app\donation-backend"
mvn spring-boot:run
```

### ❌ "User not found with email"
→ You need to register first. POST to `/auth/register`

### ❌ "Invalid credentials"
→ Email/password mismatch. Check your registration details.

### ❌ "No credentials provided"
→ Add `Authorization: Bearer {token}` header to your request

### ❌ Data not appearing in MySQL
→ Check MySQL is running: `Get-Service | Where-Object {$_.Name -like "*mysql*"}`

---

## Test the Complete Flow

### Step 1: Health Check
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/health" -Method GET
```

### Step 2: Register
```powershell
$body = @{
  username = "donor1"
  email = "donor1@test.com"
  password = "DonorPass123"
  firstName = "Jane"
  lastName = "Smith"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -Body $body -ContentType "application/json"
$token = ($response.Content | ConvertFrom-Json).token
```

### Step 3: Fetch Donations
```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-WebRequest -Uri "http://localhost:8080/api/donations" -Headers $headers
```

---

**Your API is ready to fetch data from MySQL!** 🚀
