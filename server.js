const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const { authenticateToken } = require("./middleware/auth.js");

// Routers
const clientRouter = require("./router/clientRouter.js");
const familyMembeRouter = require("./router/familyMemberRouter.js");
const employeeRouter = require("./router/employeeRouter.js");
const adminRouter = require("./router/adminRouter.js");
const visitRouter = require("./router/visitRouter.js");
const taskRouter = require("./router/taskRouter.js");
const medicineRouter = require("./router/medicineRouter.js");
const observationRouter = require("./router/observationRouter.js");
const invoiceRouter = require("./router/invoiceRouter.js");
const assessmentRouter = require("./router/assessmentRouter.js");
const runnerRouter = require("./router/runnnerRouter.js");
const patientVitalsRouter = require("./router/patientVitalRouter.js");
const concernRouter = require("./router/concernRoute.js");
const bookingRouter = require("./router/bookingRoute.js");
const groupChatService = require("./services/chat_service.js"); // Group Chat Service file

// MongoDB connection
const dbUrl =
  "mongodb+srv://ashmaptech:Eav74UplzNppU6zs@healthcarebackend.t6vwc.mongodb.net/?retryWrites=true&w=majority&appName=HealthCareBackend";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to the database:", err));

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Register main app routes
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/family_member", familyMembeRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/admin_route", adminRouter);
app.use("/api/v1/visit_route", visitRouter);
app.use("/api/v1/task_route", taskRouter);
app.use("/api/v1/medication_route", medicineRouter);
app.use("/api/v1/observation_route", observationRouter);
app.use("/api/v1/invoice_route", invoiceRouter);
app.use("/api/v1/asessment_route", assessmentRouter);
app.use("/api/v1/runner_route", runnerRouter);
app.use("/api/v1/patient_vitals_route", patientVitalsRouter);
app.use("/api/v1/concern_route", concernRouter);
app.use("/api/v1/booking_route", bookingRouter);

// Group Chat APIs
app.get(
  "/api/v1/groups/:groupId/users",
  authenticateToken,
  async (req, res) => {
    try {
      const users = await groupChatService.getUsersInGroup(req.params.groupId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users in the group" });
    }
  }
);

app.get(
  "/api/v1/groups/:groupId/messages",
  authenticateToken,
  async (req, res) => {
    try {
      const messages = await groupChatService.getMessagesInGroup(
        req.params.groupId
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);

app.post("/api/v1/groups", authenticateToken, async (req, res) => {
  const { groupId } = req.body;
  try {
    const group = await groupChatService.saveGroup(groupId);
    res.status(201).json({ message: "Group created", group });
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
});

app.post("/api/v1/users", authenticateToken, async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    profile_picture,
    role,
    userId,
    online,
    lastSeen,
  } = req.body;

  try {
    // Call saveUser from the service and pass the necessary parameters
    const user = await groupChatService.saveUser(
      email,
      first_name,
      last_name,
      profile_picture,
      role,
      userId,
      online,
      lastSeen
    );

    // Respond with the created user
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    // Handle the case where user already exists
    if (error.message === "User with this email already exists") {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Generic error response
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Socket.IO configuration
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("login", async (userId) => {
    try {
      const user = await groupChatService.getUserById(userId);
      if (user) {
        user.online = true;
        await user.save();
        io.emit("updateUserStatus", { userId, online: true });
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });

  socket.on("joinGroup", async ({ userId, groupId }) => {
    await groupChatService.addUserToGroup(userId, groupId);
    socket.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
    const messages = await groupChatService.getMessagesInGroup(groupId);
    socket.emit("groupMessages", messages);
  });

  socket.on("message", async ({ groupId, senderId, message, images, timestamp, first_name,  }) => {
    const newMessage = await groupChatService.saveMessage({
      groupId,
      senderId,
      message,
      timestamp,
      first_name,
      images,
    });
    io.to(groupId).emit("newMessage", newMessage);
  });

  socket.on("typing", ({ groupId, senderId }) => {
    socket.to(groupId).emit("typing", senderId);
  });

  socket.on("disconnect", async () => {
    try {
      const user = await groupChatService.updateUserStatus(
        socket.id,
        false,
        new Date()
      );
      if (user) {
        io.emit("updateUserStatus", {
          userId: user._id,
          online: false,
          lastSeen: user.lastSeen,
        });
      }
    } catch (error) {
      console.error("Error updating user status on disconnect:", error);
    }
  });
});

// Server startup
const Port = 4071;
server.listen(Port, () => {
  console.log("The server is running at port:", Port);
});
