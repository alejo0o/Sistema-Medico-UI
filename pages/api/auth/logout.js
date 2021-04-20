import axios from 'axios';
import withSession from '@/components/utils/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  axios
    .post(
      `${process.env.NEXT_PUBLIC_APIURL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        req.session.destroy();
        res.status(200).json({ isLoggedIn: false });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});
