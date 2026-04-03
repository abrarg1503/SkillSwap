const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.get('/', async (req, res) => {
  try {
    const bookingsSnapshot = await db.collection('bookings').get();
    const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { skillId, userId, date } = req.body;
  try {
    const docRef = await db.collection('bookings').add({ skillId, userId, date, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;