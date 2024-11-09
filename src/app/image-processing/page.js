// app/image-processing/page.js
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function ImageProcessing(context) {
  const { user } = await getSession(context.req, context.res) || {};
  console.log("User data:", user);

  return (
    <div>
      {user ? <h1>Welcome, {user.name}</h1> : <h1>Loading...</h1>}
      <p>This is the image processing page.</p>
    </div>
  );
});
