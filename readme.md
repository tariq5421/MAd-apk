🎓 Shaheen Science Academy

A comprehensive full-stack academy management app built with Node.js, Express, MongoDB, and React Native (Expo) with React Navigation.
Students can browse courses, filter by subject, view instructor details, and discover courses with the "Surprise Me" feature.

🚀 Features

📱 **5-Screen Navigation System**
- **Home Screen**: Dashboard with statistics, featured course, and quick actions
- **Courses Screen**: Browse all courses with "Surprise Me" feature
- **Subjects Screen**: Filter and browse courses by subject
- **Instructors Screen**: View courses by instructor
- **About Screen**: Academy information, mission, and contact details

📚 **Course Management**
- Browse all available courses
- Filter courses by subject (Mathematics, Physics, Chemistry, Biology)
- View course details including instructor, duration, schedule, and fees
- Level-based course classification (Beginner, Intermediate, Advanced)
- Color-coded level badges for easy identification

👨‍🏫 **Instructor Information**
- View instructor names for each course
- Filter courses by instructor
- Browse all courses taught by a specific instructor

🎲 **Discovery Features**
- "Surprise Me" button to get a random course recommendation
- Subject-based filtering with quick access buttons
- Featured course highlighting

💼 **Course Details**
- Course name and subject
- Instructor information
- Duration and schedule
- Course level (Beginner/Intermediate/Advanced)
- Fee information
- Availability status
- Course descriptions

🛠️ Tech Stack

**Frontend:**
- React Native (Expo)
- React Navigation (Bottom Tabs)
- React Native Safe Area Context
- React Native Screens

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)
- CORS enabled

⚙️ Setup

1. Backend
```bash
cd backend
npm install
# Create .env file with your MongoDB Atlas URI
# MONGODB_URI=your_mongodb_connection_string
npm run seed      # Insert sample course data
npm start         # Run server on port 3000
```

2. Frontend
```bash
cd frontend
npm install
# React Navigation dependencies are included in package.json
npm start
```

📱 Configuration

Update BASE_URL in `frontend/screens/*.js` files (HomeScreen.js, CoursesScreen.js, etc.):
- For web: `http://localhost:3000`
- For Android emulator: `http://10.0.2.2:3000`
- For physical device: Use your PC's IP (e.g. `http://192.168.x.x:3000`)

**Note:** All screen components use the same BASE_URL constant. Update it in each screen file if needed, or consider using environment variables.

📦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/random` | Get one random available course |
| GET | `/courses/subject/:subject` | Get courses filtered by subject |
| GET | `/courses/instructor/:instructor` | Get courses filtered by instructor |
| GET | `/subjects` | Get list of all unique subjects |

🧩 Example Course Data

| Course Name | Subject | Instructor | Level | Fee | Available |
|------------|---------|------------|-------|-----|-----------|
| Calculus Fundamentals | Mathematics | Dr. Ahmed Khan | Intermediate | Rs. 5,000 | ✅ |
| Quantum Physics | Physics | Prof. Sarah Ali | Advanced | Rs. 8,000 | ✅ |
| Organic Chemistry | Chemistry | Dr. Muhammad Hassan | Intermediate | Rs. 6,000 | ✅ |
| Biology Basics | Biology | Dr. Fatima Sheikh | Beginner | Rs. 4,500 | ✅ |
| Linear Algebra | Mathematics | Dr. Ahmed Khan | Intermediate | Rs. 5,500 | ✅ |
| Thermodynamics | Physics | Prof. Sarah Ali | Intermediate | Rs. 6,500 | ✅ |
| Inorganic Chemistry | Chemistry | Dr. Muhammad Hassan | Beginner | Rs. 5,000 | ✅ |
| Advanced Biology | Biology | Dr. Fatima Sheikh | Advanced | Rs. 7,500 | ❌ |

🎨 UI Features

- **Modern Design**: Clean interface with academy-themed blue color scheme (#1e40af)
- **Bottom Tab Navigation**: Easy access to all 5 screens with emoji icons
- **Animated Course Cards**: Smooth fade-in animations for course listings
- **Subject Filter Buttons**: Horizontal scrollable filter buttons
- **Level Badges**: Color-coded badges (Blue for Beginner, Yellow for Intermediate, Red for Advanced)
- **Featured Course Highlight**: Special highlighting for random course selections
- **Statistics Dashboard**: Quick stats on Home screen (courses, subjects, instructors count)
- **Responsive Design**: Works on all screen sizes (web, iOS, Android)

📞 Contact Information

**Shaheen Science Academy**
- **Phone**: 03115524336
- **Address**: Punjgran street no 1, Alipur, Islamabad
- **Email**: info@shaheenscience.edu.pk
- **Website**: www.shaheenscience.edu.pk

🖥️ Screen Structure

```
frontend/
├── App.js                 # Main navigation setup with bottom tabs
├── screens/
│   ├── HomeScreen.js      # Dashboard with stats and featured course
│   ├── CoursesScreen.js   # Browse all courses
│   ├── SubjectsScreen.js # Filter by subject
│   ├── InstructorsScreen.js # Filter by instructor
│   └── AboutScreen.js     # Academy information and contact
└── ...
```

🧑‍💻 Author

Developed for the Midterm Project — Shaheen Science Academy Management System.

**Future Enhancements:**
- Student enrollment system
- Assignment management
- Grade tracking
- Attendance system
- Payment integration
- Push notifications