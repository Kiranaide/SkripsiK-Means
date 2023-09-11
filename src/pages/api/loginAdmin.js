import db from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import JWT library

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const userQuery = 'SELECT * FROM adminaccount WHERE username = ?';
    const userValues = [username];

    db.query(userQuery, userValues, async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate a token
      const token = jwt.sign({ username: user.username, id:user.id_users }, 'xxxxxx', { expiresIn: '1h' });

      // Make sure that req.session is defined
      req.session = req.session || {};

      // Set the token in the session
      req.session.token = token;

      // Send the token and username in the response
      return res.status(200).json({ success: true, token, username: user.username, id: user.id_users });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
