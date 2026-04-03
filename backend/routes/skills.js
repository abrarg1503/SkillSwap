const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skillsSnapshot = await db.collection('skills').get();
    const skills = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add skill
router.post('/', async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const docRef = await db.collection('skills').add({ title, description, userId, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;