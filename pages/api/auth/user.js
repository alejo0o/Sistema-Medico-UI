import axios from 'axios';
import withSession from '@/components/utils/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');

  if (user) {
    try {
      const { data: usuario } = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/auth/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const user_data = {
        id: usuario.id,
        isLoggedIn: true,
        tipo: usuario.user_type,
        username: usuario.username,
        email: usuario.email,
        name: usuario.name,
        token: usuario.token,
        cedula: usuario.cedula,
      };
      req.session.set('user', user_data);
      await req.session.save();
      res.json({
        isLoggedIn: true,
        ...user_data,
      });
    } catch (error) {
      if (error.response.status === 401) {
        res.status(401).json({ message: 'Unauthorized' });
      } else res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
