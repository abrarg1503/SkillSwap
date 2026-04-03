const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    // Note: Password verification should be handled on client-side with Firebase Auth SDK
    const token = await admin.auth().createCustomToken(user.uid);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });
    res.json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;