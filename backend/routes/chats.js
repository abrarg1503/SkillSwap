const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.get('/', async (req, res) => {
  try {
    const chatsSnapshot = await db.collection('chats').get();
    const chats = chatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  try {
    const docRef = await db.collection('chats').add({ senderId, receiverId, message, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;