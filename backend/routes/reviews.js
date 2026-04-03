const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.get('/', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews').get();
    const reviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { skillId, userId, rating, review } = req.body;
  try {
    const docRef = await db.collection('reviews').add({ skillId, userId, rating, review, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;