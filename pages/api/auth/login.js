import axios from 'axios';
import withSession from '@/components/utils/session';

export default withSession(async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(`${process.env.API_URL}/auth/login`, {
      username,
      password,
    });
    if (response.status == 200) {
      const user = await axios.post(
        `${process.env.API_URL}/auth/me`,
        {},
        {
          headers: {
            Authorization: `bearer ${response.data.access_token}`,
          },
        }
      );

      req.session.set('user', {
        id: user.data.id,
        isLoggedIn: true,
        admin: user.data.user_type,
        username: user.data.username,
        email: user.data.email,
        name: user.data.name,
        token: response.data.access_token,
      });
      await req.session.save();
      res.status(200).json({ message: 'Logged In' });
    }
  } catch (error) {
    if (error.response.status == 401) {
      res.status(401).json({ message: 'unauthorized' });
    } else res.status(500).json({ message: 'Internal server error' });
  }
});
