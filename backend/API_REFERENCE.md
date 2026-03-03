# 🎯 Complete API Request Reference - Vehicle Care Project

**Server:** `http://localhost:8000`  
**Base Path:** `/api/v1`

---

## 📝 All 26 API Endpoints

### 🔵 USER ROUTES (7 endpoints)

#### **1. Register User**
```
URL: http://localhost:8000/api/v1/users/register
TYPE: POST
AUTH: No authentication required
CONTENT-TYPE: multipart/form-data

DATA NEEDED:
✅ name (text) - "Vasanth Kumar"
✅ email (text) - "vasanth@example.com" 
✅ password (text) - "Pass@1234"
✅ userName (text) - "vasanth01"
✅ phone (text) - "9999999999"
❌ address (text) - "Hyderabad" (optional)
✅ profileImage (file) - image.jpg

EXAMPLE (Postman FormData):
name: Vasanth Kumar
email: vasanth@example.com
password: Pass@1234
userName: vasanth01
phone: 9999999999
address: Hyderabad
profileImage: [Select File]
```

#### **2. Login User**
```
URL: http://localhost:8000/api/v1/users/login
TYPE: POST
AUTH: No authentication required
CONTENT-TYPE: application/json

DATA NEEDED (JSON):
✅ email (string)
✅ password (string)

EXAMPLE BODY:
{
  "email": "vasanth@example.com",
  "password": "Pass@1234"
}

RESPONSE: Returns user data + sets "accesstoken" cookie
```

#### **3. Logout User**
```
URL: http://localhost:8000/api/v1/users/logout
TYPE: GET
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

DATA NEEDED: None
Just send request with authentication cookie

RESULT: Clears the accesstoken cookie
```

#### **4. Get Current User**
```
URL: http://localhost:8000/api/v1/users/userDetails
TYPE: GET
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

DATA NEEDED: None
Just send request with authentication cookie

RETURNS: Current logged-in user's complete details
```

#### **5. Update Profile Image**
```
URL: http://localhost:8000/api/v1/users/profileImage
TYPE: PATCH
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: multipart/form-data

DATA NEEDED:
✅ profileImage (file) - new-profile.jpg

EXAMPLE:
profileImage: [Select New Image File]
```

#### **6. Change Password**
```
URL: http://localhost:8000/api/v1/users/updatePassword
TYPE: PATCH
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

DATA NEEDED (JSON):
✅ oldPassword (string)
✅ newPassword (string)

EXAMPLE BODY:
{
  "oldPassword": "Pass@1234",
  "newPassword": "NewPassword@5678"
}
```

#### **7. Update Account Details**
```
URL: http://localhost:8000/api/v1/users/updateAccount
TYPE: PATCH
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

DATA NEEDED (JSON) - All 3 required:
✅ name (string)
✅ email (string)
✅ phone (string)

EXAMPLE BODY:
{
  "name": "Vasanth M",
  "email": "vasanth.new@example.com",
  "phone": "8888888888"
}
```

---

### 🔵 CAR ROUTES (3 endpoints)

#### **8. Register Car**
```
URL: http://localhost:8000/api/v1/cars/register
TYPE: POST
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

DATA NEEDED (JSON):
✅ brand (string) - Car manufacturer
✅ model (string) - Car model
✅ licenseNo (string) - License plate (auto-converted to uppercase)

EXAMPLE BODY:
{
  "brand": "Toyota",
  "model": "Innova Crysta",
  "licenseNo": "TS09AB1234"
}

RESULT: Car registered with current user as owner
```

#### **9. Update Car**
```
URL: http://localhost:8000/api/v1/cars/update/:carId
TYPE: PATCH
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:carId - Replace with actual MongoDB ID (e.g., "65f0a1b2c3d4e5f678901234")

DATA NEEDED (JSON) - At least 1 required:
❌ brand (string) - optional
❌ model (string) - optional
❌ licenseNo (string) - optional

EXAMPLE URL:
http://localhost:8000/api/v1/cars/update/65f0a1b2c3d4e5f678901234

EXAMPLE BODY:
{
  "model": "Innova Hycross",
  "licenseNo": "TS09XY9876"
}

ACCESS: Only car owner OR admin can update
```

#### **10. Delete Car**
```
URL: http://localhost:8000/api/v1/cars/remove/:carId
TYPE: DELETE
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:carId - Replace with actual MongoDB ID

DATA NEEDED: None

EXAMPLE URL:
http://localhost:8000/api/v1/cars/remove/65f0a1b2c3d4e5f678901234

ACCESS: Only car owner OR admin can delete
```

---

### 🔵 SERVICE ROUTES (4 endpoints)

#### **11. Add Service**
```
URL: http://localhost:8000/api/v1/services/addService
TYPE: POST
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

DATA NEEDED (JSON):
✅ serviceType (string) - Name of service
✅ serviceCharge (number) - Price in rupees

EXAMPLE BODY:
{
  "serviceType": "Oil Change",
  "serviceCharge": 500
}

RESTRICTION: Only users with role "admin" can add services
```

#### **12. Get All Services**
```
URL: http://localhost:8000/api/v1/services/allService
TYPE: GET
AUTH: Required (cookie: accesstoken)
CONTENT-TYPE: application/json

DATA NEEDED: None

RETURNS: Array of all available services
```

#### **13. Update Service Charge**
```
URL: http://localhost:8000/api/v1/services/update/:serviceId
TYPE: PATCH
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:serviceId - Replace with actual service MongoDB ID

DATA NEEDED (JSON):
✅ serviceCharge (number) - New price

EXAMPLE URL:
http://localhost:8000/api/v1/services/update/65f0a1b2c3d4e5f678901111

EXAMPLE BODY:
{
  "serviceCharge": 650
}

RESTRICTION: Admin only
```

#### **14. Delete Service**
```
URL: http://localhost:8000/api/v1/services/remove/:serviceId
TYPE: DELETE
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:serviceId - Replace with actual service MongoDB ID

DATA NEEDED: None

EXAMPLE URL:
http://localhost:8000/api/v1/services/remove/65f0a1b2c3d4e5f678901111

RESTRICTION: Admin only
```

---

### 🔵 MECHANIC ROUTES (5 endpoints)

#### **15. Add Mechanic**
```
URL: http://localhost:8000/api/v1/mechanic/addMechanic
TYPE: POST
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: multipart/form-data

DATA NEEDED:
✅ name (text) - "Ravi Kumar"
✅ experience (number) - 5
✅ contact (text) - "9876543210" (must be unique)
✅ profileImage (file) - mechanic.jpg

EXAMPLE (Postman FormData):
name: Ravi Kumar
experience: 5
contact: 9876543210
profileImage: [Select File]

RESTRICTION: Admin only
```

#### **16. Get All Mechanics**
```
URL: http://localhost:8000/api/v1/mechanic/allMechanic
TYPE: GET
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

DATA NEEDED: None

RETURNS: Array of all mechanics
RESTRICTION: Admin only
```

#### **17. Update Mechanic Details**
```
URL: http://localhost:8000/api/v1/mechanic/update/:mechanicId
TYPE: POST
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:mechanicId - Replace with actual mechanic MongoDB ID

DATA NEEDED (JSON) - At least 1 required:
❌ name (string) - optional
❌ experience (number) - optional
❌ contact (string) - optional

EXAMPLE URL:
http://localhost:8000/api/v1/mechanic/update/65f0a1b2c3d4e5f678902222

EXAMPLE BODY:
{
  "experience": 6,
  "name": "Ravi Kumar R"
}

RESTRICTION: Admin only
```

#### **18. Update Mechanic Image**
```
URL: http://localhost:8000/api/v1/mechanic/updateImage/:mechanicId
TYPE: PATCH
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: multipart/form-data

ROUTE PARAMETER:
:mechanicId - Replace with actual mechanic MongoDB ID

DATA NEEDED:
✅ profileImage (file) - new-mechanic-photo.jpg

EXAMPLE URL:
http://localhost:8000/api/v1/mechanic/updateImage/65f0a1b2c3d4e5f678902222

EXAMPLE:
profileImage: [Select New File]

RESTRICTION: Admin only
```

#### **19. Delete Mechanic**
```
URL: http://localhost:8000/api/v1/mechanic/remove/:mechanicId
TYPE: DELETE
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:mechanicId - Replace with actual mechanic MongoDB ID

DATA NEEDED: None

EXAMPLE URL:
http://localhost:8000/api/v1/mechanic/remove/65f0a1b2c3d4e5f678902222

RESTRICTION: Admin only
```

---

### 🔵 INVENTORY ROUTES (6 endpoints)

#### **20. Add Product**
```
URL: http://localhost:8000/api/v1/inventory/addProduct
TYPE: POST
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

DATA NEEDED (JSON):
✅ productName (string) - Name of product
✅ productNo (string) - Unique product number/SKU
✅ type (string) - Category/Type
✅ price (number) - Price per unit
✅ quantity (number) - Initial stock quantity

EXAMPLE BODY:
{
  "productName": "Engine Oil 5W30",
  "productNo": "EO-001",
  "type": "Lubricant",
  "price": 350,
  "quantity": 100
}

RESTRICTION: Admin only
```

#### **21. Get All Products**
```
URL: http://localhost:8000/api/v1/inventory/allProduct
TYPE: GET
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

DATA NEEDED: None

RETURNS: Array of all inventory products
RESTRICTION: Admin only
```

#### **22. Update Product Details**
```
URL: http://localhost:8000/api/v1/inventory/updateProduct/:productId
TYPE: PATCH
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:productId - Replace with actual product MongoDB ID

DATA NEEDED (JSON) - At least 1 required:
❌ productName (string) - optional
❌ productNo (string) - optional
❌ type (string) - optional
❌ price (number) - optional

EXAMPLE URL:
http://localhost:8000/api/v1/inventory/updateProduct/65f0a1b2c3d4e5f678903333

EXAMPLE BODY:
{
  "price": 400,
  "type": "Premium Lubricant"
}

RESTRICTION: Admin only
```

#### **23. Increase Product Quantity**
```
URL: http://localhost:8000/api/v1/inventory/incproduct/:productId
TYPE: PATCH
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:productId - Replace with actual product MongoDB ID

DATA NEEDED (JSON):
✅ quantity (number) - Amount to ADD (must be > 0)

EXAMPLE URL:
http://localhost:8000/api/v1/inventory/incproduct/65f0a1b2c3d4e5f678903333

EXAMPLE BODY:
{
  "quantity": 50
}

LOGIC: Current stock + quantity = New stock
Example: 100 + 50 = 150

RESTRICTION: Admin only
```

#### **24. Decrease Product Quantity**
```
URL: http://localhost:8000/api/v1/inventory/decproduct/:productId
TYPE: PATCH
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:productId - Replace with actual product MongoDB ID

DATA NEEDED (JSON):
✅ quantity (number) - Amount to SUBTRACT (must be > 0)

EXAMPLE URL:
http://localhost:8000/api/v1/inventory/decproduct/65f0a1b2c3d4e5f678903333

EXAMPLE BODY:
{
  "quantity": 20
}

LOGIC: Current stock - quantity = New stock
Example: 150 - 20 = 130
ERROR: If quantity > current stock, request fails

RESTRICTION: Admin only
```

#### **25. Delete Product**
```
URL: http://localhost:8000/api/v1/inventory/deleteProduct/:productId
TYPE: DELETE
AUTH: Required (cookie: accesstoken) - ADMIN ONLY
CONTENT-TYPE: application/json

ROUTE PARAMETER:
:productId - Replace with actual product MongoDB ID

DATA NEEDED: None

EXAMPLE URL:
http://localhost:8000/api/v1/inventory/deleteProduct/65f0a1b2c3d4e5f678903333

RESTRICTION: Admin only
```

---

## 📊 Quick Reference Table

| # | Endpoint | Method | Auth | Admin? | Form Data? |
|---|----------|--------|------|--------|------------|
| 1 | /users/register | POST | ❌ | ❌ | ✅ Yes |
| 2 | /users/login | POST | ❌ | ❌ | ❌ JSON |
| 3 | /users/logout | GET | ✅ | ❌ | - |
| 4 | /users/userDetails | GET | ✅ | ❌ | - |
| 5 | /users/profileImage | PATCH | ✅ | ❌ | ✅ Yes |
| 6 | /users/updatePassword | PATCH | ✅ | ❌ | ❌ JSON |
| 7 | /users/updateAccount | PATCH | ✅ | ❌ | ❌ JSON |
| 8 | /cars/register | POST | ✅ | ❌ | ❌ JSON |
| 9 | /cars/update/:carId | PATCH | ✅ | ❌ | ❌ JSON |
| 10 | /cars/remove/:carId | DELETE | ✅ | ❌ | - |
| 11 | /services/addService | POST | ✅ | ✅ | ❌ JSON |
| 12 | /services/allService | GET | ✅ | ❌ | - |
| 13 | /services/update/:serviceId | PATCH | ✅ | ✅ | ❌ JSON |
| 14 | /services/remove/:serviceId | DELETE | ✅ | ✅ | - |
| 15 | /mechanic/addMechanic | POST | ✅ | ✅ | ✅ Yes |
| 16 | /mechanic/allMechanic | GET | ✅ | ✅ | - |
| 17 | /mechanic/update/:mechanicId | POST | ✅ | ✅ | ❌ JSON |
| 18 | /mechanic/updateImage/:mechanicId | PATCH | ✅ | ✅ | ✅ Yes |
| 19 | /mechanic/remove/:mechanicId | DELETE | ✅ | ✅ | - |
| 20 | /inventory/addProduct | POST | ✅ | ✅ | ❌ JSON |
| 21 | /inventory/allProduct | GET | ✅ | ✅ | - |
| 22 | /inventory/updateProduct/:productId | PATCH | ✅ | ✅ | ❌ JSON |
| 23 | /inventory/incproduct/:productId | PATCH | ✅ | ✅ | ❌ JSON |
| 24 | /inventory/decproduct/:productId | PATCH | ✅ | ✅ | ❌ JSON |
| 25 | /inventory/deleteProduct/:productId | DELETE | ✅ | ✅ | - |

---

## 🔑 Important Notes

**Authentication Flow:**
1. First call `/users/register` to create account
2. Then call `/users/login` - this sets a cookie named `accesstoken`
3. All protected endpoints need this cookie in the request
4. Admin endpoints also check if `user.role === "admin"`

**Content-Type Usage:**
- `application/json` - For regular data (use JSON body)
- `multipart/form-data` - For file uploads (use form-data in Postman)

**Response Format (all endpoints):**
```json
{
  "statusCode": 200,
  "data": { /* your data here */ },
  "message": "Success message",
  "success": true
}
```

**Error Codes:**
- `400` - Bad request / Missing fields
- `401` - Invalid credentials
- `403` - Forbidden (not admin)
- `404` - Resource not found
- `409` - Duplicate entry (conflict)
- `500` - Server error

---

## 🚀 Testing Tips

### Using Postman:
1. **For JSON requests:** Select Body → raw → JSON
2. **For file uploads:** Select Body → form-data, then select "File" type for image fields
3. **For authentication:** Enable cookies or manually add cookie header after login

### Using cURL:
```bash
# Save cookie on login
curl -X POST "http://localhost:8000/api/v1/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Pass@1234\"}" \
  -c cookies.txt

# Use cookie for protected routes
curl "http://localhost:8000/api/v1/users/userDetails" -b cookies.txt
```

---

**Generated:** February 21, 2026  
**Project:** Vehicle Care System  
**Version:** 1.0.0
