# smart-CRM

```markdown

## Project Overview
Ye project ek Mini CRM Platform hai jisme customer segmentation, personalized campaign delivery aur intelligent insights banaye gaye hain.  
Isme secure REST APIs, simple campaign creation UI aur Google OAuth authentication use hua hai.

## Architecture Diagram
```

Frontend (React/Vue) <---> Backend (Node.js/Express) <---> Database (MongoDB/SQL)
|
v
Message Broker (Kafka/RabbitMQ)

````

## Local Setup Instructions

1. Repo clone karo:  
```bash
git clone <your-repo-url>
cd project4
````

2. Backend setup:

```bash
cd backend
npm install
npm start
```

3. Frontend setup:

```bash
cd ../frontend
npm install
npm run dev
```

4. API testing ke liye Postman ya Swagger UI use karo.

5. Google OAuth ke liye credentials backend me configure karo.

## Technologies & Tools Used

* Backend: Node.js, Express.js
* Frontend: React.js / Vue.js
* Authentication: Google OAuth 2.0
* Database: MongoDB / SQL
* Message Broker (optional): Kafka / RabbitMQ / Redis Streams
* API Testing: Postman, Swagger UI
* Audience segmentation ke liye dynamic rule builder

## Known Limitations / Assumptions

* Pub-sub architecture optional hai, synchronous bhi chal sakta hai.
* Frontend UI basic hai, advanced UX optional.
* Google OAuth credentials manually set karne padte hain.
* Authentication sirf Google OAuth se hai.
* Audience size preview approximate hai.
* Campaign delivery stats simulated hain, actual messaging nahi hua.

---

Thank you!

```
