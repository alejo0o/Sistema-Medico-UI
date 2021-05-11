import axios from 'axios';
import withSession from '@/components/utils/session';

export default withSession(async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}/auth/login`,
      {
        username,
        password,
      }
    );
    if (response.status == 200) {
      const { data: user } = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/auth/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        }
      );

      req.session.set('user', {
        id: user.id,
        isLoggedIn: true,
        tipo: user.user_type,
        username: user.username,
        email: user.email,
        name: user.name,
        token: user.token,
        cedula: user.cedula,
      });
      await req.session.save();
      res.status(200).json({ message: 'Logged In' });
    }
  } catch (error) {
    if (error.response.status == 401) {
      res.status(401).json({ message: 'Unauthorized' });
    } else res.status(500).json({ message: 'Internal server error' });
  }
});
